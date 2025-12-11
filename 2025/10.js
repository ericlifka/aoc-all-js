import { withInputLines } from "../utilities/with-input.js"
import { sum } from "../utilities/reducers.js"
import { Matrix } from "../utilities/matrix.js"
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
    .map( s => s.slice(1, -1).split(',').map(Number))
    .map( targets => {
      let button = joltage.map(() => 0)
      targets.forEach( t => button[t] = 1 )
      return button
    })
    
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

// [.##.] (3) (1,3) (2) (2,3) (0,2) (0,1) {3,5,4,7}

function calculateMinimumPresses(buttons, targets) {
    
  let m = new Matrix()
  buttons.forEach( b => m.addColumn(b) )
  m.addColumn(targets)

  // console.log(m.toString())

  let rref = m.findReducedRowEchelonForm()
  let pivots = buttons.map((_, col) => rref.isPivotColumn(col))
  let freeVars = pivots.map((p, i) => p ? -1 : i).filter((v => v != -1))

  let solutionMatrix = new Matrix()
  solutionMatrix.addColumn(
    buttons.map((_, col) => {
      if (pivots[col]) {
        return rref.data[rref.getColumn(col).findIndex( v => v == 1)][rref.data[0].length - 1]
      } else {
        return 0
      }
    }))

  freeVars.forEach( freeVar => {
    let newCol = []
    let offset = 0
    for (let i = 0; i < buttons.length; i++) {
      if (pivots[i]) {
        newCol[i] = -1 * rref.data[i - offset][freeVar]
      } else {
        newCol[i] = i == freeVar ? 1 : 0
        offset++
      }
    }
    solutionMatrix.addColumn(newCol)
  })

  // console.log(rref.toString())
  // console.log(solutionMatrix.toString())
  // console.log(pivots, freeVars)

  let max = Math.max(...targets)

  const reduceSolutionMatrix = (vars) => {
    return solutionMatrix.data.map( row =>
      [1, ...vars].map((val, i) => val * row[i]).reduce(sum))
  }

  let min = Infinity

  if (freeVars.length == 0) {
    min = reduceSolutionMatrix([]).reduce(sum)
    // console.log('no free vars -', min)
  }
  else if (freeVars.length == 1) {
    for (let i = 0; i <= max; i++) {
      let solution = reduceSolutionMatrix([i])
      if (solution.find(v => v < 0)) {
        continue
      }
      let totalPressed = solution.reduce(sum)
      if (!Number.isInteger(totalPressed)) {
        continue
      }
      // console.log(i, '-', totalPressed, ',', solution)
      if (totalPressed < min) {
        min = totalPressed
      }
    }
  } 
  else if (freeVars.length == 2) {
    for (let i = 0; i <= max; i++) {
      for (let ii = 0; ii <= max; ii++) {
        let solution = reduceSolutionMatrix([i, ii])
        if (solution.find(v => v < 0)) {
          continue
        }
        let totalPressed = solution.reduce(sum)
        if (!Number.isInteger(totalPressed)) {
          continue
        }
        // console.log(i, ',', ii, '-', totalPressed, ',', solution)
        if (totalPressed < min) {
          min = totalPressed
        }
      }
    }
  } 
  else if (freeVars.length == 3) {
    for (let i = 0; i <= max; i++) {
      for (let ii = 0; ii <= max; ii++) {
        for (let iii = 0; iii <= max; iii++) {
          let solution = reduceSolutionMatrix([i, ii, iii])
          if (solution.find(v => v < 0)) {
            continue
          }
          let totalPressed = solution.reduce(sum)
          if (!Number.isInteger(totalPressed)) {
            continue
          }
          // console.log(i, ',', ii, ',', iii, '-', totalPressed, ',', solution)
          if (totalPressed < min) {
            min = totalPressed
          }
        }
      }
    }
  } 
  else {
    throw new Error("got an amount of freeVars that wasn't expected: " + freeVars.length)
  }
  

  return min
}

let part2 = part2Input.map(({buttons, joltage}, i) => {
  return calculateMinimumPresses(buttons, joltage)
}).reduce(sum)

console.log('part2 -', part2, elapsed())

// console.log(
// calculateMinimumPresses(
//   part2Input[131].buttons,
//   part2Input[131].joltage))
//   [
//     [0, 0, 0, 1], // A
//     [0, 1, 0, 1], // B
//     [0, 0, 1, 0], // C
//     [0, 0, 1, 1], // D
//     [1, 0, 1, 0], // E
//     [1, 1, 0, 0], // F
//   ],
//   [3, 5, 4, 7] // targets)
// )

// console.log('0, 0 -> ', reduceSolutionMatrix([0, 0]))

// m._swapRows(0, 3)
// console.log(m.toString())
// m._addRowToOtherRow(3, 2, -1)
// console.log(m.toString())
// m._addRowToOtherRow(1, 0, -1)
// console.log(m.toString())
