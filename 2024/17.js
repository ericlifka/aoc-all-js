import {withInput, withInputSegments} from "../utilities/with-input.js"

let program = withInputSegments(',').map(Number)

const runProgram = input => {
  let A = input
  let B = 0
  let C = 0
  let i_ptr = 0
  let output = []

  const comboOperand = () => {
    let operand = program[i_ptr + 1]
    if (operand >= 0 && operand <= 3) {
      return operand
    }
    if (operand === 4) return A
    if (operand === 5) return B
    if (operand === 6) return C
    if (operand === 7) throw "Combo operand 7 reserved"
  }
  const literalOperand = () => program[i_ptr + 1]

  while (i_ptr < program.length) {
    switch (program[i_ptr]) {
      case 0: { // adv
        let numerator = A
        let denominator = 2 ** comboOperand()
        A = Math.floor(numerator / denominator)
        i_ptr += 2
        break;
      }
      case 1: { // bxl
        let left = B
        let right = literalOperand()
        B = Number(BigInt(left) ^ BigInt(right))
        i_ptr += 2
        break;
      }
      case 2: { // bst
        B = comboOperand() % 8
        i_ptr += 2
        break;
      }
      case 3: { // jnz
        if (A !== 0) {
          i_ptr = literalOperand()
        } else {
          i_ptr += 2
        }
        break;
      }
      case 4: { // bxc
        B = Number(BigInt(B) ^ BigInt(C))
        i_ptr += 2
        break;
      }
      case 5: { // out
        output.push(comboOperand() % 8)
        i_ptr += 2
        break;
      }
      case 6: { // bdv
        let numerator = A
        let denominator = 2 ** comboOperand()
        B = Math.floor(numerator / denominator)
        i_ptr += 2
        break;
      }
      case 7: { // cdv
        let numerator = A
        let denominator = 2 ** comboOperand()
        C = Math.floor(numerator / denominator)
        i_ptr += 2
        break;
      }
    }
  }

  return output.join(',')
}

console.log('2024 day 17 part 1 -', runProgram(60589763))

const target = withInput()

for (let i = 0; ; i++) {
  if (i % 100000 === 0) console.log(i)
  let output = runProgram(i)
  if (output === target) {
    console.log('2024 day 17 part 2 -', i)
    break
  }
}
/*
2,4, - 4 -> B
1,5, - B ^ 5 -> B
7,5, - A / B -> C
1,6, - B ^ 6 -> B
4,1, -
5,5,
0,3,
3,0
 */
