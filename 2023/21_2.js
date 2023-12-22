import { withInputGrid } from "../utilities/with-input.js"
import { reduce2d } from "../utilities/vectors.js"
import { elapsed } from "../utilities/timer.js"

let grid = withInputGrid()
let width = grid.length
let halfWidth = Math.trunc(width / 2)
let [ start_x, start_y ] = reduce2d(grid, (coord, cell, x, y) => cell == 'S' ? [ x, y ] : coord)

console.log('part 1: ', walkFromPoint(start_x, start_y, 64))

let totalDistance = 26501365
let gridDistance = (totalDistance - halfWidth) / width



console.log('width:', width)
console.log('halfWidth:', halfWidth)
console.log('start:', start_x, ',', start_y)
console.log('totalDistance', totalDistance)
console.log('gridDistance', gridDistance)


// let evens = 0
// let odds = 0
// let outer = 0

// for (let x = -gridDistance; x <= gridDistance; x++) {
//     for (let y = Math.abs(x) - gridDistance; Math.abs(y) + Math.abs(x) <= gridDistance; y++) {
//         if (Math.abs(y) + Math.abs(x) == gridDistance) {
//             outer++
//         } else if ((x + y) % 2 == 0) {
//             odds++
//         } else {
//             evens++
//         }
//     }
// }

// let edges = (outer - 4) / 4
// let total = evens + odds + edges * 4 + 4

// hard coded from running the above code, which takes 3 minutes to compute. hopefully can find a formula later
let evens = 40925290000
let odds = 40924885401
let edges = 202299
let total = 81850984601
console.log("evens", evens)
console.log("odds", odds)
console.log("edges", edges)
console.log("total", total)


let oddGrid_size = walkFromPoint(start_x, start_y, 1001)
let evenGrid_size = walkFromPoint(start_x, start_y, 1000)

let east_point = walkFromPoint(0, start_y, width - 1)
let north_point = walkFromPoint(start_x, width - 1, width - 1)
let west_point = walkFromPoint(width - 1, start_y, width - 1)
let south_point = walkFromPoint(start_x, 0, width - 1)

let southWest_small = walkFromPoint(width - 1, 0, width - halfWidth - 2)
let southEast_small = walkFromPoint(0, 0, width - halfWidth - 2)
let northWest_small = walkFromPoint(width - 1, width - 1, width - halfWidth - 2)
let northEast_small = walkFromPoint(0, width - 1, width - halfWidth - 2)

let southWest_large = walkFromPoint(width - 1, 0, 2 * width - halfWidth - 2)
let southEast_large = walkFromPoint(0, 0, 2 * width - halfWidth - 2)
let northWest_large = walkFromPoint(width - 1, width - 1, 2 * width - halfWidth - 2)
let northEast_large = walkFromPoint(0, width - 1, 2 * width - halfWidth - 2)


console.log('oddGrid_size', oddGrid_size)
console.log('evenGrid_size', evenGrid_size)

console.log("east_point", east_point)
console.log("north_point", north_point)
console.log("west_point", west_point)
console.log("south_point", south_point)

console.log("southWest_small", southWest_small)
console.log("southEast_small", southEast_small)
console.log("northWest_small", northWest_small)
console.log("northEast_small", northEast_small)

console.log("southWest_large", southWest_large)
console.log("southEast_large", southEast_large)
console.log("northWest_large", northWest_large)
console.log("northEast_large", northEast_large)

let answer = 
    evens * evenGrid_size +
    odds * oddGrid_size +
    east_point + north_point + west_point + south_point +
    edges * (southWest_large + southEast_large + northWest_large + northEast_large) +
    (edges + 1) * (southWest_small + southEast_small + northWest_small + northEast_small)

console.log('part 2: ', answer)

function walkFromPoint(start_x, start_y, stepGoal) {
    let distances = {};
    let queue = [ [start_x, start_y, 0] ];
    while (queue.length > 0) {
        let [ x, y, steps ] = queue.shift()
        let key = `${x},${y}`

        if ( x >= 0 && y >= 0 && x < width && y < width && grid[y][x] != "#"
          && distances[key] == undefined && steps <= stepGoal )
        {
            distances[key] = steps
            queue.push(...[
                [ x, y - 1, steps + 1 ],
                [ x, y + 1, steps + 1 ],
                [ x - 1, y, steps + 1 ],
                [ x + 1, y, steps + 1 ],
            ])
        }
    }

    return Object.values(distances).filter( count => count % 2 == stepGoal % 2 ).length
}
