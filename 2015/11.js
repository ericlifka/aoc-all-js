import { withInput } from "../utilities/with-input.js"

let CODES_A = 'a'.charCodeAt(0)
let FORBIDDEN = [ 'i', 'o', 'l' ].map( ch => ch.charCodeAt(0) - CODES_A )

const parsePass = passwordStr => passwordStr.split('').map(l => l.charCodeAt(0) - CODES_A)
const formatPass = passwordArr => passwordArr.map( ch => String.fromCharCode(ch + CODES_A) ).join('')

const overflowCarry = val => val == 26 ? [0, 1] : [val, 0]

const increment = password => {
    let newPass = []
    let carry = 1
    for (let i = password.length - 1; i >= 0; i--) {
        ([newPass[i], carry] = overflowCarry(password[i] + carry))
    }
    // skip forbidden letters
    let foundForbidden = false
    for (let i = 0; i < newPass.length; i++) {
        if (foundForbidden) {
            newPass[i] = 0
        } else if (FORBIDDEN.some( ch => ch == newPass[i] )) {
            newPass[i]++
            foundForbidden = true
        }
    }
    return newPass
}

const runOfThree = password => {
    for (let i = 0; i < password.length - 2; i++) {
        let a = password[i], b = password[i+1], c = password[i+2]
        if (a + 1 == b && b + 1 == c) {
            return true
        }
    }
    return false
}
const twoPair = password => {
    for (let f = 0; f < password.length - 3; f++) {
        if (password[f] == password[f+1]) {
            for (let s = f + 2; s < password.length - 1; s++) {
                if (password[s] == password[s+1]) {
                    return true
                }
            }
            return false
        }
    }
    return false
}
const passesRules = password => runOfThree(password) && twoPair(password)

const findNextPass = password => {
    do {
        password = increment(password)
    } while (!passesRules(password))

    return password
}

let startingPass = parsePass(withInput())
let firstNewPass = findNextPass(startingPass)
let secondNewPass = findNextPass(firstNewPass)

console.log('part 1: ', formatPass(firstNewPass))
console.log('part 2: ', formatPass(secondNewPass))
