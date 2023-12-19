import { withInputLines } from "../utilities/with-input.js"
import { vecAdd } from "../utilities/vectors.js"
import { toInt } from "../utilities/parsers.js"

const coordKey = ([ x, y ]) => `<${x},${y}>`

const vectors = {
    U: [  0,  1 ],
    D: [  0, -1 ],
    L: [ -1,  0 ],
    R: [  1,  0 ] }

let position = [ 0, 0 ]
let map = { [coordKey(position)]: '#' }
let dimensions = {
    min_x: 0, max_x: 0,
    min_y: 0, max_y: 0 }

const updateDimensions = ([ x, y ]) => {
    dimensions.min_x = Math.min(dimensions.min_x, x)
    dimensions.min_y = Math.min(dimensions.min_y, y)
    dimensions.max_x = Math.max(dimensions.max_x, x)
    dimensions.max_y = Math.max(dimensions.max_y, y)
}

const printGrid = () => {
    for (let y = dimensions.min_y; y <= dimensions.max_y; y++) {
        let row = ""
        for (let x = dimensions.min_x; x <= dimensions.max_x; x++) {
            if (map[coordKey([x,y])]) {
                row += map[coordKey([x,y])]
            } else {
                row += '.'
            }
        }
        console.log(row)
    }    
}


withInputLines()
    .map(line => line.split(' '))
    .map(([direction, distance]) => [ vectors[direction], toInt(distance) ])
    .forEach(([direction, distance]) => {
        for (let i = 0; i < distance; i++) {
            position = vecAdd(position, direction)
            map[ coordKey(position) ] = '#'
            updateDimensions(position)
        }
    })

dimensions.min_x--
dimensions.min_y--
dimensions.max_x++
dimensions.max_y++

printGrid()

let queue = [ [dimensions.min_x, dimensions.min_y] ]
while (queue.length > 0) {
    let [ x, y ] = queue.pop()
    if (!map[coordKey([ x, y ])]) {
        map[coordKey([ x, y ])] = ' ';
        ([
            [ x - 1, y ],
            [ x + 1, y ],
            [ x, y - 1 ],
            [ x, y + 1 ]
        ]).forEach(([ x , y ]) => {
            if (x >= dimensions.min_x && x <= dimensions.max_x && y >= dimensions.min_y && y <= dimensions.max_y) {
                queue.push([ x, y ])
            }
        })
    }
}



console.log('\n\n')
printGrid()

let area = 0
for (let y = dimensions.min_y; y <= dimensions.max_y; y++) {
    for (let x = dimensions.min_x; x <= dimensions.max_x; x++) {
        let cell = map[coordKey([x,y])]
        if (cell && cell == '#') {
            area++
        }
        if (!cell) {
            area++
        }
    }
}

console.log('part 1: ', area)