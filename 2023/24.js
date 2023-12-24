import { withInputLines } from "../utilities/with-input.js"
import { toInt } from "../utilities/parsers.js"

let low_bound = 200000000000000
let high_bound = 400000000000000
// let low_bound = 7
// let high_bound = 27


let hail = withInputLines()
    .map( line => line.split(/, | @ /))
    .map( numbers => numbers.map(toInt) )
    .map(([ px, py, pz, vx, vy, vz ]) => ({
        position: [ px, py, pz ],
        velocity: [ vx, vy, vz ],
        equation: {
            m: vy / vx,
            b: py - ((vy / vx) * px)
        }
    }))



const doesIntersect = (stone1, stone2) => {
    let {position: [ x1 ], velocity: [ vx1 ], equation: {m: m1, b: b1}} = stone1
    let {position: [ x2 ], velocity: [ vx2 ], equation: {m: m2, b: b2}} = stone2

    if (m1 == m2)
        return false // same slope can't cross

    let x = (b2 - b1) / (m1 - m2)
    let y = m1 * x + b1
    
    if (x < low_bound || x > high_bound || y < low_bound || y > high_bound)
        return false // outside target box

    if ( x < x1 && vx1 > 0 || x > x1 && vx1 < 0
      || x < x2 && vx2 > 0 || x > x2 && vx2 < 0 )
        return false

    return true
}

let count = 0
for (let a = 0; a < hail.length - 1; a++) {
    for (let b = a + 1; b < hail.length; b++) {
        if (doesIntersect(hail[a], hail[b])) {
            // console.log(hail[a], '\n', hail[b], '\n\n\n')
            count++
        }
    }
}


console.log('part 1: ', count)