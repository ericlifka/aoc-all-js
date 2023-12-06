import { withInput } from '../utilities/with-input.js'
import { toInt } from '../utilities/parsers.js'
import { elapsed } from '../utilities/timer.js'

const uncompress = input => {
    let output = ""

    for (let i = 0; i < input.length;) {
        if (input[i] != '(') {
            output += input[i++]
        } else {
            i += 1 // move past '('
            let marker = ""
            while (input[i] != ')') {
                marker += input[i++]
            }
            i += 1 // move past ')'
            let [count, repeat] = marker.split('x').map(toInt)
            let substr = input.slice(i, i + count)
            output += substr.repeat(repeat)
            i += count // move past the target section 
        }
    }

    return output
}

const calcUncompressedLength = input => {
    let size = 0
    for (let i = 0; i < input.length;) {
        if (input[i] != '(') {
            size++
            i++
        } else {
            i++
            let marker = ""
            while (input[i] != ')') {
                marker += input[i++]
            }
            i++

            let [count, repeat] = marker.split('x').map(toInt)
            let substr = input.slice(i, i + count)
            i += count
            size += calcUncompressedLength(substr.repeat(repeat))
        }
    }
    return size
}

let file = withInput('2016/input/09.txt')

console.log('part 1: ', uncompress(file).length, elapsed())
console.log('part 2: ', calcUncompressedLength(file), elapsed())
