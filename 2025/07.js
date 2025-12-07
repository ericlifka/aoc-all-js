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

let cache = {}
const pathsFromPoint = (x, y) => {
  const key = `y:${y}.x:${x}`
  if (cache[key])
    return cache[key]

  if (y == grid.length)
    return 1

  if (grid[y][x] == '.' || grid[y][x] == 'S')
    return cache[key] = pathsFromPoint(x, y + 1)

  if (grid[y][x] == '^')
    return cache[key] = pathsFromPoint(x + 1, y) + pathsFromPoint(x - 1, y)

  console.log("didn't know what to do, x:", x, ', y:', y, ' -', grid[y][x])
}

const totalPaths = pathsFromPoint(grid[0].findIndex(c => c == 'S'), 0)

console.log('part 2 -', totalPaths, elapsed())
