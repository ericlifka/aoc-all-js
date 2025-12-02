import { withInputLines } from "../utilities/with-input.js"
import { elapsed } from "../utilities/timer.js"

const direction = { L: -1, R: 1 }

let rotations = withInputLines()
  .map( line => [ Number(line.slice(1)), direction[line[0]] ])

const rotate = (position, count, dir) => {
  let zeroes = 0

  for (let i = 0; i < count; i++) {
    position += dir

    if (position == 100) position = 0
    if (position ==  -1) position = 99

    if (position == 0) zeroes++
  }

  return [ position, zeroes ]
}

function part1() {
  let position = 50
  let password = 0

  rotations.forEach( rotation => {
    ([ position ] = rotate(position, ...rotation))
    if (position == 0) password++
  })

  return password
}

function part2() {
  let position = 50
  let password = 0

  rotations.forEach( rotation => {
    let [ newPos, zeroes ] = rotate(position, ...rotation)
    position = newPos
    password += zeroes
  })

  return password
}

console.log('2025 part 1 -', part1(), elapsed())
console.log('2025 part 2 -', part2(), elapsed())
