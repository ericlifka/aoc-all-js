import {withInputGrid} from "../utilities/with-input.js"
import {totalElapsed} from "../utilities/timer.js"

const input = withInputGrid(/\s+/, Number)

const alwaysDecreases = ([first, ...rest]) =>
  rest.length === 0 ? true
    : first <= rest[0] || first - rest[0] > 3 ? false
    : alwaysDecreases(rest)

const alwaysIncreases = ([first, ...rest]) =>
  rest.length === 0 ? true
    : first >= rest[0] || rest[0] - first > 3 ? false
    : alwaysIncreases(rest)

const mostlyDecreases = list =>
  list.find((_, i) =>
    alwaysDecreases([...list.slice(0, i), ...list.slice(i+1)]))

const mostlyIncreases = list =>
  list.find((_, i) =>
    alwaysIncreases([...list.slice(0, i), ...list.slice(i+1)]))

console.log('2024 day 02 part 1 -', input
  .filter( line => alwaysIncreases(line) || alwaysDecreases(line) )
  .length)

console.log('2024 day 02 part 2 -', input
  .filter( line => mostlyIncreases(line) || mostlyDecreases(line) )
  .length)

console.log(totalElapsed())
