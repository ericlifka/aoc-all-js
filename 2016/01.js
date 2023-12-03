import { withInputSegments } from "../utilities/with-input.js"
import { vecAdd } from "../utilities/vectors.js"

const coord = ([x, y]) => `<${x},${y}>`
const distance = ([x, y]) => Math.abs(x) + Math.abs(y)

let movement = [ [0, 1], [1, 0], [0, -1], [-1, 0] ]
let position = [ 0, 0 ]
let visited = new Set([coord(position)])
let firstRepeat = null
let facing = 0
let rotations = {
    'R': () => {
        facing += 1
        if (facing > 3) facing = 0
    },
    'L': () => {
        facing -= 1
        if (facing < 0) facing = 3
    }
}

withInputSegments("2016/input/01.txt", ", ")
    .map( dir => [ dir[0], parseInt(dir.slice(1), 10)])
    .forEach(([rot, dist]) => {
        rotations[rot]()
        for (let i = 0; i < dist; i++) {
            position = vecAdd(position, movement[facing])
            if (!firstRepeat && visited.has(coord(position))) {
                firstRepeat = position
            } else {
                visited.add(coord(position))
            }
        }
    })

console.log("part 1: ", distance(position))
console.log("part 2: ", distance(firstRepeat))
