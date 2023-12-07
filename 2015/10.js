import { toInt } from '../utilities/parsers.js'

let puzzle = "1321131112".split('').map(toInt)

let playRound = numbers => {
    let newNumbers = []
    let index = 0
    while (index < numbers.length) {
         let current = numbers[index++]
         let count = 1
         while (current == numbers[index++]) {
            count++
         }
         newNumbers.push(count)
         newNumbers.push(current)
    }
    return newNumbers
}

let numbers = [1, 2, 1, 1]
console.log(numbers.join(''))
for (let i = 0; i < 5; i++) {
    numbers = playRound(numbers)
    console.log(numbers.join(''))
}