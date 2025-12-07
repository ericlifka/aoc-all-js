import { withInputGrid } from "../utilities/with-input.js"
import { elapsed } from "../utilities/timer.js"

const grid = withInputGrid()
let beams = new Set([ grid[0].findIndex(c => c == 'S') ])
let count = 0

for (let y = 1; y < grid.length; y++) {
  let newBeams = new Set()
  for (let beam of beams) {
    if (grid[y][beam] == '^') {
      count++
      newBeams.add(beam - 1)
      newBeams.add(beam + 1)
    } else {
      newBeams.add(beam)
    }
  }
  beams = newBeams
}

console.log('part 1 -', count, elapsed())

let paths = 0
let queue = [ { y: 0, x: grid[0].findIndex(c => c == 'S') } ]
while (queue.length > 0) {
  let { x, y } = queue.pop()
  while (y < grid.length) {
    if (grid[y][x] == '^') {
      queue.push({ x: x + 1, y })
      console.log({ x: x + 1, y })
      x--
    }
    y++
  }
  paths++
  // console.log(queue.length)
}

console.log('part 2 -', paths, elapsed())