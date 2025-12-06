import { vec2dGetColumn } from "../utilities/vectors.js"
import { withInputGrid, withInputLines } from "../utilities/with-input.js"
import { sum, multiply } from "../utilities/reducers.js"
import { elapsed } from "../utilities/timer.js"

const mathFunc = (sym) => sym == '*' ? multiply
                        : sym == '+' ? sum
                                     : undefined

const part1Worksheet = withInputLines().map(line => line.trim().split(/\s+/))
const part2Worksheet = withInputGrid()

let part1Checksum = 0
for (let x = 0; x < part1Worksheet[0].length; x++) {
  let problem = vec2dGetColumn(part1Worksheet, x)
  let func = mathFunc(problem.pop())
  part1Checksum += problem.map(Number).reduce(func)
}

console.log('part 1 -', part1Checksum, elapsed())

let part2Checksum = 0
let problem = []
for (let x = part2Worksheet[0].length - 1; x >= 0; x--) {
  let slice = vec2dGetColumn(part2Worksheet, x)
  let func = mathFunc(slice.pop())
  problem.push(slice.join(''))
  
  if (func) {
    part2Checksum += problem.map(Number).reduce(func)
    problem = []
    x--
  }
}

console.log('part 2 -', part2Checksum, elapsed())
