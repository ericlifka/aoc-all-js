import { withInput, withInputLines } from '../utilities/with-input.js'
import { multiply } from '../utilities/reducers.js'
import { ascending } from '../utilities/sort.js'
import { toInt } from '../utilities/parsers.js'


let outputs = [ ...withInput().matchAll(/(output \d+)/g) ]
    .map( match => match[1] )
    .reduce((outputs, name) => ({...outputs, [name]: []}), {})

let inputs = withInputLines()
    .map( line => /value (\d+) goes to (\w+ \d+)/.exec(line) )
    .filter( line => !!line )
    .map(([_, value, target]) => ({ target, value: toInt(value) }))

let rules = withInputLines()
    .map( line => /(\w+ \d+) gives low to (\w+ \d+) and high to (\w+ \d+)/.exec(line) )
    .filter( line => !!line )
    .reduce((rules, [_, source, lowTo, highTo]) => ({...rules, [source]: { lowTo, highTo }}), {})

let bots = Object.keys(rules).reduce((bots, source) => ({...bots, [source]: []}), {})

const applyInputs = () =>
    inputs.forEach(({ target, value }) =>
        bots[target].push(value))

const readyToProcess = () =>
    Object.keys(bots).filter( bot => bots[bot].length >= 2 )


applyInputs()
let readyList = null
while ((readyList = readyToProcess()).length > 0) {
    readyList.forEach( bot => {
        let [ lower, higher ] = [ bots[bot].pop(), bots[bot].pop() ].sort(ascending);
        let { lowTo, highTo } = rules[bot];

        if (lower == 17 && higher == 61) {
            console.log('part 1: ', bot)
        }
        (bots[lowTo] || outputs[lowTo]).push(lower);
        (bots[highTo] || outputs[highTo]).push(higher);
    })
}

console.log('part 2: ',
    ['output 0', 'output 1', 'output 2']
        .map(output => outputs[output][0])
        .reduce(multiply))
