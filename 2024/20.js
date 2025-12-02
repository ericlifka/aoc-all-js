import {withInputGrid} from "../utilities/with-input.js"
import {totalElapsed} from "../utilities/timer.js"
import {sum} from "../utilities/reducers.js";

let track = withInputGrid()
track.get = function([x, y]) { return this[y][x] }
let score = track.map(row => row.map(() => -1))
score.get = function([x, y]) { return this[y][x] }
score.set = function([x, y], val) { this[y][x] = val }

const path = []

const eq = (l, r) => l[0] === r[0] && l[1] === r[1]
const N = ([x, y]) => [x, y - 1]
const S = ([x, y]) => [x, y + 1]
const E = ([x, y]) => [x + 1, y]
const W = ([x, y]) => [x - 1, y]
const distance = ([x1, y1], [x2, y2]) =>
  Math.abs(x1 - x2) + Math.abs(y1 - y2)

let start = track.flatMap((row, y) => row.map((cell, x) => cell === 'S' ? [x, y] : null)).filter(Boolean)[0]
let end = track.flatMap((row, y) => row.map((cell, x) => cell === 'E' ? [x, y] : null)).filter(Boolean)[0]

let position = start
let steps = 0
score.set(position, steps)
path.push({ position, steps })
while (!eq(position, end)) {
  for (let dir of [N, S, E, W]) {
    let newP = dir(position)
    if (track.get(newP) !== '#' && score.get(newP) === -1) {
      position = newP
      steps++
      score.set(position, steps)
      path.push({ position, steps })
      break
    }
  }
}

const calcCheats = (dist) => {
  let cheats = {}
  for (let i = 0; i < path.length - 1; i++) {
    for (let j = i + 1; j < path.length; j++) {
      let p1 = path[i], p2 = path[j]
      let d = distance(p1.position, p2.position)
      if (d <= dist) {
        let saved = Math.abs(p1.steps - p2.steps) - d
        if (saved >= 100) {
          cheats[saved] = (cheats[saved] || 0) + 1
        }
      }
    }
  }
  return Object.values(cheats).reduce(sum)
}

console.log('2024 day 20 part 1 -', calcCheats(2, 100))
console.log('2024 day 20 part 2 -', calcCheats(20, 100))

console.log(totalElapsed())
