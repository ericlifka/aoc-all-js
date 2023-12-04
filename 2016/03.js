import { withInputLines } from "../utilities/with-input.js"
import { toInt } from "../utilities/parsers.js"
import { ascending } from "../utilities/sort.js"

const input = withInputLines("2016/input/03.txt")
    .map( line => line
        .split(' ')
        .filter( v => v.length > 0)
        .map(toInt))

let triangles = []
for (let y = 0; y < input.length; y += 3) {
    for (let x = 0; x < 3; x++) {
        triangles.push([ input[ y ][ x ], input[ y+1 ][ x ], input[ y+2 ][ x ] ])
    }
}

console.log('part 1: ', input
    .map( triangle => triangle.sort(ascending) )
    .filter(([a, b, c]) => a + b > c)
    .length)

console.log('part 2: ', triangles
    .map( triangle => triangle.sort(ascending))
    .filter(([a, b, c]) => a + b > c)
    .length)
