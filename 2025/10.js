import { withInputLines } from "../utilities/with-input.js"
import { sum } from "../utilities/reducers.js"
import { elapsed } from "../utilities/timer.js"

let input = withInputLines().map( line => line.split(' '))

let part1Input = input.map( segments => {
  let target = parseInt(segments[0].slice(1, -1).split('').reverse().map( c => c == '#' ? 1 : 0 ).join(''), 2)
  let buttons = segments.slice(1, -1).map( segment => segment.slice(1, -1).split(',').map(Number).map( b => Math.pow(2, b)).reduce((a, b) => a | b) )

  return { target, buttons }
})

let part2Input = input.map( segments => {
  let joltage = segments[segments.length - 1].slice(1, -1).split(',').map(Number)
  let buttons = segments.slice(1, -1)

  return { joltage, buttons }
})

const getButtonSubsets = buttons => buttons
  .reduce((subsets, value) => 
    subsets.concat(subsets.map(set => 
      [ ...set, value ])),
    [[]])
  .sort((l, r) => l.length - r.length)

function findFewestButtons({ target, buttons }) {
  let options = getButtonSubsets(buttons)
  for (let option of options) {
    if (target == option.reduce((l, r) => l ^ r, 0)) {
      return option.length
    }
  }
  console.log("cound't find a way: ", target, buttons)
}

let part1 = part1Input.map( i => findFewestButtons(i)).reduce(sum)
console.log('part 1 -', part1, elapsed())

// console.log(part2Input)