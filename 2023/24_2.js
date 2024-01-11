import { withInputLines } from "../utilities/with-input.js"
import { toInt } from "../utilities/parsers.js"
import { vecAdd, vecSub, vecEqual } from "../utilities/vectors.js"

const MIN = 200000000000000, MAX = 400000000000000
const A = 0, B = 1
const X = 0, Y = 1, Z = 2
const P = 0, V = 1

let hail = withInputLines()
    .map( line => line.split(/, | @ /))
    .map( numbers => numbers.map(toInt) )
    .map(([ px, py, pz, vx, vy, vz ]) => ({
        position: [ px, py, pz ],
        velocity: [ vx, vy, vz ]
    }))


const convertToStandardForm = ({ position: p1, velocity: v1 }) => {
    // convert from:
    //   position = [ px, py, pz ]
    //   velocity = [ vx, vy, vz ]
    // to:
    //   [ x = px + vx * t ] -> [ px, vx ]
    //   [ y = py + vy * t ] -> [ py, vy ]
    //   [ z = pz + vz * t ] -> [ pz, vz ]
    let eq = []
    eq[X] = [ p1[X], v1[X] ]   // x = eq1[X][P] + eq1[X][V] * t1
    eq[Y] = [ p1[Y], v1[Y] ]   // y = eq1[Y][P] + eq1[Y][V] * t1
    eq[Z] = [ p1[Z], v1[Z] ]   // z = eq1[Z][P] + eq1[Z][V] * t1
    return eq
}

const solveForTimes = (eq1, eq2) => {
    // system of equations in matrix form:
    //   [ a = eq1[A][P] + eq1[A][V] * t1 ]  [ a = eq2[A][P] + eq2[A][V] * t2 ]
    //   [ b = eq1[B][P] + eq1[B][V] * t1 ]  [ b = eq2[B][P] + eq2[B][V] * t2 ]
    
    // using a to solve for t1
    //   eq1[A][P] + eq1[A][V] * t1 = eq2[A][P] + eq2[A][V] * t2
    //               eq1[A][V] * t1 = eq2[A][P] - eq1[A][P] + eq2[A][V] * t2
    //                           t1 = (eq2[A][P] - eq1[A][P]) / eq1[A][V] + eq2[A][V] / eq1[A][V] * t2
    
    // using b to solve for t1
    //   eq1[B][P] + eq1[B][V] * t1 = eq2[B][P] + eq2[B][V] * t2
    //               eq1[B][V] * t1 = eq2[B][P] - eq1[B][P] + eq2[B][V] * t2
    //                           t1 = (eq2[B][P] - eq1[B][P]) / eq1[B][V] + eq2[B][V] / eq1[B][V] * t2

    // if (eq1[A][V] == 0 || eq1[B][V] == 0) {
    //     // if either velocity value is zero kick it out, it should be solved
    //     return null
    // }

    // capture the constants and slopes as variables
    //   t1 = c1 + m1 * t2
    //   t1 = c2 + m2 * t2
    let c1 = (eq2[A][P] - eq1[A][P]) / eq1[A][V]
    let c2 = (eq2[B][P] - eq1[B][P]) / eq1[B][V]
    let m1 = eq2[A][V] / eq1[A][V]
    let m2 = eq2[B][V] / eq1[B][V]

    if (m1 == m2) { // if the slopes here are the same it's unsolvable
        // console.log('matched slope')
        return [null, null]
    }

    // sub t1s and solve for t2
    //      c1 + m1 * t2 = c2 + m2 * t2
    //           m1 * t2 = c2 - c1 + m2 * t2
    // m1 * t2 - m2 * t2 = c2 - c1
    //    t2 * (m1 - m2) = c2 - c1
    let               t2 = (c2 - c1) / (m1 - m2)

    // plug t2 value back in to get t1
    let t1 = c1 + m1 * t2

    return [ t1, t2 ]
}

const solveSystemOfEquations = (eq1, eq2) => {
    let t1 = null, t2 = null

    // look for a rotation that makes either equation valid for the solver
    if (t1 == null && eq1[X][V] != 0 && eq1[Y][V] != 0) {
        ([ t1, t2 ] = solveForTimes([eq1[X], eq1[Y]], [eq2[X], eq2[Y]]))
    }
    if (t1 == null && eq2[X][V] != 0 && eq2[Y][V] != 0) {
        ([ t2, t1 ] = solveForTimes([eq2[X], eq2[Y]], [eq1[X], eq1[Y]]))
    }
    if (t1 == null && eq1[X][V] != 0 && eq1[Z][V] != 0) {
        ([ t1, t2 ] = solveForTimes([eq1[X], eq1[Z]], [eq2[X], eq2[Z]]))
    }
    if (t1 == null && eq2[X][V] != 0 && eq2[Z][V] != 0) {
        ([ t2, t1 ] = solveForTimes([eq2[X], eq2[Z]], [eq1[X], eq1[Z]]))
    }
    if (t1 == null && eq1[Y][V] != 0 && eq1[Z][V] != 0) {
        ([ t1, t2 ] = solveForTimes([eq1[Y], eq1[Z]], [eq2[Y], eq2[Z]]))
    }
    if (t1 == null && eq2[Y][V] != 0 && eq2[Z][V] != 0) {
        ([ t2, t1 ] = solveForTimes([eq2[Y], eq2[Z]], [eq1[Y], eq1[Z]]))
    }


    if (t1 == null || t2 == null) {
        // console.log('no ts')
        return null
    } else {
        // console.log('t1', t1, 't2', t2)
    }

    let x1 = Math.round(10000 * (eq1[X][P] + eq1[X][V] * t1)) / 10000
    let y1 = Math.round(10000 * (eq1[Y][P] + eq1[Y][V] * t1)) / 10000
    let z1 = Math.round(10000 * (eq1[Z][P] + eq1[Z][V] * t1)) / 10000

    let x2 = Math.round(10000 * (eq2[X][P] + eq2[X][V] * t2)) / 10000
    let y2 = Math.round(10000 * (eq2[Y][P] + eq2[Y][V] * t2)) / 10000
    let z2 = Math.round(10000 * (eq2[Z][P] + eq2[Z][V] * t2)) / 10000

    // console.log(x1, x2)
    // console.log(y1, y2)
    // console.log(z1, z2)

    if (x1 != x2 || y1 != y2 || z1 != z2) {
        // console.log('value check no match')
        return null
    }

    return [ x1, y1, z1 ]
}


const shiftReferenceFrame = (points, frame) =>
    points.map(({position, velocity}) => convertToStandardForm({ position, velocity: vecSub(velocity, frame) }))


const checkForSharedCollision = (points) => {
    let sharedCollision;
    for (let i = 0; i < points.length - 1; i++) {
        // console.log(points[i])
        for (let ii = i + 1; ii < points.length; ii++) {
            // console.log('   ', points[ii])
            let collision = solveSystemOfEquations(points[i], points[ii])
            if (!collision) {
                // console.log('      - no collision')
                return null
            } else {
                // console.log('      - collision at', collision)
            }

            if (!sharedCollision) {    
                sharedCollision = collision
            } else if (!vecEqual(sharedCollision, collision)) {
                // console.log('      - collision doesnt match', collision, sharedCollision)
                return null
            }
        }
    }
    return sharedCollision
}

// let p1 = { position: [ 12, 31, 28 ], velocity: [ 2, -3, -3 ] }
// let p2 = { position: [ 20, 19, 15 ], velocity: [ 4, -6, -5 ] }
// console.log(solveSystemOfEquations(convertToStandardForm(p1), convertToStandardForm(p2)))

// console.log(checkForSharedCollision(shiftReferenceFrame(hail, [ 0, 0, 0 ])))
// console.log(checkForSharedCollision(shiftReferenceFrame(hail, [-3, 1, 2 ])))


function searchBoxForAnswer(outer, inner) {
    let search = outer

    for (let x = -search; x <= search; x++) {
        for (let y = -search; y <= search; y++) {
            for (let z = -search; z <= search; z++) {
                if (x >= -inner && x <= inner && y >= -inner && y <= inner && z >= -inner && z <= inner) {
                    continue
                }

                let point = checkForSharedCollision(shiftReferenceFrame(hail, [ x, y, z ]))
                if (point) {
                    console.log('move to', point, 'and throw at ', [x, y, z])
                    return true
                }
            }
        }
    }
    return false
}

let outer = 200
let inner = 140
let step = 50
while (!searchBoxForAnswer(outer, inner)) {
    console.log('none found within', outer, 'expanding')
    inner = outer
    outer += step
}


// let x1 = [ 19,  1 ]
// let y1 = [ 13,  0 ]
// let z1 = [ 30, -4 ]

// let x2 = [ 18,  2 ]
// let y2 = [ 19, -2 ]
// let z2 = [ 22, -4 ]

// // console.log(solveForTimes(eq2, eq1))
// console.log('y', solveSystemOfEquations([ x1, y1, z1 ], [ x2, y2, z2 ]))
// console.log('x', solveSystemOfEquations([ y1, x1, z1 ], [ y2, x2, z2 ]))
// console.log('z', solveSystemOfEquations([ x1, z1, y1 ], [ x2, z2, y2 ]))
// console.log('x', solveSystemOfEquations([ y1, z1, x1 ], [ y2, z2, x2 ]))
// console.log('z', solveSystemOfEquations([ z1, x1, y1 ], [ z2, x2, y2 ]))
// console.log('y', solveSystemOfEquations([ z1, y1, x1 ], [ z2, y2, x2 ]))

// console.log(solveSystemOfEquations([x1, y1, z1], [x2, y2, z2]))
