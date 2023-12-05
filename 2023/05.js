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

let seedRanges = []
for (let i = 0; i < seeds.length; i += 2) {
    seedRanges.push({ start: seeds[i], end: seeds[i] + seeds[i + 1] - 1 })
}
seedRanges.sort((left, right) => left.start - right.start)

const isValidSeed = seed => {
    for (let {start, end} of seedRanges) {
        if (seed < start) return false
        if (seed >= start && seed <= end) return true
    }
    return false
}

let reverseAlmanac = sections
    .map( s => s
        .split('\n').slice(1)
        .map( triplet => triplet.split(' ').map(toInt))
        .map(([ destinationRangeStart, sourceRangeStart, rangeLength]) => ({
            start: destinationRangeStart,
            end: destinationRangeStart + rangeLength - 1,
            modifier: sourceRangeStart - destinationRangeStart
        }))
        .sort((left, right) => left.start - right.start))
    .reverse()

const mapLocationToSeed = location => {
    reverseAlmanac.forEach( section => {
        location = applySectionRule(location, section)
    })
    return location
}

let start = Date.now()
for (let location = 0; ; location++) {
    let seed = mapLocationToSeed(location)
    if (isValidSeed(seed)) {
        console.log(`part 2: seed<${seed}> to location<${location}>`)
        break
    }
}
console.log("elapsed: ", Date.now() - start, "ms")
