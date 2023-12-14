import { withInputLines } from "../utilities/with-input.js"
import { toInt } from "../utilities/parsers.js"

const readout = {
    children: 3,
    cats: 7,
    samoyeds: 2,
    pomeranians: 3,
    akitas: 0,
    vizslas: 0,
    goldfish: 5,
    trees: 3,
    cars: 2,
    perfumes: 1,
}

const theSues = withInputLines()
    .map( line => line.split(' '))
    .map(([_, id, thing1, val1, thing2, val2, thing3, val3]) => ({ 
        id: toInt(id), 
        props: [
            [ thing1.slice(0, -1), toInt(val1) ],
            [ thing2.slice(0, -1), toInt(val2) ],
            [ thing3.slice(0, -1), toInt(val3) ] ]}))


theSues.forEach(({id, props}) => {
    if (props.every(([prop, value]) => readout[prop] == value))
        console.log('Part 1: ', id)
})

theSues.forEach(({id, props}) => {
    if (props.every(([prop, value]) => {
        switch (prop) {
            case 'cats': case 'trees':           return readout[prop] < value
            case 'pomeranians': case 'goldfish': return readout[prop] > value
            default:                             return readout[prop] == value
        }
    })) console.log('Part 2: ', id)
})
