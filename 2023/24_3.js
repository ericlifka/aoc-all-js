import { withInputLines } from "../utilities/with-input.js"
import { toInt } from "../utilities/parsers.js"
import { Matrix, inverse } from 'ml-matrix'

const X = 0, Y = 1, Z = 2

const crossProduct = (a, b) => {
    let c = []
    c[X] = a.get(0, Y)*b.get(0, Z) - a.get(0, Z)*b.get(0, Y)
    c[Y] = a.get(0, Z)*b.get(0, X) - a.get(0, X)*b.get(0, Z)
    c[Z] = a.get(0, X)*b.get(0, Y) - a.get(0, Y)*b.get(0, X)
    return new Matrix([ c ])
}

const stackVectors = (a, b, c) => new Matrix([
    [ a.get(0, X), a.get(0, Y), a.get(0, Z) ],
    [ b.get(0, X), b.get(0, Y), b.get(0, Z) ],
    [ c.get(0, X), c.get(0, Y), c.get(0, Z) ]
])

const dotProduct = (a, b) =>
    a[X]*b[X] + a[Y]*b[Y] + a[Z]*b[Z]


let hail = withInputLines()
    .map( line => line.split(/, | @ /))
    .map( numbers => numbers.map(toInt) )
    .map(([ px, py, pz, vx, vy, vz ]) => ({
        p: new Matrix([ [ px, py, pz ] ]),
        v: new Matrix([ [ vx, vy, vz ] ])
    }))

let [ h1, h2, h3 ] = hail

// equation C P = D
let C = stackVectors(
    crossProduct(Matrix.sub(h1.v, h2.v), Matrix.sub(h1.p, h2.p)),
    crossProduct(Matrix.sub(h1.v, h3.v), Matrix.sub(h1.p, h3.p)),
    crossProduct(Matrix.sub(h2.v, h3.v), Matrix.sub(h2.p, h3.p))
)

let D = new Matrix([
    [ Matrix.sub(h1.v, h2.v).mmul( crossProduct(h1.p, h2.p).transpose() ).get(0, 0) ],
    [ Matrix.sub(h1.v, h3.v).mmul( crossProduct(h1.p, h3.p).transpose() ).get(0, 0) ],
    [ Matrix.sub(h2.v, h3.v).mmul( crossProduct(h2.p, h3.p).transpose() ).get(0, 0) ],
])

// solve for P
let C_inv = inverse(C)
let solution = C_inv.mmul(D)

let px = Math.round(solution.get(0, 0))
let py = Math.round(solution.get(1, 0))
let pz = Math.round(solution.get(2, 0))

console.log('part 2', px + py + pz)
