import { withInputLines } from "../utilities/with-input.js"
import { permutations } from "../utilities/vectors.js"
import { descending } from "../utilities/sort.js"
import { sum } from "../utilities/reducers.js"
import { elapsed } from "../utilities/timer.js"

const findBestArrangement = happinessMap => {
    let people = Object.keys(happinessMap)
    let seatingArrangements = permutations(people)
    
    const scoreSeatingArrangement = arrangement => arrangement
        .map((person, i) => happinessMap[person][arrangement.at(i - 1)]
                          + happinessMap[person][arrangement.at((i + 1) % arrangement.length)])
        .reduce(sum)
    
    return seatingArrangements
        .map(scoreSeatingArrangement)
        .sort(descending)
        .at(0)
}

let happinessMap = {}
withInputLines()
    .map( line => /(\w+) would (\w+) (\d+) happiness units by sitting next to (\w+)\./.exec(line))
    .forEach(([_, who, multiplicand, amount, target]) =>
        happinessMap[who] = {...happinessMap[who], [target]: ({gain: 1, lose: -1}[multiplicand]) * amount})

console.log('part 1: ', findBestArrangement(happinessMap), elapsed())

Object.keys(happinessMap).forEach( person => happinessMap[person]['you'] = 0 )
happinessMap['you'] = Object.keys(happinessMap).reduce((map, person) => ({...map, [person]: 0}), {})

console.log('part 2: ', findBestArrangement(happinessMap), elapsed())
