import { withInputLines } from "../utilities/with-input.js"
import { toInt } from "../utilities/parsers.js"
import { intersection } from "../utilities/sets.js"
import { sum } from "../utilities/reducers.js"

const parseNumbers = numString => numString.split(' ').filter( n => n.length > 0).map(toInt)

// Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
let cards = withInputLines("2023/input/04.txt")
    .map(line => /Card\s+(\d+): ([\d\s]*)\s\|\s([\d\s]*)/.exec(line))
    .map(([ _, id, winners, picks ]) => ({ 
        id: toInt(id),
        copies: 1,
        winners: new Set(parseNumbers(winners)),
        picks: new Set(parseNumbers(picks))
    }))
    .map( card => ({ ...card, matches: intersection(card.winners, card.picks).size }))
    .map( card => ({ ...card, points: Math.floor(Math.pow(2, card.matches - 1)) }))

cards.forEach((card, i) => {
    for (let x = 1; x <= card.matches; x++) {
        cards[i + x].copies += card.copies
    }
})

console.log('part 1: ', cards.map( c => c.points ).reduce(sum))
console.log('part 2: ', cards.map( c => c.copies ).reduce(sum))
