import { withInputGrid } from "../utilities/with-input.js"
import { map2d, reduce2d } from "../utilities/vectors.js"
import { sum } from "../utilities/reducers.js"
import { elapsed } from "../utilities/timer.js"

function countNeighbors(grid, x, y) {
  let count = 0
  for (let _x = -1; _x <= 1; _x++) {
    for (let _y = -1; _y <= 1; _y++) {
      if ( _x == 0 && _y == 0 ) continue
      if ( grid[ _y + y ] && grid[ _y + y ][ _x + x ] == '@' )
        count++
    }
  }
  return count
}

const findAccessible = (grid) => grid
  .flatMap((row, y) => row.map((c, x) => 
    c == '@' && countNeighbors(grid, x, y) < 4
      ? [ x, y ]
      : [] ))
  .filter( i => i.length > 0 )

const grid = withInputGrid()
let accessible = findAccessible(grid)
let removed = 0

console.log('part1 -', accessible.length, elapsed())

while (accessible.length > 0) {
  removed += accessible.length
  accessible.forEach(([ x, y ]) =>
    grid[ y ][ x ] = '.')

  accessible = findAccessible(grid)
}

console.log('part2 -', removed, elapsed())
