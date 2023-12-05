import { withInputSegments } from "../utilities/with-input.js"
import { toInt, isNum } from "../utilities/parsers.js"
import { ascending } from "../utilities/sort.js"

let sections = withInputSegments("2023/input/05.txt", "\n\n")
let seeds = sections.shift().split(' ').map(toInt).filter(isNum)
let almanac = sections.map( s => s
    .split('\n').slice(1)
    .map( triplet => triplet.split(' ').map(toInt))
    .map(([ destinationRangeStart, sourceRangeStart, rangeLength ]) => ({
        start: sourceRangeStart,
        end: sourceRangeStart + rangeLength - 1,
        modifier: destinationRangeStart - sourceRangeStart
    }))
    .sort((left, right) => left.start - right.start))

const applySectionRule = (input, section) => {
    let rule = section.find(({start, end}) => input >= start && input <= end)
    return !rule ? input
        : input + rule.modifier
}

const mapSeedToLocation = seed => {
    almanac.forEach( section => {
        seed = applySectionRule(seed, section)
    })
    return seed
}

console.log('part 1: ', seeds.map(mapSeedToLocation).sort(ascending)[0])

let start = Date.now()
let closest = Infinity
for (let i = 0; i < seeds.length; i+=2) {
    for (let seed = seeds[i]; seed < seeds[i] + seeds[i+1] - 1; seed++) {
        let location = mapSeedToLocation(seed)
        if (location < closest) {
            closest = location
        }
    }
}
console.log('part 2: ', closest)
console.log("elapsed: ", Date.now() - start, "ms")
