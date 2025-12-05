import { sum } from "../utilities/reducers.js"
import { elapsed } from "../utilities/timer.js"
import { withInputSegments } from "../utilities/with-input.js"

let [ ranges, ids ] = withInputSegments('\n\n')

ranges = ranges
  .split('\n')
  .map(line => line
    .split('-')
    .map(Number))
  .sort(([l], [r]) => l - r)

ids = ids
  .split('\n')
  .map(Number)

const combined = [ ranges[0] ]
const addRange = ([min, max]) => {
  const last = combined[combined.length - 1]
  if (min > last[ 1 ])
    combined.push([min, max])
  else if (max > last[ 1 ])
    last[ 1 ] = max
}

for (let range of ranges)
  addRange(range)

const part1 = ids.filter( id => {
  for (let [ min, max ] of combined) {
    if (id >= min && id <= max)
      return true
  }
  return false
})

console.log('part1 -', part1.length, elapsed())

const part2 = combined
  .map(([min, max]) => max - min + 1)
  .reduce(sum)

console.log('part2 -', part2, elapsed())
