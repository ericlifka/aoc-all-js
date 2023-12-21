import { withInputGrid } from "../utilities/with-input.js"
import { reduce2d } from "../utilities/vectors.js"
import { elapsed } from "../utilities/timer.js"

const ceiling = 5000

let grid = withInputGrid()
let width = grid[0].length
let height = grid.length
let start = reduce2d(grid, (coord, cell, x, y) => cell == 'S' ? { x, y } : coord)

const lookupCell = (x, y) => {
    while (x < 0) x += width
    while (x >= width) x -= width
    while (y < 0) y += height
    while (y >= height) y -= height

    return grid[y][x]
}

let distances = {}
let queue = [ { x: start.x, y: start.y, steps: 0 } ]
while (queue.length > 0) {
    let { x, y, steps } = queue.shift()

    if ( lookupCell(x, y) != "#" ) { // position is within the grid and not a rock
        let key = `${x},${y}`
        if ( distances[key] == undefined || steps < distances[key] ) {  // position hasn't been visited before or we've reached it in fewer steps
            distances[key] = steps
            steps += 1
            if (steps <= ceiling) {
                queue.push(...[
                    { x, y: y - 1, steps },
                    { x, y: y + 1, steps },
                    { x: x - 1, y, steps },
                    { x: x + 1, y, steps },
                ])
            }
        }
    }
}

const stepsReachedIn = steps =>
    Object.values(distances)
        .filter( count =>
            count <= steps && count % 2 == steps % 2 )
        .length

console.log('generated grid', elapsed())

// console.log('part 1: ', stepsReachedIn(64), elapsed())
console.log('6:', stepsReachedIn(6), elapsed())
console.log('10:', stepsReachedIn(10), elapsed())
console.log('50:', stepsReachedIn(50), elapsed())
console.log('100:', stepsReachedIn(100), elapsed())
console.log('500:', stepsReachedIn(500))
console.log('1000:', stepsReachedIn(1000))
console.log('5000:', stepsReachedIn(5000))
