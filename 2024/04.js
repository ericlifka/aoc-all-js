import {withInputGrid} from "../utilities/with-input.js"
import {vecAdd} from "../utilities/vectors.js"
import {totalElapsed} from "../utilities/timer.js"

const letters = withInputGrid()

const getAt = vec => {
  if (vec[0] >= 0 && vec[1] >= 0 && letters.length > vec[0] && letters[vec[0]].length > vec[1]) {
    return letters[vec[0]][vec[1]]
  } else {
    return undefined
  }
}
const slice = (start, direction) => {
  let result = [ getAt(start) ]
  for (let i = 0; i < 3; i++) {
    start = vecAdd(start, direction)
    result.push(getAt(start))
  }
  return result.join('')
}
const getAllSlices = start =>
  [
    [-1, -1 ], [-1,  0 ], [-1,  1 ],
    [ 0, -1 ],            [ 0,  1 ],
    [ 1, -1 ], [ 1,  1 ], [ 1,  0 ],
  ].map(direction => slice(start, direction))

console.log('2024 day 04 part 1 -', letters
  .flatMap((row, y) => row.map((letter, x) =>
    letter === 'X' ? [ y, x ] : undefined))
  .filter(Boolean)
  .flatMap(getAllSlices)
  .filter( str => str === 'XMAS' )
  .length)

const checkX = middle => {
  let upperLeft =  getAt(vecAdd(middle, [-1, -1 ]))
  let upperRight = getAt(vecAdd(middle, [-1,  1 ]))
  let lowerLeft =  getAt(vecAdd(middle, [ 1, -1 ]))
  let lowerRight = getAt(vecAdd(middle, [ 1,  1 ]))

  return (upperLeft === 'M' && lowerRight === 'S' || upperLeft === 'S' && lowerRight === 'M') &&
         (upperRight === 'M' && lowerLeft === 'S' || upperRight === 'S' && lowerLeft === 'M')
}

console.log('2024 day 04 part 2 -', letters
  .flatMap((row, y) => row.map((letter, x) =>
    letter === 'A' ? [ y, x ] : undefined))
  .filter(Boolean)
  .filter(checkX)
  .length)

console.log(totalElapsed())
