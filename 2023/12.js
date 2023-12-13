import { withInputLines } from "../utilities/with-input.js"
import { sum } from "../utilities/reducers.js"
import { toInt } from "../utilities/parsers.js"
import { elapsed } from "../utilities/timer.js"

// const group = size => "#".repeat(size)

const testPattern = (pattern, str) => {
    for (let i = 0; i < str.length; i++)
        if (pattern[i] != '?' && pattern[i] != str[i])
            return false
    return true
}

// const minimumGroupLayout = groups =>
//     groups.length == 0
//         ? []
//         : groups.map(group).join('.')

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
            result = [ res ]
        } else {
            result = [ ]
        }
    }

    else if (groups.length == 1) { // other base case ([3], 6) ->  [ '###...', '.###..', '..###.', '...###' ]
        let chunk = '#'.repeat(groups[0])
        let perms = []
        for (let i = 0; i <= pattern.length - chunk.length; i++) {
            let perm = '.'.repeat(i) + chunk + '.'.repeat(pattern.length - chunk.length - i)
            if (testPattern(pattern, perm)) {
                perms.push(perm)
            }
        }
        result = perms
    }
    else {
        let [ firstGroup, ...otherGroups ] = groups
        let chunk = '#'.repeat(firstGroup)
        let sizeCap = pattern.length - (otherGroups.reduce(sum) + otherGroups.length - 1)
        let perms = []
        for (let i = 0; i < sizeCap - firstGroup; i++) {
            let groupStr = '.'.repeat(i) + chunk + '.'
            if (testPattern(pattern.slice(0, groupStr.length), groupStr)) {
                let subPerms = permutations(otherGroups.join(','), pattern.slice(groupStr.length))
                for (let sub of subPerms) {
                    perms.push(groupStr + sub)
                }
            }
        }
        result = perms
    }
    
    memoizeCache[key] = result
    return result
}



let ruleSets = withInputLines()
    .map( line => line.split(' ') )

console.log('part 1: ', ruleSets.map(([pattern, groups]) => permutations(groups, pattern).length).reduce(sum), elapsed())


// let ruleSets = [
//     ["??#.?#?#???", "1,3,1"]
// ]

// ruleSets.forEach(([pattern, groups], i) => {
//     console.log(i, ':')
//     console.log('count: ', permutations(groups, pattern).length, '\n\n\n')
// })


let bigRuleSets = withInputLines()
    .map( line => line.split(' ') )
    .map(([p, g]) => [ [p, p, p, p, p].join('?'), [g, g, g, g, g].join(',') ])

// console.log(bigRuleSets)

let total = 0
bigRuleSets.forEach(([pattern, groups], i) => {
    let result = permutations(groups, pattern)
    console.log(i, ": ", result.length)
    total += result.length
})

console.log('\npart 2: ', total, elapsed())

// console.log('part 2: ', bigRuleSets.map(([pattern, groups]) => permutations(groups, pattern).length).reduce(sum))

// let tests = [
//     ["?###????????".split(''), ".###.##.#...".split('')],
//     ["?###????????".split(''), ".###..##...#".split('')],
//     ["?#.#????????".split(''), ".###..##...#".split('')],
// ]
// tests.forEach(([pattern, test]) => console.log(pattern, test, testPattern(test, pattern)))
