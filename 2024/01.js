import {withInputGrid} from '../utilities/with-input.js'
import {ascending} from "../utilities/sort.js";
import {unzip, zip} from "../utilities/lists.js";
import {sum} from "../utilities/reducers.js";
import {totalElapsed} from "../utilities/timer.js"

const [left, right] = unzip(withInputGrid(/\s+/))
const distance = zip(
  left.map(Number).sort(ascending),
  right.map(Number).sort(ascending)
)
  .map(([l, r]) => Math.abs(l - r))
  .reduce(sum)

console.log('2024 day 01 part 1 -', distance)

const frequencies = right.reduce((bucket, n) => (bucket[n] = (bucket[n] || 0) + 1, bucket), {})
const similarity = left.map( n => (frequencies[n] || 0) * Number(n)).reduce(sum)

console.log('2024 day 01 part 2 -', similarity)
console.log(totalElapsed())
