import { withInput } from "../utilities/with-input.js"

let puzzle = withInput("2015/input/10.txt")

let playRound = numbers => {
    let newNumbers = ""
    let index = 0
    while (index < numbers.length) {
         let current = numbers[index++]
         let count = 1
         while (current == numbers[index]) {
            count++
            index++
         }
         newNumbers += count
         newNumbers += current
    }
    return newNumbers
}

for (let i = 0; i < 50; i++) {
    if (i == 40) {
        console.log('part 1: ', puzzle.length)
    }
    puzzle = playRound(puzzle)
}

console.log('part 2: ', puzzle.length)
