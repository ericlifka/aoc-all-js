import {withInputGrid} from "../utilities/with-input.js"
import {totalElapsed} from "../utilities/timer.js"

let grid = withInputGrid()
grid.get = function([x, y]) { return this[y][x] }
let scores = {}
scores.get = function([x, y], dir) { return this[`${x},${y},${dir}`] || Infinity }
scores.set = function([x, y], dir, val) { this[`${x},${y},${dir}`] = val }

let start = grid.flatMap((row, y) => row.map((cell, x) => cell === 'S' ? [x, y] : null)).filter(Boolean)[0]
let end = grid.flatMap((row, y) => row.map((cell, x) => cell === 'E' ? [x, y] : null)).filter(Boolean)[0]
scores.set(start, 'E', 1)

const N = ([x, y]) => [x, y - 1]
const S = ([x, y]) => [x, y + 1]
const E = ([x, y]) => [x + 1, y]
const W = ([x, y]) => [x - 1, y]

let pathsToEnd = []

let queue = [{ position: start, facing: 'E', score: 1, path: [ start ] } ]
while (queue.length > 0) {
  let { position, facing, score, path } = queue.shift()

  if (position[0] === end[0] && position[1] === end[1]) {
    pathsToEnd.push({path, score})
    continue
  }

  let north = N(position)
  if (grid.get(north) !== '#' && facing !== 'S') {
    let nScore = score + 1
    if (facing === 'E' || facing === 'W') {
      nScore += 1000
    }
    if (nScore <= scores.get(north, 'N')) {
      scores.set(north, 'N', nScore)
      queue.push({ position: north, facing: 'N', score: nScore, path: [...path, north] })
    }
  }

  let east = E(position)
  if (grid.get(east) !== '#' && facing !== 'W') {
    let eScore = score + 1
    if (facing === 'N' || facing === 'S') {
      eScore += 1000
    }
    if (eScore <= scores.get(east, 'E')) {
      scores.set(east, 'E', eScore)
      queue.push({ position: east, facing: 'E', score: eScore, path: [...path, east] })
    }
  }

  let south = S(position)
  if (grid.get(south) !== '#' && facing !== 'N') {
    let sScore = score + 1
    if (facing === 'E' || facing === 'W') {
      sScore += 1000
    }
    if (sScore <= scores.get(south, 'S')) {
      scores.set(south, 'S', sScore)
      queue.push({ position: south, facing: 'S', score: sScore, path: [...path, south] })
    }
  }

  let west = W(position)
  if (grid.get(west) !== '#' && facing !== 'E') {
    let wScore = score + 1
    if (facing === 'N' || facing === 'S') {
      wScore += 1000
    }
    if (wScore <= scores.get(west, 'W')) {
      scores.set(west, 'W', wScore)
      queue.push({ position: west, facing: 'W', score: wScore, path: [...path, west] })
    }
  }
}

let bestRouteScore = Math.min(scores.get(end, 'E'), scores.get(end, 'N'))
console.log('2024 day 16 part 1 -', bestRouteScore - 1)

let bestPathVisited = new Set()

pathsToEnd.forEach(({path, score}) => {
  if (score === bestRouteScore) {
    path.forEach(([x, y]) => bestPathVisited.add(`${x},${y}`))
  }
})

console.log('2024 day 16 part 2 -', bestPathVisited.size)
console.log(totalElapsed())
