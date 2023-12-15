import { withInputSegments } from "../utilities/with-input.js"
import { sum } from "../utilities/reducers.js"

const HASH = str => str.split('').reduce((currentValue, char) => (17 * (currentValue + char.charCodeAt(0))) % 256, 0)

let startupSequence = withInputSegments(',')

console.log('part 1: ', startupSequence.map(HASH).reduce(sum))

let boxes = Array.from(new Array(256)).map(() => [])

startupSequence
    .map(segment => segment.match(/(.*)([=-])(\d?)/))
    .forEach(([_, label, action, focalLength]) => {
        let box = HASH(label)

        if (action == '-') {
            boxes[ box ] = boxes[ box ].filter( lens => lens.label != label )
        }
        if (action == '=') {
            let index = boxes[ box ].findIndex( lens => lens.label == label )
            if (index > -1) {
                boxes[ box ][ index ].focalLength = focalLength
            } else {
                boxes[ box ].push({ label, focalLength })
            }
        }
    })

console.log('part 2: ', boxes
    .map((box, boxIndex) => box
        .map((lens, lensIndex) => (boxIndex + 1) * (lensIndex + 1) * lens.focalLength)
        .reduce(sum, 0))
    .reduce(sum, 0))
