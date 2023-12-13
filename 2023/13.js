import { withInputSegments } from '../utilities/with-input.js'
import { sum } from '../utilities/reducers.js'

const doesReflectAlongRow = (grid, index) => {
    let mirrorIndex = index + 1
    while (index >= 0 && mirrorIndex <= grid.length - 1) {
        for (let x = 0; x < grid[0].length; x++) {
            if (grid[index][x] != grid[mirrorIndex][x]) {
                return false
            }
        }
        index--
        mirrorIndex++
    }
    return true
}

const doesReflectAlongColumn = (grid, index) => {
    let mirrorIndex = index + 1
    while (index >= 0 && mirrorIndex <= grid[0].length - 1) {
        for (let y = 0; y < grid.length; y++) {
            if (grid[y][index] != grid[y][mirrorIndex]) {
                return false
            }
        }
        index--
        mirrorIndex++
    }
    return true
}

const findReflection = (grid, ignoredReflection = {type: '', index: -1}) => {
    for (let y = 0; y < grid.length - 1; y++) {
        if (doesReflectAlongRow(grid, y)) {
            if (ignoredReflection.type != 'row' || ignoredReflection.index != y) {
                return { type: 'row', index: y }
            }
        }
    }
    for (let x = 0; x < grid[0].length - 1; x++) {
        if (doesReflectAlongColumn(grid, x)) {
            if (ignoredReflection.type != 'column' || ignoredReflection.index != x) {
                return { type: 'column', index: x }
            }
        }
    }
    return null
}

const scorePuzzle = ({ reflection }) => {
    if (reflection.type == 'row') {
        return (reflection.index + 1) * 100
    } else {
        return reflection.index + 1
    }
}

const invert = { '#': '.', '.': '#' }

const copyWithBlemish = (grid, x, y) => {
    let newGrid = grid.map(line => line.map(ch => ch))
    newGrid[y][x] = invert[ newGrid[y][x] ]
    return newGrid
}

const findBlemish = puzzle => {
    for (let y = 0; y < puzzle.grid.length; y++) {
        for (let x = 0; x < puzzle.grid[0].length; x++) {
            let blemishGrid = copyWithBlemish(puzzle.grid, x, y)
            let reflection = findReflection(blemishGrid, puzzle.reflection)
            if (reflection) {
                puzzle.blemishReflection = reflection
                puzzle.blemish = { x, y }
                return
            }
        }
    }
}

const scoreBlemishReflection = ({ blemishReflection }) => {
    if (blemishReflection.type == 'row') {
        return (blemishReflection.index + 1) * 100
    } else {
        return blemishReflection.index + 1
    }
}


let puzzles = withInputSegments('\n\n')
    .map( segment => ({ grid: segment.split('\n').map( line => line.split('')) }))

puzzles.forEach((puzzle) => {
    puzzle.reflection = findReflection(puzzle.grid)
    findBlemish(puzzle)
})

console.log('part 1: ', puzzles.map(scorePuzzle).reduce(sum))
console.log('part 2: ', puzzles.map(scoreBlemishReflection).reduce(sum))
