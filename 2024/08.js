import {withInputGrid} from "../utilities/with-input.js"
import {totalElapsed} from "../utilities/timer.js"

const input = withInputGrid()
const height = input.length
const width = input[0].length

const withinBounds = ({x, y}) => x >= 0 && y >= 0 && x < width && y < height
const encode = ({x, y}) => `<${x},${y}>`

let towerLocations = input.flatMap((row, y) => row.map((tower, x) => tower !== '.' && {tower, x, y})).filter(Boolean)
let towers = [...new Set(towerLocations.map(({tower}) => tower))]

let p1Annodes = new Set()
let p2Annodes = new Set()

towers.forEach( tower => {
    let locations = towerLocations.filter(tl => tl.tower === tower)
    for (let i = 0; i < locations.length - 1; i++) {
        for (let j = i + 1; j < locations.length; j++) {
            let t1 = locations[i]
            let t2 = locations[j]
            let dx = t1.x - t2.x
            let dy = t1.y - t2.y

            let p1 = {...t1}, c1 = 0
            while (withinBounds(p1)) {
                if (c1 === 1) p1Annodes.add(encode(p1))
                p2Annodes.add(encode(p1))
                
                p1.x += dx
                p1.y += dy
                c1++
            }

            let p2 = {...t2}, c2 = 0
            while (withinBounds(p2)) {
                if (c2 === 1) p1Annodes.add(encode(p2))
                p2Annodes.add(encode(p2))
                
                p2.x -= dx
                p2.y -= dy
                c2++
            }
        }
    }
})

console.log('2024 day 08 part 1 -', p1Annodes.size)
console.log('2024 day 08 part 2 -', p2Annodes.size)
console.log(totalElapsed())
