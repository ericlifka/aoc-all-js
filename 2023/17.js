import { withInputGrid } from "../utilities/with-input.js"
import { map2d, vecAdd, vecEqual } from "../utilities/vectors.js"
import { toInt } from "../utilities/parsers.js"
import { elapsed } from "../utilities/timer.js"

let grid = map2d(withInputGrid(), toInt)
let height = grid.length
let width = grid[0].length
let target = [ width - 1, height - 1 ]

const insideGrid = (grid, [ x, y ]) => y >= 0 && y < grid.length && x >= 0 && x < grid[0].length
const lookup = (grid, [ x, y ]) => grid[y][x]
const setValue = (grid, [ x, y ], value) => grid[y][x] = value
const flipDirectionKey = {
    horizontal: 'vertical',
    vertical: 'horizontal' }

const runSimulation = (rangeStart, rangeStop) => {
    let minimums = {
        horizontal: map2d(grid, () => Infinity),
        vertical: map2d(grid, () => Infinity)
    }

    let queue = [
        { position: [ 0, 0 ], heatloss: 0, direction: 'horizontal' },
        { position: [ 0, 0 ], heatloss: 0, direction: 'vertical' },
    ]

    const walkInDirection = ({ position, heatloss, direction }, vector) => {
        for (let i = 1; i <= rangeStop; i++) {
            position = vecAdd(position, vector)
            if (!insideGrid(grid, position)) {
                return
            }

            heatloss += lookup(grid, position)
            if (heatloss < lookup(minimums[direction], position) && i >= rangeStart) {
                setValue(minimums[direction], position, heatloss)

                queue.push({
                    position, heatloss,
                    direction: flipDirectionKey[direction]
                })
            }
        }
    }

    while (queue.length > 0) {
        let evaluationPoint = queue.shift()

        if (evaluationPoint.direction == 'horizontal') {
            walkInDirection(evaluationPoint, [1, 0])  // walk east
            walkInDirection(evaluationPoint, [-1, 0]) // walk west
        }

        if (evaluationPoint.direction == 'vertical') {
            walkInDirection(evaluationPoint, [0, -1]) // walk north
            walkInDirection(evaluationPoint, [0, 1])  // walk south
        }

        queue.sort((left, right) => left.heatloss - right.heatloss)

        let finalScores = [ lookup(minimums.horizontal, target), lookup(minimums.vertical, target) ]
        if (finalScores[0] < Infinity && finalScores[1] < Infinity) {
            return Math.min(...finalScores)
        }
    }
}

console.log('part 1: ', runSimulation(1, 3), elapsed())
console.log('part 2: ', runSimulation(4, 10), elapsed())
