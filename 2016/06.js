import { withInputLines } from '../utilities/with-input.js'

let signal = withInputLines("2016/input/06.txt")

let letterCounts = []

for (let x = 0; x < signal[0].length; x++) {
    let counts = {}
    for (let y = 0; y < signal.length; y++) {
        let letter = signal[y][x]
        counts[letter] = (counts[letter] || 0) + 1
    }
    letterCounts[x] = counts
}

const messageByMostCommon = () => letterCounts
    .map( counts => Object.keys(counts).sort((la, lb) => counts[lb] - counts[la])[0])
    .join('')

const messageByLeastCommon = () => letterCounts
    .map( counts => Object.keys(counts).sort((la, lb) => counts[la] - counts[lb])[0])
    .join('')


console.log('part 1: ', messageByMostCommon())
console.log('part 2: ', messageByLeastCommon())
