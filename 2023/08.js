import { withInputSegments } from "../utilities/with-input.js"
import { leastCommonMultiple } from "../utilities/math.js"

let [ dirStr, nodes ] = withInputSegments('\n\n')
let directions = dirStr.split('').map(d => ({L: 0, R: 1})[d])
let network = nodes.split('\n').reduce((nodes, line) => ({ ...nodes, [line.split(' = ')[0]]: line.split(' = ')[1].match(/\((\w+), (\w+)\)/).slice(1, 3) }), {})
let starts = Object.keys(network).filter(n => n[2] == 'A')

const cycleDistance = position => {
    let steps = 0
    while (position[2] != 'Z') {
        position = network[position][directions[(steps++) % directions.length]]
    }
    return steps
}

console.log('part 1: ', cycleDistance('AAA'))
console.log('part 2: ', starts.map(cycleDistance).reduce(leastCommonMultiple))
