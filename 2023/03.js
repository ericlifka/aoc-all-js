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

const findAll = check => {
    let collection = []
    for (let y = 0; y < schematic.length; y++) for (let x = 0; x < schematic[y].length; x++) {
        if (check(x, y))
            collection.push([ x, y ])
    }
    return collection
}
const findAllGears = () => findAll((x, y) => schematic[y][x] == '*')
const findAllNumbers = () => findAll((x, y) => isDigit(schematic[y][x]) && !isDigit(schematic[y][x-1]))

const touchingASymbol = ([ x, y ]) => {
    while (isDigit(schematic[ y ][ x ])) {
        if (getAdjacent(x, y).some(([ x, y ]) => /[*&@/+\-%$=#]/.test(schematic[y][x])))
            return true
        x++
    }
    return false
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


const part1 = () =>
    findAllNumbers()
        .filter(touchingASymbol)
        .map(parseNumberAt)
        .reduce(sum)

const part2 = () =>
    findAllGears()
        .map(getNubmersBorderingPoint)
        .map(calcGearRatio)
        .reduce(sum)

console.log("part 1: ", part1())
console.log("part 2: ", part2())
