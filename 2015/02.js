import { withInputLines } from "../utilities/with-input-lines.js"
import { toInt } from "../utilities/parsers.js"
import { ascending } from "../utilities/sort.js"
import { sum } from "../utilities/reducers.js"


let boxes = withInputLines("2015/input/02.txt")
    .map( line => line.split('x').map(toInt).sort(ascending))

console.log("part 1: ", boxes.map(([a, b, c]) => 3*a*b + 2*b*c + 2*a*c).reduce(sum))
console.log("part 2: ", boxes.map(([a, b, c]) => 2*a + 2*b + a*b*c).reduce(sum))
