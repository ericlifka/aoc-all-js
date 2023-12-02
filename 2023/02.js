import { withInputLines } from "../utilities/with-input.js"
import { sum } from "../utilities/reducers.js"


const parseGame = description => {
    let [idStr, rest] = description.split(': ')
    let id = parseInt(idStr.split(' ')[1], 10)
    let sets = rest.split('; ').map( set => 
        set.split(', ')
            .map( cubes => cubes.split(' '))
            .map(([count, color]) => ({ count: parseInt(count, 10), color })))

    return { id, sets }
}

const minimumRequiredSetForGame = game => {
    let counts = { red: 0, blue: 0, green: 0 }
    game.sets.forEach( set => set.forEach(({ count, color }) => {
        if (count > counts[color]) {
            counts[color] = count
        }
    }))
    return { ...game, counts }
}

const isPossibleWithContents = contents => game =>
    game.counts.green <= contents.green &&
    game.counts.blue <= contents.blue &&
    game.counts.red <= contents.red

const powerOfGame = ({ counts }) => counts.red * counts.blue * counts.green


let games = withInputLines("2023/input/02.txt")
    .map(parseGame)
    .map(minimumRequiredSetForGame)

console.log("part 1: ", 
    games.filter(isPossibleWithContents({red: 12, green: 13, blue: 14}))
         .map(({ id }) => id)
         .reduce(sum, 0))

console.log("part 2: ", games.map(powerOfGame).reduce(sum, 0))
