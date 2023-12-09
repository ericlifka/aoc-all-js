import { withInputLines } from "../utilities/with-input.js"
import { toInt } from "../utilities/parsers.js"
import { sum } from "../utilities/reducers.js"

let sequences = withInputLines().map( line => line.split(' ').map(toInt))

const getSubSequence = sequence =>
    sequence.map((n, i, s) => n - s[i-1]).slice(1)

const nextInSequence = sequence =>
    sequence.every( n => n == 0 )
        ? 0
        : sequence[sequence.length - 1] + nextInSequence(getSubSequence(sequence))

const prevInSequence = sequence =>
    sequence.every( n => n == 0 )
        ? 0
        : sequence[0] - prevInSequence(getSubSequence(sequence))


console.log('part 1: ', sequences.map(nextInSequence).reduce(sum))
console.log('part 2: ', sequences.map(prevInSequence).reduce(sum))