import { withInputLines } from "../utilities/with-input.js"
import { toInt } from "../utilities/parsers.js"
import { sumOfSums } from "../utilities/reducers.js"

const simpleHandlers = {
    "turn on": bool => true,
    "turn off": bool => false,
    "toggle": bool => !bool }
const complexHandlers = {
    "turn on": val => val + 1,
    "turn off": val => Math.max(val - 1, 0),
    "toggle": val => val + 2 }

const instructions = withInputLines("2015/input/06.txt")
    .map( line => line.match(/(turn on|turn off|toggle) (\d+),(\d+) through (\d+),(\d+)/))
    .map(([_, instruction, x1, y1, x2, y2]) => ({ 
        instruction,
        p1: { x: toInt(x1), y: toInt(y1) },
        p2: { x: toInt(x2), y: toInt(y2) }
    }))

let lightToggles = Array.from(new Array(1000)).map(() => Array.from(new Array(1000)).fill(false))
let lightValues = Array.from(new Array(1000)).map(() => Array.from(new Array(1000)).fill(0))

instructions.forEach(({instruction, p1, p2}) => {
    for (let x = p1.x; x <= p2.x; x++) for (let y = p1.y; y <= p2.y; y++) {
        lightToggles[x][y] = simpleHandlers[instruction](lightToggles[x][y])
        lightValues[x][y] = complexHandlers[instruction](lightValues[x][y])
    }
})

console.log('part 1: ', lightToggles.reduce(sumOfSums, 0))
console.log('part 2: ', lightValues.reduce(sumOfSums, 0))
