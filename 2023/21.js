import { withInputGrid } from "../utilities/with-input.js"
import { reduce2d } from "../utilities/vectors.js"
import { elapsed } from "../utilities/timer.js"

let grid = withInputGrid()
let width = grid[0].length
let height = grid.length
let start = reduce2d(grid, (coord, cell, x, y) => cell == 'S' ? { x, y } : coord)

let distances = {}
let queue = [ { x: start.x, y: start.y, steps: 0 } ]
while (queue.length > 0) {
    let { x, y, steps } = queue.shift()

    if (  x >= 0 && x < width
       && y >= 0 && y < height
       && grid[ y ][ x ] != "#" ) // position is within the grid and not a rock
    {
        let key = `${x},${y}`
        if ( distances[key] == undefined || steps < distances[key] ) {  // position hasn't been visited before or we've reached it in fewer steps
            distances[key] = steps
            steps += 1
            queue.push(...[
                { x, y: y - 1, steps },
                { x, y: y + 1, steps },
                { x: x - 1, y, steps },
                { x: x + 1, y, steps },
            ])
        }
    }
}

const stepsReachedIn = steps =>
    Object.values(distances)
        .filter( count =>
            count <= steps && count % 2 == steps % 2 )
        .length


console.log('part 1: ', stepsReachedIn(64), elapsed())
