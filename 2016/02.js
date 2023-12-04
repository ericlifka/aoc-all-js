import { withInputLines } from "../utilities/with-input.js"
import { vecAdd } from "../utilities/vectors.js"

let inputInstructions = withInputLines("2016/input/02.txt")
let directions = {
    U: [ 0, -1],
    D: [ 0,  1],
    L: [-1,  0],
    R: [ 1,  0] }
let A = 'A', B = 'B', C = 'C', D = 'D'

const runInstructions = (buttonPanel, start) => {
    let code = ""
    let position = start
    const getButton = (at = position) => buttonPanel[at[1]][at[0]]

    inputInstructions.forEach( row => {
        for (let instr of row) {
            let target = vecAdd(position, directions[instr])
            if (getButton(target) != 0) {
                position = target
            }
        }
        code += getButton()
    })

    return code
}

console.log("part 1: ", runInstructions(
    [ [ 0, 0, 0, 0, 0 ],
      [ 0, 1, 2, 3, 0 ],
      [ 0, 4, 5, 6, 0 ],
      [ 0, 7, 8, 9, 0 ],
      [ 0, 0, 0, 0, 0 ], ], 
    [ 2, 2 ]))

console.log("part 2: ", runInstructions(
    [ [ 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 1, 0, 0, 0 ],
      [ 0, 0, 2, 3, 4, 0, 0 ],
      [ 0, 5, 6, 7, 8, 9, 0 ],
      [ 0, 0, A, B, C, 0, 0 ],
      [ 0, 0, 0, D, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0 ], ], 
    [ 1, 3 ]))
    