import {withInputGrid} from "../utilities/with-input.js"

const directions = [ [0, -1], [1, 0], [0, 1], [-1, 0] ]
let direction_marker = 0

let grid = withInputGrid()

let position = grid.flatMap((row, y) => row.map((cell, x) => cell === '^' ? [ x, y ] : null)).filter(Boolean)[0]
let direction = directions[direction_marker]
grid[position[1]][position[0]] = 'X'

const step = () => {
  let next = [ position[0] + direction[0], position[1] + direction[1] ]
  if (next[0] < 0 || next[1] < 0 || next[0] >= grid[0].length || next[1] >= grid.length) { // walk off grid
    return false
  }
  if (grid[next[1]][next[0]] === '#') { // hit a wall, rotate instead
    next = position
    direction_marker = (direction_marker + 1) % 4
    direction = directions[direction_marker]
  }

  position = next
  grid[position[1]][position[0]] = 'X'
  return true
}

while (step()) { }

console.log('2024 day 06 part 1 -', grid.flatMap(row => row.map(cell => cell)).filter(cell => cell === 'X').length)
console.log(grid.length * grid[0].length)
