import { withInputSegments } from "../utilities/with-input.js"
import { sum } from "../utilities/reducers.js"
import { elapsed } from "../utilities/timer.js"

const ranges = withInputSegments(',')
  .map( range => range.split('-').map(Number) )

function checkRanges(isInvalidId) {
  function checkRange([start, end]) {
    let invalid = []
    for (let id = start; id <= end; id++) {
      if (isInvalidId(String(id))) {
        invalid.push(id)
      }
    }
    return invalid
  }

  return ranges.flatMap(checkRange).reduce(sum)
}

const part1IdCheck = idStr => 
  idStr.slice(0, idStr.length / 2) == idStr.slice(idStr.length / 2)

const part2IdCheck = idStr => {
  for (let i = 1; i <= idStr.length / 2; i++) {
    let substr = idStr.slice(0, i)
    if ( idStr.length % substr.length == 0 &&
         substr.repeat(idStr.length / substr.length) == idStr ) {
      return true
    }
  }
  return false
}

console.log(checkRanges(part1IdCheck), elapsed())
console.log(checkRanges(part2IdCheck), elapsed())