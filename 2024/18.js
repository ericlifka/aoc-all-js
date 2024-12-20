import {withInputLines} from "../utilities/with-input.js"
import {totalElapsed} from "../utilities/timer.js"

let fallingBytes = withInputLines().map( line => line.split(',').map(Number) )
let kilobyte = fallingBytes.slice(0, 1024)
let remainingBytes = fallingBytes.slice(1024)
let grid = new Array(71).fill(null).map(() => new Array(71).fill(false))

const get = (x, y) =>
  (x < 0 || y < 0 || y >= grid.length || x >= grid[0].length)
    ? true
    : grid[y][x]

const key = (x, y) => `<${x},${y}>`

for (let [x, y] of kilobyte) {
  grid[y][x] = true
}

// console.log(grid.map(row => row.map(v => v ? '#' : '.').join('')).join('\n'))

const findShortestPath = () => {
  let cache = {}
  let queue = [[0, 0, 0]]
  while (queue.length > 0) {
    let [x, y, distance] = queue.shift()

    let cachedDistance = cache[key(x, y)]
    if (cachedDistance && cachedDistance <= distance) {
      continue
    }
    cache[key(x, y)] = distance

    if (x === 70 && y === 70) {
      return distance
    }
    if (!get(x + 1, y)) queue.push([x + 1, y, distance + 1])
    if (!get(x - 1, y)) queue.push([x - 1, y, distance + 1])
    if (!get(x, y + 1)) queue.push([x, y + 1, distance + 1])
    if (!get(x, y - 1)) queue.push([x, y - 1, distance + 1])

    queue.sort((l, r) => l[2] - r[2])
    // console.log(queue.length, queue[0][2], queue[queue.length-1][2])
  }
  return -1
}
console.log('2024 day 18 part 1 -', findShortestPath())

for (let [x, y] of remainingBytes) {
  grid[y][x] = true
  if (findShortestPath() === -1) {
    console.log(`2024 day 18 part 2 - ${x},${y}`)
    break
  }
}

console.log(totalElapsed())

