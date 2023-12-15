import { withInputLines } from "../utilities/with-input.js"
import { toInt } from "../utilities/parsers.js"
import { ascending, descending } from "../utilities/sort.js"
import { sum } from "../utilities/reducers.js"

let containers = withInputLines().map(toInt).sort(descending)

const waysToFill = (volume, containers) => {
    let capacity = containers.reduce(sum, 0)
    let permutations = []

    if (volume > 0 && capacity >= volume) {
        if (capacity == volume) {
            permutations.push([...containers])
        } else {
            containers.forEach((container, i) => {
                if (container == volume) {
                    permutations.push([ container ])
                }
                else if (container < volume) {
                    let remaining = containers.slice(i+1)
                    waysToFill(volume - container, remaining).forEach( sequence => {
                        permutations.push([container, ...sequence])
                    })
                }
            })
        }
    }
    
    return permutations
}


let permutations = waysToFill(150, containers)
console.log('part 1: ', permutations.length)
console.log('part 2: ', permutations.map(set => set.length).sort(ascending).reduce((count, item, _, list) => item == list[0] ? count + 1 : count, 0))
