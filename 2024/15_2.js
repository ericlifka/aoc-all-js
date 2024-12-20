import {withInputSegments} from "../utilities/with-input.js"

const [inputGrid, inputDirections] = withInputSegments('\n\n')

const map = inputGrid.split('\n')
  .map( line =>
    line
      .split('')
      .map( char => ({'#': '##', '.': '..', 'O': '[]', '@': '@.'})[char] )
      .join('')
      .split('')
  )

const findRobot = () =>
  map.flatMap((row, y) =>
    row.map((space, x) => space === '@' ? {x, y} : null )
  ).find(Boolean)

const printGrid = () => console.log(
  map.map( row => row.join('') ).join('\n'),
  '\n'
)

const calcTarget = (position, direction) =>
  direction === '<' ? { x: position.x - 1, y: position.y } :
  direction === '^' ? { x: position.x, y: position.y - 1 } :
  direction === 'v' ? { x: position.x, y: position.y + 1 } :
  direction === '>' ? { x: position.x + 1, y: position.y } :
    null

const canMove = (position, direction) => {
  console.log(position, direction)
  if (map[position.y][position.x] === '#') {
    return false
  }
  if (map[position.y][position.x] === '.') {
    return true
  }

  if (map[position.y][position.x] === '@') {
    return canMove(calcTarget(position, direction), direction)
  }

  if (direction === '<' || direction === '>') {
    return canMove(calcTarget(position, direction), direction)
  }
  else {
    let otherHalf = {
      x: position.x + (map[position.y][position.x] === '[' ? 1 : -1),
      y: position.y,
    }

    return canMove(calcTarget(position, direction), direction) && canMove(calcTarget(otherHalf, direction), direction)
  }
}

const move = (position, direction) => {
  if (map[position.y][position.x] === '#' || map[position.y][position.x] === '.') {
    return
  }

  if (map[position.y][position.x] === '@' || direction === '<' || direction === '>') {
    let target = calcTarget(position, direction)
    move(target, direction)
    map[target.y][target.x] = map[position.y][position.x]
    map[position.y][position.x] = '.'
    return
  }

  // need to move box up or down
  let otherHalf = {
    x: position.x + map[position.y][position.x] === '[' ? 1 : -1,
    y: position.y,
  }

  let target = calcTarget(position, direction)
  move(target, direction)
  map[target.y][target.x] = map[position.y][position.x]
  map[position.y][position.x] = '.'

  target = calcTarget(otherHalf, direction)
  move(target, direction)
  map[target.y][target.x] = map[otherHalf.y][otherHalf.x]
  map[otherHalf.y][otherHalf.x] = '.'
}

printGrid()
inputDirections.split('\n').join('').split('').forEach( direction => {
  console.log('move: ', direction)
  let robot = findRobot()
  console.log(robot)
  if (canMove(robot, direction)) {
    move(robot, direction)
  }
  printGrid()
})
