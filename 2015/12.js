import { withInput } from "../utilities/with-input.js"
import { toInt } from "../utilities/parsers.js"
import { sum } from "../utilities/reducers.js"

console.log('part 1: ', [...withInput().matchAll(/(-?\d+)/g)].map(([num]) => toInt(num)).reduce(sum))

const tally = entity =>
      typeof entity == "number" ? entity
    : typeof entity == "string" ? 0
    : Array.isArray(entity) ? tallyArray(entity)
    : tallyObject(entity)

const tallyArray = arr => 
    arr.map(tally).reduce(sum)

const shouldIgnore = obj => 
    Object.values(obj).some( v => v == "red" )

const tallyObject = obj =>
    shouldIgnore(obj)
        ? 0
        : Object.values(obj).map(tally).reduce(sum)


console.log('part 2: ', tally(JSON.parse(withInput())))
