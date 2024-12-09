import {withInputLines} from "../utilities/with-input.js"
import {totalElapsed} from "../utilities/timer.js"
import {sum} from "../utilities/reducers.js"

const parseLine = str => {
    let [target, numbers] = str.split(': ')
    return {
        target: Number(target),
        numbers: numbers.split(' ').map(Number)
    }
}

const mathTheThings = ({target, numbers}) => {
    let [first, ...rest] = numbers

    const step = (total, numbers) => {
        if (numbers.length === 0) return total === target
        if (total > target) return false
        
        let [first, ...rest] = numbers
        return step(total * first, rest) || step(total + first, rest) || step(Number(`${total}${first}`), rest)
    }

    return step(first, rest)
}

console.log('2024 day 07 part 1 -', withInputLines().map(parseLine).filter(mathTheThings).map(({target}) => target).reduce(sum))
console.log(totalElapsed())
