import {withInputGrid} from "../utilities/with-input.js"
import {totalElapsed} from "../utilities/timer.js"

const X = 0
const Y = 1
const DIRECTIONS = [ [0, -1], [1, 0], [0, 1], [-1, 0] ]
const rotate = direction => DIRECTIONS[(1 + DIRECTIONS.findIndex( d => d[X] === direction[X] && d[Y] === direction[Y] )) % 4]
const step = (position, direction) => [ position[X] + direction[X], position[Y] + direction[Y] ]
const INPUT = withInputGrid()
const WIDTH = INPUT[0].length
const HEIGHT = INPUT.length
const outOfBounds = ([x, y]) => x < 0 || y < 0 || x >= WIDTH || y >= HEIGHT
const input = () => INPUT.map( row => [...row] )
const start_position = input().flatMap((row, y) => row.map((cell, x) => cell === '^' ? [ x, y ] : null)).filter(Boolean)[0]
const start_direction = DIRECTIONS[ 0 ]

const patrol = (grid, position, direction) => {
  let path = new Set()
  while (true) {
    let next = step(position, direction)
    if (outOfBounds(next)) {
      // left grid
      return { loop: false, path }
    }
    if (grid[next[Y]][next[X]] === '#') {
      // hit a wall, rotate
      next = position
      direction = rotate(direction)
    }
    position = next
    let pathKey = `${position[X]},${position[Y]}-${direction[X]},${direction[Y]}`
    if (path.has(pathKey)) {
      // found a loop
      return { loop: true, path }
    }
    path.add(pathKey)
    grid[position[Y]][position[X]] = 'X'
  }
}

let unalteredPatrol = patrol(input(), start_position, start_direction);
let positions = new Set([...unalteredPatrol.path].map( item => item.split('-')[0]))

console.log('2024 day 06 part 1 -', positions.size + 1)

const blockSpace = position => {
  let grid = input()
  grid[position[Y]][position[X]] = '#'
  return grid
}

let count = 0
positions.forEach( block => {
  let grid = blockSpace(block.split(',').map(Number))
  let { loop } = patrol(grid, start_position, start_direction)
  if (loop) {
    count++
  }
})

console.log('2024 day 06 part 2 -', count)

console.log(totalElapsed())
