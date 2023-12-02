import { vecAdd } from "../utilities/vectors.js"
import { withInputChars } from "../utilities/with-input.js"

let input = withInputChars("2015/input/03.txt")
let directions = { "^": [  0,  1 ], ">": [  1,  0 ], "v": [  0, -1 ], "<": [ -1,  0 ] }
const coord = ([x, y]) => `<${x}:${y}>`

const part1 = () => {
    let position = [0, 0]
    let grid = { [coord([0, 0])]: 1 }

    input.forEach( d => {
        position = vecAdd(position, directions[d])
        grid[coord(position)] = (grid[coord(position)] || 0) + 1
    })

    return Object.keys(grid).length
}

const part2 = () => {
    let positions = [ [0, 0], [0, 0] ]
    let grid = { [coord([0, 0])]: 2 }

    input.forEach((d, i) => {
        positions[i%2] = vecAdd(positions[i%2], directions[d])
        grid[coord(positions[i%2])] = (grid[coord(positions[i%2])] || 0) + 1
    })

    return Object.keys(grid).length
}

console.log("part 1: ", part1())
console.log("part 2: ", part2())
