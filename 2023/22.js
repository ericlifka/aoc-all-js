import { withInputLines } from "../utilities/with-input.js"
import { toInt } from "../utilities/parsers.js"
import { sum } from "../utilities/reducers.js"

// { x_min: 0, x_max: 9, y_min: 0, y_max: 9, z_min: 1, z_max: 360 }
let size = 10
let height = 360

let blocks = withInputLines()
    .map( line => line.split(/[,~]/) )
    .map( nums => nums.map(toInt) )
    .sort((left, right) => Math.min(left[2], left[5]) - Math.min(right[2], right[5]))
    .map(([x1, y1, z1, x2, y2, z2], index) => {
        let cubes = []
        for (let x = x1; x <= x2; x++) for (let y = y1; y <= y2; y++) for (let z = z1; z <= z2; z++) {
            cubes.push([x, y, z])
        }
        return {
            cubes, name: index, supporting: new Set(), restingOn: new Set()
        }
    })


let space = []
for (let x = 0; x < size; x++) {
    space[x] = []
    for (let y = 0; y < size; y++) {
        space[x][y] = Array.from(new Array(height))
        space[x][y][0] = -1
    }
}

for (let block of blocks) {
    // move down until encountering a block to rest on
    while (block.cubes.every(([x, y, z]) => space[x][y][z - 1] == undefined)) {
        block.cubes = block.cubes.map(([x, y, z]) => ([x, y, z - 1]))
    }
    // mark all blocks being rested on
    block.cubes.forEach(([x, y, z]) => {
        let blockBelow = space[x][y][z - 1]
        if (blockBelow != undefined && blockBelow > -1) {
            blocks[blockBelow].supporting.add(block.name)
            block.restingOn.add(blockBelow)
        }
    })
    // fill block into space
    block.cubes.forEach(([x, y, z]) => {
        space[x][y][z] = block.name
    })
}

console.log('part 1: ', blocks
    .filter( block => {
        if (block.supporting.size == 0) {
            return true
        } else if ([...block.supporting].every( otherBlock => blocks[otherBlock].restingOn.size > 1 )) {
            return true
        } else {
            return false
        }
    })
    .length)


function howManyFall(block) {
    let queue = [ ...block.supporting ]
    let wouldFall = new Set([ block.name ])
    while (queue.length > 0) {
        let b = blocks[queue.shift()]
        if ([...b.restingOn].every( _b => wouldFall.has(_b) )) {
            wouldFall.add(b.name)
            queue.push(...b.supporting)
        }

        queue.sort((left, right) => blocks[left].cubes[0][2] - blocks[right].cubes[0][2])
    }
    return wouldFall.size - 1
}

let total = 0
for (let block of blocks) {
    let count = howManyFall(block)
    total += count
    console.log(block.name, ": ", count)
}
console.log('part 2: ', total)

// console.log('part 2: ', blocks.map(howManyFall).reduce(sum))

// console.log('\n')

// for (let block of blocks.slice(0,20)) {
//     console.log(block.name, ": ", block.cubes, ' - ', block.supporting)
// }

// for (let y = size - 1; y >= 0; y--) {
//     let row = ""
//     for (let x = 0; x < size; x++) {
//         row += space[x][y][1] != undefined ? '#' : '.'
//     }
//     console.log(row)
// }
// console.log('\n')

