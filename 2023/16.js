import { withInputGrid } from "../utilities/with-input.js"
import { vecAdd, map2d, reduce2d } from "../utilities/vectors.js"
import { descending } from "../utilities/sort.js"

const directions = {
    'N': [  0, -1 ],
    'E': [  1,  0 ],
    'S': [  0,  1 ],
    'W': [ -1,  0 ] }

let input = withInputGrid()
let height = input.length
let width = input[0].length
const isOffGrid = ([x, y]) => x < 0 || y < 0 || x >= width || y >= height

const runSimulationFromStartingPosition = (startingPosition, startingDirection) => {
    let energized = map2d(input, () => false)
    let grid = map2d(input, cell => {
        let cellConsumed = false
        switch (cell) {
            case '.': return dir => [ dir ]
    
            case '\\': return dir =>
                  dir == 'N' ? [ 'W' ]
                : dir == 'E' ? [ 'S' ]
                : dir == 'S' ? [ 'E' ]
                : dir == 'W' ? [ 'N' ]
                : [ ]
    
            case '/': return dir =>
                  dir == 'N' ? [ 'E' ]
                : dir == 'E' ? [ 'N' ]
                : dir == 'S' ? [ 'W' ]
                : dir == 'W' ? [ 'S' ]
                : [ ]
    
            case '-': return dir => {
                if (dir == 'E' || dir == 'W') return [ dir ]
                if (cellConsumed) return [ ]
                else {
                    cellConsumed = true
                    return [ 'W', 'E' ]
                }
            }
    
            case '|': return dir => {
                if (dir == 'N' || dir == 'S') return [ dir ]
                if (cellConsumed) return [ ]
                else {
                    cellConsumed = true
                    return [ 'N', 'S' ]
                }
            }
        }
    })
    
    let queue = [ { position: startingPosition, direction: startingDirection } ]
    while (queue.length > 0) {
        let { position, direction } = queue.shift()
        let [ x, y ] = position
        energized[y][x] = true
        grid[y][x](direction).forEach( newDirection => {
            let newPosition = vecAdd(position, directions[newDirection])
            if (!isOffGrid(newPosition)) {
                queue.push({ position: newPosition, direction: newDirection })
            }
        })
    }

    return reduce2d(energized, (count, cell) => cell ? count + 1 : count, 0)
}

console.log('part 1: ', runSimulationFromStartingPosition([ 0, 0, ], 'E'))

let energyTotals = []
for (let y = 0; y < height; y++) {
    energyTotals.push(runSimulationFromStartingPosition([ 0, y ], 'E'))
    energyTotals.push(runSimulationFromStartingPosition([ width - 1, y ], 'W'))
}
for (let x = 0; x < width; x++) {
    energyTotals.push(runSimulationFromStartingPosition([ x, 0 ], 'S'))
    energyTotals.push(runSimulationFromStartingPosition([ x, height - 1 ], 'N'))
}

console.log('part 2: ', energyTotals.sort(descending).at(0))
