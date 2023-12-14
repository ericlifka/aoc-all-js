import { withInputLines } from "../utilities/with-input.js"
import { elapsed } from "../utilities/timer.js"

const weightLoad = (platform) => {
    let load = 0
    for (let y = 0; y < platform.length; y++) for (let x = 0; x < platform[0].length; x++) {
        if (platform[y][x] == 'O') {
            load += platform.length - y
        }
    }
    return load
}

const rollNorth = platform => {
    for (let x = 0; x < platform[0].length; x++) for (let y = 0; y < platform.length; y++) {
        if (platform[y][x] == 'O') {
            platform[y][x] = '.'
            let target = y
            while (target - 1 >= 0 && platform[target - 1][x] == '.') {
                target--
            }
            platform[target][x] = 'O'
        }
    }
}

const rollSouth = platform => {
    for (let x = 0; x < platform[0].length; x++) for (let y = platform.length - 1; y >= 0; y--) {
        if (platform[y][x] == 'O') {
            platform[y][x] = '.'
            let target = y
            while (target + 1 < platform.length && platform[target + 1][x] == '.') {
                target++
            }
            platform[target][x] = 'O'
        }
    }
}

const rollWest = platform => {
    for (let y = 0; y < platform.length; y++) for (let x = 0; x < platform[0].length; x++) {
        if (platform[y][x] == 'O') {
            platform[y][x] = '.'
            let target = x
            while (target - 1 >= 0 && platform[y][target - 1] == '.') {
                target--
            }
            platform[y][target] = 'O'
        }
    }
}

const rollEast = platform => {
    for (let y = 0; y < platform.length; y++) for (let x = platform[0].length - 1; x >= 0; x--) {
        if (platform[y][x] == 'O') {
            platform[y][x] = '.'
            let target = x
            while (target + 1 < platform[0].length && platform[y][target + 1] == '.') {
                target++
            }
            platform[y][target] = 'O'
        }
    }
}

const cycle = platform => {
    rollNorth(platform)
    rollWest(platform)
    rollSouth(platform)
    rollEast(platform)
}

const cacheKey = platform =>
    platform.map( row => row.join('') ).join('\n')


const part1 = () => {
    let platform = withInputLines().map( line => line.split('') )
    rollNorth(platform)
    return weightLoad(platform)
}

const part2 = () => {
    let platform = withInputLines().map( line => line.split('') )
    
    let seenStates = new Set()
    let cycleStates = new Set()
    let cycleOrder = []
    
    while (true) {
        let key = cacheKey(platform)
        if (seenStates.has(key)) {
            if (cycleStates.has(key)) { // cycle has looped
                break
            } else {
                cycleStates.add(key)
                cycleOrder.push(key)
            }
        } else {
            seenStates.add(key)
        }
    
        cycle(platform)
    }
    
    let offsetSize = seenStates.size - cycleStates.size
    let finalGridIndex = (1000000000 - offsetSize) % cycleOrder.length
    
    return weightLoad(cycleOrder[finalGridIndex].split('\n').map(row => row.split('')))
}

console.log('part 1: ', part1(), elapsed())
console.log('part 2: ', part2(), elapsed())