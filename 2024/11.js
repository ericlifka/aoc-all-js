import {withInputSegments} from "../utilities/with-input.js"
import {totalElapsed} from "../utilities/timer.js"

const input = withInputSegments(' ').map(Number)

const step = stones => stones.flatMap( stone => {
  if (stone === 0)
    return 1

  let digits = Math.floor(Math.log10(stone)) + 1
  if (digits % 2 === 0) {
    // let magnitude = Math.pow(10, digits / 2)
    // let midpoint = stone / magnitude
    // let left = Math.floor(midpoint)
    // let right = (midpoint - left) * magnitude
    let str = `${stone}`
    return [
      Number(str.slice(0, digits / 2)),
      Number(str.slice(digits / 2))
    ]
  }

  return stone * 2024
})

const runSim = (stones, duration) => {
  for (let i = 0; i < duration; i++) {
    stones = step(stones)
  }
  return stones
}

console.log('2024 day 11, part 1 -', runSim(input, 25).length)
console.log(totalElapsed())
