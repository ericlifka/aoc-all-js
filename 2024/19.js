import {withInputSegments} from "../utilities/with-input.js"
import {totalElapsed} from "../utilities/timer.js"
import {sum} from "../utilities/reducers.js";

let [towels, targets] = withInputSegments('\n\n')
towels = towels.split(', ')
targets = targets.split('\n')

const cache = new Map()
cache.set('', 1)
const check = str => {
  if (cache.has(str)) {
    return cache.get(str)
  }

  let count = 0
  for (let towel of towels) {
    if (str.startsWith(towel)) {
      count += check(str.slice(towel.length))
    }
  }
  cache.set(str, count)
  return count
}

console.log('2024 day 19 part 1 -', targets.filter(pattern => check(pattern) > 0).length)
console.log('2024 day 19 part 2 -', targets.map(check).reduce(sum))
console.log(totalElapsed())
