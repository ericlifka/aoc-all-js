import { withInputGrid } from "../utilities/with-input.js"
import { reduce2d } from "../utilities/vectors.js"
import { elapsed } from "../utilities/timer.js"

let totalDistance = 26501365

let grid = withInputGrid()
let width = grid[0].length
let height = grid.length
let start = reduce2d(grid, (coord, cell, x, y) => cell == 'S' ? { x, y } : coord)

// console.log(width, 'x', height, ' -> ', start)

const lookupCell = (x, y) => {
    // while (x < 0) x += width
    // while (x >= width) x -= width
    // while (y < 0) y += height
    // while (y >= height) y -= height
    if (x < 0 || y < 0 || x >= width || y >= height) {
        return '#'
    }
    return grid[y][x]
}

const runFromPoint = (start, stepsRemaining) => {
    let distances = {}
    let queue = [ { x: start.x, y: start.y, steps: 0 } ]
    while (queue.length > 0) {
        let { x, y, steps } = queue.shift()

        if ( lookupCell(x, y) != "#" ) { // position is within the grid and not a rock
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

    return [
        Object.values(distances).filter( count => count <= stepsRemaining && count % 2 == 0 ).length,
        Object.values(distances).filter( count => count <= stepsRemaining && count % 2 == 1 ).length
    ]
}

let coords = [
    [0, 0],
    [130, 0],
    [0, 130],
    [130, 130],
    [65, 0],
    [0, 65],
    [65, 130],
    [130, 65],
]

// coords.forEach(([x, y]) => console.log(`starting from ${x},${y} - `, runFromPoint({ x, y }, 1000)))

let cache = {}
const cacheKey = (x, y, remaining) => `<${x},${y},${remaining}>`

const gridRange = Math.ceil(totalDistance / 131)
const startPointGrid = runFromPoint(start, 1000)
const fullCornerGrid = runFromPoint({ x: 0, y: 0 }, 1000)
const fullSideGrid = runFromPoint({ x: 0, y: 65 }, 1000)

// console.log(startPointGrid)
// console.log(fullCornerGrid)
// console.log(fullSideGrid)

let total = startPointGrid[totalDistance%2]

for (let x = -gridRange; x <= gridRange; x++) {
    let stepsRemaining = totalDistance - 66 - Math.abs(x) * width

    if (stepsRemaining <= 0 || x == 0) {
        continue
    }
    else if (stepsRemaining >= 130 + 65) {
        total += fullSideGrid[stepsRemaining%2]
    }
    else {
        let count = runFromPoint({ 
            x: x < 0 ? 130 : 0,
            y: 65 
        }, stepsRemaining)[stepsRemaining%2]
        // console.log(x, stepsRemaining, count)
        total += count
    }
}


for (let y = -gridRange; y <= gridRange; y++) {
    let stepsRemaining = totalDistance - 66 - Math.abs(y) * height

    if (stepsRemaining <= 0 || y == 0) {
        continue
    }
    else if (stepsRemaining >= 130 + 65) {
        total += fullSideGrid[stepsRemaining%2]
    }
    else {
        let count = runFromPoint({ 
            x: 65,
            y: y < 0 ? 130 : 0,
        }, stepsRemaining)[stepsRemaining%2]
        // console.log(y, stepsRemaining, count)
        total += count
    }
}


for (let y = -gridRange; y <= gridRange; y++) {
    if (y == 0) continue
    if (y % 10000 == 0) console.log(y)
    for (let x = -gridRange; x <= gridRange; x++) {
        if (x == 0) continue

        let stepsRemaining = totalDistance - 132 - Math.abs(y) * height - Math.abs(x) * width

        if (stepsRemaining <= 0) {
            continue
        }
        else if (stepsRemaining >= 130 + 130) {
            total += fullCornerGrid[stepsRemaining%2]
        }
        else {
            let _x = x < 0 ? 130 : 0
            let _y = y < 0 ? 130 : 0
            let key = cacheKey(_x, _y, stepsRemaining)
            if (cache[key]) {
                total += cache[key]
            } else {
                let count = runFromPoint({
                    x: _x,
                    y: _y
                }, stepsRemaining)[stepsRemaining%2]
                console.log('x:', x, ' y:', y, stepsRemaining, count)
                total += count
                cache[key] = count
            }
        }
    }
}

console.log('part 2: ', total, elapsed())

// wrong answers:
// 615621362473473
// 609286699453584
// 606258420581816


// console.log('generated grid', elapsed())

// // console.log('part 1: ', stepsReachedIn(64), elapsed())
// console.log('6:', stepsReachedIn(6), elapsed())
// console.log('10:', stepsReachedIn(10), elapsed())
// console.log('50:', stepsReachedIn(50), elapsed())
// console.log('100:', stepsReachedIn(100), elapsed())
// console.log('500:', stepsReachedIn(500))
// console.log('1000:', stepsReachedIn(1000))
// console.log('5000:', stepsReachedIn(5000))
