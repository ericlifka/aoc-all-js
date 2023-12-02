import { withInputLines } from "../utilities/with-input-lines.js"
import { sum } from "../utilities/reducers.js"


const getSimpleDigit = (line, pos) => line[pos] >= '0' && line[pos] <= '9' ? line[pos] : -1

const getFancyDigit = (line, pos) => {
    if (line[pos] >= '0' && line[pos] <= '9') return line[pos]
    else if (line[pos] == 'o' && line.slice(pos, pos+3) == "one") return "1"
    else if (line[pos] == 't' && line.slice(pos, pos+3) == "two") return "2"
    else if (line[pos] == 't' && line.slice(pos, pos+5) == "three") return "3"
    else if (line[pos] == 'f' && line.slice(pos, pos+4) == "four") return "4"
    else if (line[pos] == 'f' && line.slice(pos, pos+4) == "five") return "5"
    else if (line[pos] == 's' && line.slice(pos, pos+3) == "six") return "6"
    else if (line[pos] == 's' && line.slice(pos, pos+5) == "seven") return "7"
    else if (line[pos] == 'e' && line.slice(pos, pos+5) == "eight") return "8"
    else if (line[pos] == 'n' && line.slice(pos, pos+4) == "nine") return "9"
    else return -1
}

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
