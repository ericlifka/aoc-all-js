import { withInputLines } from "../utilities/with-input.js"
import { sum } from "../utilities/reducers.js"


const getAdjacent = (x, y) => [
    [x - 1, y - 1], [x, y - 1], [x + 1, y - 1],
    [x - 1, y    ],             [x + 1, y    ],
    [x - 1, y + 1], [x, y + 1], [x + 1, y + 1],
]

let input = withInputLines('2023/input/03.txt')
let schematic = [ ".".repeat(input[0].length), ...input, ".".repeat(input[0].length) ]
    .map( line => `.${line}.` )

const isDigit = ch => /\d/.test(ch)

const findAll = ch => {
    let collection = []
    for (let y = 0; y < schematic.length; y++) for (let x = 0; x < schematic[y].length; x++) {
        if (schematic[y][x] == ch)
            collection.push([ x, y ])
    }
    return collection
}

const parseNumberAt = ([ x, y ]) => {
    let start = x, end = x
    while (isDigit(schematic[ y ][ start-1 ])) start--
    while (isDigit(schematic[ y ][ end ])) end++
    return parseInt(schematic[ y ].slice(start, end), 10)
}

const getNubmersBorderingPoint = ([x, y]) => {
    let coords = []
        
    for (let row of [ y+1, y-1 ])
        if (isDigit(schematic[ row ][ x ])) coords.push([ x, row ])
        else {
            if (isDigit(schematic[ row ][ x+1 ])) coords.push([ x+1, row ])
            if (isDigit(schematic[ row ][ x-1 ])) coords.push([ x-1, row ])
        }

    for (let side of [ x+1, x-1 ])
        if (isDigit(schematic[ y ][ side ])) coords.push([ side, y ])

    return coords.map(parseNumberAt)
}

const calcGearRatio = numbers =>
    numbers.length == 2
        ? numbers[0] *  numbers[1]
        : 0


const part1 = () => {
    let parts = []
    for (let y = 0; y < schematic.length; y++) {
        let x = 0
        while (x < schematic[y].length) {
            while (!isDigit(schematic[y][x]) && x < schematic[y].length) {
                x++
            }

            let num = ""
            let adjacent = []
            while (isDigit(schematic[y][x])) {
                num += schematic[y][x]
                adjacent = [...adjacent, ...getAdjacent(x, y)]
                x++
            }
            if (adjacent.some(([x, y]) => /[*&@/+\-%$=#]/.test(schematic[y][x]))) {
                parts.push(parseInt(num, 10))
            }
            x++
        }
    }
    return parts.reduce(sum)
}

const part2 = () =>
    findAll('*')
    .map(getNubmersBorderingPoint)
    .map(calcGearRatio)
    .reduce(sum)

console.log("part 1: ", part1())
console.log("part 2: ", part2())
