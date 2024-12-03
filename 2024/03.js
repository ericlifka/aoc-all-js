import {withInput} from "../utilities/with-input.js"
import {sum} from "../utilities/reducers.js";

console.log('2024 day 03 part 1 -',
  [...withInput().matchAll(/mul\((\d{1,3}),(\d{1,3})\)/g)]
    .map(([_, left, right]) => Number(left) * Number(right))
    .reduce(sum))

let on = true, total = 0;
for (let instr of withInput().matchAll(/do\(\)|don't\(\)|mul\((\d{1,3}),(\d{1,3})\)/g)) {
  if (instr[0] === "don't()")   on = false
  else if (instr[0] === "do()") on = true
  else if (on)                  total += Number(instr[1]) * Number(instr[2])
}
console.log('2024 day 03 part 2 -', total)
