import { withInputLines } from "../utilities/with-input.js"
import { sum } from "../utilities/reducers.js"
import { toInt } from "../utilities/parsers.js"
import { elapsed } from "../utilities/timer.js"

const testPattern = (pattern, str) => {
    for (let i = 0; i < str.length; i++)
        if (pattern[i] != '?' && pattern[i] != str[i])
            return false
    return true
}

let memoizeCache = {}
const cacheKey = (groupStr, pattern) => `[${groupStr}]-"${pattern}"`

const permutations = (groupStr, pattern) => {
    let key = cacheKey(groupStr, pattern)
    if (memoizeCache[key]) {
        return memoizeCache[key]
    }

    let result = []
    let groups = groupStr.split(',').map(toInt)

    if (groups.length == 0) { // base case ([], 5) -> [ '.....' ]
        let res = '.'.repeat(pattern.length)
        if (testPattern(pattern, res)) {
            result = 1
        } else {
            result = 0
        }
    }

    else if (groups.length == 1) { // other base case ([3], 6) ->  [ '###...', '.###..', '..###.', '...###' ]
        let chunk = '#'.repeat(groups[0])
        let validPerms = 0
        for (let i = 0; i <= pattern.length - chunk.length; i++) {
            let perm = '.'.repeat(i) + chunk + '.'.repeat(pattern.length - chunk.length - i)
            if (testPattern(pattern, perm)) {
                validPerms++
            }
        }
        result = validPerms
    }
    else {
        let [ firstGroup, ...otherGroups ] = groups
        let chunk = '#'.repeat(firstGroup)
        let sizeCap = pattern.length - (otherGroups.reduce(sum) + otherGroups.length - 1)
        let validPerms = 0
        for (let i = 0; i < sizeCap - firstGroup; i++) {
            let groupStr = '.'.repeat(i) + chunk + '.'
            if (testPattern(pattern.slice(0, groupStr.length), groupStr)) {
                validPerms += permutations(otherGroups.join(','), pattern.slice(groupStr.length))
            }
        }
        result = validPerms
    }
    
    memoizeCache[key] = result
    return result
}

let ruleSets = withInputLines()
    .map( line => line.split(' ') )

console.log('part 1: ', ruleSets.map(([pattern, groups]) => permutations(groups, pattern)).reduce(sum), elapsed())

let bigRuleSets = withInputLines()
    .map( line => line.split(' ') )
    .map(([p, g]) => [ [p, p, p, p, p].join('?'), [g, g, g, g, g].join(',') ])

let total = 0
bigRuleSets.forEach(([pattern, groups], i) => {
    let result = permutations(groups, pattern)
    console.log(i, ": ", result)
    total += result
})

console.log('\npart 2: ', total, elapsed())
