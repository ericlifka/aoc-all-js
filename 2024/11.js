import {withInputSegments} from "../utilities/with-input.js"
import {sum} from "../utilities/reducers.js"
import {totalElapsed} from "../utilities/timer.js"

const digitCount = stone => Math.floor(Math.log10(stone)) + 1
const evenDigits = stone => digitCount(stone) % 2 === 0
const splitDigits = stone => {
  let digits = digitCount(stone)
  let str = `${stone}`
  return [
    Number(str.slice(0, digits / 2)),
    Number(str.slice(digits / 2))
  ]
}

const incr = (obj, prop, count) => {
  if (!obj[ prop ]) {
    obj[ prop ] = 0
  }
  obj[ prop ] += count
}

const blink = stones => {
  let next = { }
  Object.keys(stones).forEach( key => {
    let stone = Number(key)
    let count = stones[ key ]

    if (stone === 0) {
      incr(next, 1, count)
    }
    else if (evenDigits(stone)) {
      let [left, right] = splitDigits(stone)
      incr(next, left, count)
      incr(next, right, count)
    }
    else {
      incr(next, stone * 2024, count)
    }
  })
  return next
}

const runSim = (stones, duration) => {
  for (let i = 0; i < duration; i++) {
    stones = blink(stones)
  }
  return stones
}

const countStones = stones =>
  Object.values(stones).reduce(sum)

let stones = {}
withInputSegments(' ').map(Number).forEach( stone =>
  stones[ stone ] = 1 )

let after25 = runSim(stones, 25)
let after75 = runSim(after25, 50)

console.log('2024 day 11, part 1 -', countStones(after25))
console.log('2024 day 11, part 2 -', countStones(after75))
console.log(totalElapsed())
