import { withInputLines } from "../utilities/with-input.js"
import { elapsed } from '../utilities/timer.js'

let medicine = "CRnSiRnCaPTiMgYCaPTiRnFArSiThFArCaSiThSiThPBCaCaSiRnSiRnTiTiMgArPBCaPMgYPTiRnFArFArCaSiRnBPMgArPRnCaPTiRnFArCaSiThCaCaFArPBCaCaPTiTiRnFArCaSiRnSiAlYSiThRnFArArCaSiRnBFArCaCaSiRnSiThCaCaCaFYCaPTiBCaSiThCaSiThPMgArSiRnCaPBFYCaCaFArCaCaCaCaSiThCaSiRnPRnFArPBSiThPRnFArSiRnMgArCaFYFArCaSiRnSiAlArTiTiTiTiTiTiTiRnPMgArPTiTiTiBSiRnSiAlArTiTiRnPMgArCaFYBPBPTiRnSiRnMgArSiThCaFArCaSiThFArPRnFArCaSiRnTiBSiThSiRnSiAlYCaFArPRnFArSiThCaFArCaCaSiThCaCaCaSiRnPRnCaFArFYPMgArCaPBCaPBSiRnFYPBCaFArCaSiAl"
let rules = withInputLines().map(line => line.split(' => '))

const possibleReplacements = molecule => {
    let uniques = new Set()

    rules.forEach(([ pattern, replacement ]) => {
        let checker = pattern.length == 2
            ? i => pattern[0] == molecule[i] && pattern[1] == molecule[i+1]
            : i => pattern[0] == molecule[i]

        for (let i = 0; i < molecule.length; i++) {
            if (checker(i)) {
                uniques.add(molecule.slice(0, i) + replacement + molecule.slice(i + pattern.length))
            }
        }
    })

    return uniques
}

const possibleReductions = molecule => {
    let uniques = new Set()

    rules.forEach(([ pattern, replacement ]) => {
        let checker = i => {
            for (let _i = 0; _i < replacement.length; _i++) {
                if (molecule[i + _i] != replacement[_i])
                    return false
            }
            return true
        }

        for (let i = 0; i <= molecule.length - replacement.length; i++) {
            if (checker(i)) {
                uniques.add(molecule.slice(0, i) + pattern + molecule.slice(i + replacement.length))
            }
        }
    })

    return uniques
}

console.log('part 1: ', possibleReplacements(medicine).size)

const stepsToMake = molecule => {
    let seen = new Set([ molecule ])
    let queue = [ [ molecule, 0 ] ]
    let biggestStep = 0

    while (queue.length > 0) {
        let [ base, steps ] = queue.shift()

        let allPossibleNext = possibleReductions(base)
        // console.log(base, '->', allPossibleNext)
        for (let mol of allPossibleNext) {
            if (mol == 'e') {
                return steps + 1
            }
            if (!seen.has(mol)) {
                seen.add(mol)
                queue.push([ mol, steps + 1 ])
                if (steps + 1 > biggestStep) {
                    console.log('step: ', steps + 1, '\tqueue: ', queue.length, elapsed())
                    biggestStep = steps + 1
                }
            }
        }
        // console.log(queue,'\n')
    }
    return null
}

// console.log(possibleReductions('HH'))
console.log('part 2: ', stepsToMake(medicine))

// const stepsToMake = molecule => {
//     let seen = new Set()
//     let queue = [ ['e', 0] ]
    
//     while (queue.length > 0) {
//         let [ base, steps ] = queue.shift()

//         let allPossibleNext = possibleReplacements(base)
        

//     }

//     return null
// }

// console.log('part 2: ', stepsToMake(medicine))
