import { withInputLines } from "../utilities/with-input.js"
import { toInt } from "../utilities/parsers.js"

let hail = withInputLines()
    .map( line => line.split(/, | @ /))
    .map( numbers => numbers.map(toInt) )
    .map(([ px, py, pz, vx, vy, vz ]) => ({
        position: [ px, py, pz ],
        velocity: [ vx, vy, vz ]
    }))

let velocities = { x: [], y: [], z: [] }

