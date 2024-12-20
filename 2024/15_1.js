import {withInputSegments} from "../utilities/with-input.js"
import {sum} from "../utilities/reducers.js"
import {totalElapsed} from "../utilities/timer.js"

const [inputGrid, inputDirections] = withInputSegments('\n\n')

const map = inputGrid.split('\n').map( line => line.split('') )

const findRobot = () =>
  map.flatMap((row, y) =>
    row.map((space, x) => space === '@' ? {x, y} : null )
  ).find(Boolean)

const tryToMove = (position, direction) => {
  if (map[position.y][position.x] === '#') {
    return false
  }
  if (map[position.y][position.x] === '.') {
    return true
  }

  let target =
    direction === '<' ? { x: position.x - 1, y: position.y } :
    direction === '^' ? { x: position.x, y: position.y - 1 } :
    direction === 'v' ? { x: position.x, y: position.y + 1 } :
    direction === '>' ? { x: position.x + 1, y: position.y } :
      null

  if (!tryToMove(target, direction)) {
    return false
  }
  map[target.y][target.x] = map[position.y][position.x]
  map[position.y][position.x] = '.'
  return true
}

const printGrid = () => console.log(
  map.map( row => row.join('') ).join('\n'),
  '\n'
)

const scoreGrid = () =>
  map.flatMap((row, y) => row.map((space, x) =>
    space === 'O' ? y * 100 + x : 0)
  ).reduce(sum)

inputDirections.split('\n').join('').split('').forEach( direction => {
  tryToMove(findRobot(), direction)
})

console.log('2024 day 15 part 1 -', scoreGrid())
console.log(totalElapsed())
