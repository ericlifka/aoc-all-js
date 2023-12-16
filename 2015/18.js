import { withInputLines } from "../utilities/with-input.js"

let inputState = withInputLines().map(line => line.split(''))
let width = inputState[0].length
let height = inputState.length

const print = grid =>  console.log(grid.map(line=>line.join('')).join('\n'))

const emptyGrid = () => 
    Array.from(new Array(height + 2)).map(() => 
        Array.from(new Array(width + 2)).map(() => '.'))

const cmoputeNextGrid = grid => {
    let newGrid = emptyGrid()
    for (let y = 1; y <= height; y++) for (let x = 1; x <= width; x++) {
        let count = 0
        for (let _y = -1; _y <= 1; _y++) for (let _x = -1; _x <= 1; _x++) {
            if (!(_y == 0 && _x == 0) && grid[y + _y][x + _x] == '#')
                count++
        }
        if (grid[y][x] == '#') {
            if (count == 2 || count == 3) {
                newGrid[y][x] = '#'
            }
        } else {
            if (count == 3) {
                newGrid[y][x] = '#'
            }
        }
    }
    newGrid[1][1] = '#'
    newGrid[1][width] = '#'
    newGrid[height][1] = '#'
    newGrid[height][width] = '#'
    return newGrid
}

let lightGrid = emptyGrid()
inputState.forEach((line, y) => line.forEach((cell, x) => {
    lightGrid[y + 1][x + 1] = cell
}))
lightGrid[1][1] = '#'
lightGrid[1][width] = '#'
lightGrid[height][1] = '#'
lightGrid[height][width] = '#'

for (let i = 0; i < 100; i++) {
    lightGrid = cmoputeNextGrid(lightGrid)
}

let count = 0
for (let y = 1; y <= height; y++) for (let x = 1; x <= width; x++) {
    if (lightGrid[y][x] == '#')
        count++
}

console.log('part 2: ', count)
