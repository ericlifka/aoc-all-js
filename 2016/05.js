import md5 from "md5"
import { withInput } from "../utilities/with-input.js"
import { elapsed } from "../utilities/timer.js"

let door = withInput("2016/input/05.txt")

const p1 = () => {
    let passkey = ''
    let index = 0
    while (passkey.length < 8) {
        let hash = md5(`${door}${index++}`)
        if (hash.slice(0, 5) == "00000") {
            passkey += hash[5]
            console.log('locked in: ', passkey)
        }
    }
    return passkey
}

const p2 = () => {
    let passkey = '........'.split('')
    let index = 0
    let count = 0
    while (true) {
        let hash = md5(`${door}${index++}`)
        if (hash.slice(0, 5) == "00000") {
            let position = parseInt(hash[5], 16)
            let value = hash[6]
            if (position < 8 && passkey[position] == '.') {
                passkey[position] = value
                count++
                console.log('locked in: ', passkey.join(''))
                if (count == 8) {
                    break
                }
            }
        }
    }
    return passkey.join('')
}

console.log('part 1: ', p1(), elapsed())
console.log('part 2: ', p2(), elapsed())
