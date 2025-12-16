import { sum } from "../utilities/reducers.js"
import { withInputSegments } from "../utilities/with-input.js"

let segments = withInputSegments('\n\n')
let grids = segments.pop()

segments = segments
  .map( s => s
    .split('\n')
    .slice(1)
    .join('')
    .split('')
    .filter( c => c == '#' )
    .length )

grids = grids
  .split('\n')
  .map( grid => grid.split(': '))
  .map(([area, counts]) => ({
    dimensions: area.split('x').map(Number),
    counts: counts.split(' ').map(Number)
  }))
  .map(({dimensions, counts}) => ({
    dimensions: dimensions[0] * dimensions[1],
    counts: counts.map((c, i) => segments[i] * c).reduce(sum)
  }))
  .filter(({dimensions, counts}) => dimensions > counts)

console.log('part 1 -', grids.length)
