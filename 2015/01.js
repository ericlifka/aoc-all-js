import { withInputChars } from "../utilities/with-input.js"

let input = withInputChars("2015/input/01.txt")

console.log("part 1: ", input.reduce((floor, ch) => ch == "(" ? floor + 1 : floor - 1, 0))

let floor = 0
for (let i = 0; i < input.length; i++) {
    floor += input[i] == "(" ? 1 : -1
    if (floor < 0) {
        console.log("part 2: ", i + 1)
        break
    }
}
