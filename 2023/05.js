import { withInputSegments } from "../utilities/with-input.js"
import { toInt, isNum } from "../utilities/parsers.js"
import { ascending, compareByProp } from "../utilities/sort.js"
import { splitIntoGroups } from "../utilities/vectors.js"
import { elapsed } from "../utilities/timer.js"

let rangeCompare = compareByProp('start', ascending)
let sections = withInputSegments("2023/input/05.txt", "\n\n")
let seeds = sections.shift().split(' ').map(toInt).filter(isNum)
let seedRanges = splitIntoGroups(seeds, 2).map(([start, count]) => ({ start, end: start + count - 1 })).sort(rangeCompare)
let almanac = sections.map( s => s
    .split('\n').slice(1)
    .map( triplet => triplet.split(' ').map(toInt))
    .map(([ destinationRangeStart, sourceRangeStart, rangeLength ]) => ({
        start: sourceRangeStart,
        end: sourceRangeStart + rangeLength - 1,
        modifier: destinationRangeStart - sourceRangeStart
    }))
    .sort(rangeCompare))

const applySectionRule = (input, section) => input + (section.find(({start, end}) => input >= start && input <= end) || {modifier: 0}).modifier
const calculateLocationForSeed = seed => ( almanac.forEach( section => seed = applySectionRule(seed, section)), seed )
const findClosestSeed = seeds => seeds.map(calculateLocationForSeed).sort(ascending)[0]

const putRangeThroughSection = ({ start, end }, section) => {
    let newRanges = []
    for (let range of section) {
        if (start < range.start) {
            if (end < range.start) {
                newRanges.push({ start, end })
                return newRanges
            } else {
                newRanges.push({ start, end: range.start - 1 })
                start = range.start
            }
        }
        
        if (start <= range.end) {
            if (end <= range.end) {
                newRanges.push({
                    start: start + range.modifier,
                    end: end + range.modifier
                })
                return newRanges
            } else {
                newRanges.push({
                    start: start + range.modifier,
                    end: range.end + range.modifier
                })
                start = range.end + 1
            }
        }
    }
    newRanges.push({ start, end })
    return newRanges
}

const collapseRanges = ranges => {
    let newRanges = []
    let current = {...ranges[0]}
    for (let i = 1; i < ranges.length; i++) {
        if (current.end + 1 >= ranges[i].start) { // connected
            current.end = ranges[i].end
        } else { // not connected
            newRanges.push(current)
            current = {...ranges[i]}
        }
    }
    newRanges.push(current)
    return newRanges
}

const runRangesThroughSection = (ranges, section) => {
    let newRanges = []
    for (let range of ranges) {
        newRanges.push(...putRangeThroughSection(range, section))
    }
    return collapseRanges(newRanges.sort(rangeCompare))
}

const runRangesThroughAlmanac = seedRanges => {
    let ranges = [...seedRanges]
    for (let section of almanac) {
        ranges = runRangesThroughSection(ranges, section)
    }
    return ranges[0].start
}

console.log('part 1: ', findClosestSeed(seeds), elapsed())
console.log('part 2: ', runRangesThroughAlmanac(seedRanges), elapsed())
