import { withInputLines } from "../utilities/with-input.js"
import { sum } from "../utilities/reducers.js"

let input = withInputLines("2015/input/08.txt")

console.log("part 1: ", input
    .map( line => line.length - eval(line).length)
    .reduce(sum))

console.log("part 2: ", input
    .map( line => line.split('').filter( ch => ch == '"' || ch == '\\').length + 2 )
    .reduce(sum))
