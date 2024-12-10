import {withInputGrid} from "../utilities/with-input.js"
import {sum} from "../utilities/reducers.js"

const terrain = withInputGrid('', Number)
const get = ({x, y}) => x < 0 || y < 0 || x >= terrain[0].length || y >= terrain.length ? -1 : terrain[y][x]
const encode = ({x, y}) => `<${x},${y}>`
const neighbors = ({x, y}) => [ {x, y: y + 1}, {x, y: y - 1}, {x: x + 1, y}, {x: x - 1, y} ]
const trailHeads = terrain.flatMap((row, y) => row.map((cell, x) => cell === 0 && {x, y})).filter(Boolean)

let p1Paths = trailHeads.map( head => {
  let visited = new Set()

  const walk = p => {
    visited.add(encode(p))
    if (get(p) === 9)
      return 1

    return neighbors(p).map( n =>
      (!visited.has(encode(n)) && get(n) === get(p) + 1)
        ? walk(n)
        : 0 ).reduce(sum)
  }

  return walk(head)
})

console.log('2024 day 10 part 1 -', p1Paths.reduce(sum))

const walk = p =>
  (get(p) === 9) ? 1
    : neighbors(p).map( n =>
      (get(n) !== get(p) + 1) ? 0
        : walk(n) ).reduce(sum)

console.log('2024 day 10 part 2 -', trailHeads.map(walk).reduce(sum))
