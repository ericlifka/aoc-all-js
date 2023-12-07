import { withInputLines } from "../utilities/with-input.js"
import { sum } from "../utilities/reducers.js"
import { descending } from "../utilities/sort.js"

let hands = withInputLines("2023/input/07.txt")
    .map(line => line.split(' '))
    .map(([cards, bid]) => ({cards: cards.split(''), bid: parseInt(bid, 10)}))

const Cards = '23456789TJQKA'
const CardWeights = Cards.split('').reduce((weights, card, i) => ({...weights, [card]: i + 2}), {})
const CardWeightsWithWild = {...CardWeights, 'J': 1}

const countCards = (cards, useWilds) => {
    let letterCounts = Cards.split('').reduce((counts, card, i) => ({...counts, [card]: 0}), {})
    let wilds = 0
    cards.forEach( letter => letterCounts[letter]++ )
    if (useWilds) {
        wilds = letterCounts.J
        letterCounts.J = 0
    }
    let counts = Object.values(letterCounts).sort(descending)
    counts[0] += wilds
    return counts
}

const handRank = (cards, useWilds) => {
    let [first, second, ] = countCards(cards, useWilds)
    
    if (first == 5) return 7
    if (first == 4) return 6
    if (first == 3 && second == 2) return 5
    if (first == 3) return 4
    if (first == 2 && second == 2) return 3
    if (first == 2) return 2
    return 1
}

const compareCards = (cards1, cards2, weights) => {
    for (let i = 0; i < cards1.length; i++)
        if (cards1[i] != cards2[i])
            return weights[cards1[i]] - weights[cards2[i]]
    return 0
}

const compareHands = useWilds => (hand1, hand2) => 
    handRank(hand1.cards, useWilds) - handRank(hand2.cards, useWilds) ||
    compareCards(hand1.cards, hand2.cards, useWilds ? CardWeightsWithWild : CardWeights)

const scoreHands = hands =>
    hands.map(({bid}, i) => bid * (i + 1)).reduce(sum)

console.log('part 1: ', scoreHands(hands.sort(compareHands(false))))
console.log('part 2: ', scoreHands(hands.sort(compareHands(true))))
