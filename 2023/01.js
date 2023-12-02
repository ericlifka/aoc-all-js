import { withInputLines } from "../utilities/with-input-lines.js"
import { sum } from "../utilities/reducers.js"


const getSimpleDigit = (line, pos) =>
 ( line[pos] >= '0' && line[pos] <= '9' ? line[pos]
 : -1 )

const getFancyDigit = (line, pos) => 
 ( line[pos] >= '0' && line[pos] <= '9' ? line[pos]
 : line.slice(pos, pos+3) == "one" ? "1"
 : line.slice(pos, pos+3) == "two" ? "2"
 : line.slice(pos, pos+5) == "three" ? "3"
 : line.slice(pos, pos+4) == "four" ? "4"
 : line.slice(pos, pos+4) == "five" ? "5"
 : line.slice(pos, pos+3) == "six" ? "6"
 : line.slice(pos, pos+5) == "seven" ? "7"
 : line.slice(pos, pos+5) == "eight" ? "8"
 : line.slice(pos, pos+4) == "nine" ? "9"
 : -1 )

const findFirstDigit = (line, getDigit) => {
    for (let i = 0; i < line.length; i++) {
        let digit = getDigit(line, i)
        if (digit !== -1)
            return digit
    }
}
const findLastDigit = (line, getDigit) => {
    for (let i = line.length - 1; i >= 0; i--) {
        let digit = getDigit(line, i)
        if (digit !== -1)
            return digit
    }
}

const getCoordForLine = getDigit => line =>
    parseInt(findFirstDigit(line, getDigit) + findLastDigit(line, getDigit), 10)


let input = withInputLines("2023/input/01.txt")

console.log("part 1: ", input.map(getCoordForLine(getSimpleDigit)).reduce(sum, 0))
console.log("part 2: ", input.map(getCoordForLine(getFancyDigit)).reduce(sum, 0))
