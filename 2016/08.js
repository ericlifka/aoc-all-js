import { withInputLines } from '../utilities/with-input.js'
import { toInt } from '../utilities/parsers.js'

let width = 50
let height = 6
let screen = Array.from(new Array(height)).map(() =>
    Array.from(new Array(width)).fill(' '))

const fillRect = (w, h) => {
    for (let y = 0; y < h; y++)
        for (let x = 0; x < w; x++)
            screen[y][x] = '#'
}

const rotateRow = y => {
    let last = screen[y][width - 1]
    for (let x = width - 1; x > 0; x--) {
        screen[y][x] = screen[y][x - 1]
    }
    screen[y][0] = last
}

const rotateColumn = x => {
    let last = screen[height - 1][x]
    for (let y = height - 1; y > 0; y--) {
        screen[y][x] = screen[y - 1][x]
    }
    screen[0][x] = last
}

let instructions = withInputLines("2016/input/08.txt")

instructions.forEach( instr => {
    if (instr.slice(0, 4) == "rect") {
        fillRect(...instr.split(' ')[1].split('x').map(toInt))
    } else {
        let [index, count] = instr.split('=')[1].split(' by ').map(toInt)
        let rotate = instr.slice(7, 10) == "row"
            ? rotateRow
            : rotateColumn

        for (let i = 0; i < count; i++)
            rotate(index)
    }
})

console.log('part 1: ',
    screen.reduce((total, row) => 
        row.reduce((count, pixel) => count + (pixel == '#' ? 1 : 0), total), 0))

console.log('part 2: ')
screen.forEach( row => console.log(row.join('')))
