import { withInputLines } from "../utilities/with-input.js"
import { multiply } from "../utilities/reducers.js"
import { elapsed } from "../utilities/timer.js"

const boxes = withInputLines()
  .map( line => line.split(',').map(Number) )
  .map(([x, y, z]) => ({ x, y , z }))

const circuits = boxes.map((_, i) => new Set([ i ]))
const pairs = []

for (let indexA = 0; indexA < boxes.length - 1; indexA++) {
  let boxA = boxes[indexA]
  for (let indexB = indexA + 1; indexB < boxes.length; indexB++) {
    let boxB = boxes[indexB]

    pairs.push({
      a: indexA,
      b: indexB,
      distance: Math.sqrt(
        Math.pow(boxA.x - boxB.x, 2) + 
        Math.pow(boxA.y - boxB.y, 2) + 
        Math.pow(boxA.z - boxB.z, 2) )
    })
  }
}

pairs.sort((l, r) => l.distance - r.distance)

let connection = -1
while (circuits.length > 1) {
  connection++

  if (connection == 1000) {
    let part1 = [...circuits]
      .sort((l, r) => r.size - l.size)
      .slice(0, 3)
      .map(circuit => circuit.size)
      .reduce(multiply)

    console.log('part 1 -', part1, elapsed())
  }

  let { a, b } = pairs[connection]
  
  let circuitA = circuits.findIndex( circuit => circuit.has(a) )
  let circuitB = circuits.findIndex( circuit => circuit.has(b) )
  
  if (circuitA != circuitB) {
    for (let box of circuits[circuitB]) {
      circuits[circuitB].delete(box)
      circuits[circuitA].add(box)
    }

    circuits.splice(circuitB, 1)
  }
}

let lastMade = pairs[connection]
let part2 = boxes[lastMade.a].x * boxes[lastMade.b].x

console.log('part 2 -', part2, elapsed())
