import {withInput} from "../utilities/with-input.js"
import {totalElapsed} from "../utilities/timer.js"

class Computer {
  constructor(program) {
    this.memory = program.map(i=>i)
    this.ptr = 0
    this.halted = false
  }

  run() {
    while (!this.halted) {
      this.step()
    }
  }

  step() {
    switch(this.memory[ this.ptr ]) {
      case 1: return this.add()
      case 2: return this.multiply()
      case 99: return this.stop()
      default: throw `unsupported instruction ${this.memory[this.ptr]}`
    }
  }

  add() {
    let ptr_a = this.memory[ this.ptr + 1 ]
    let ptr_b = this.memory[ this.ptr + 2 ]
    let ptr_r = this.memory[ this.ptr + 3 ]
    let val_a = this.memory[ ptr_a ]
    let val_b = this.memory[ ptr_b ]

    this.memory[ ptr_r ] = val_a + val_b
    this.ptr += 4
  }

  multiply() {
    let ptr_a = this.memory[ this.ptr + 1 ]
    let ptr_b = this.memory[ this.ptr + 2 ]
    let ptr_r = this.memory[ this.ptr + 3 ]
    let val_a = this.memory[ ptr_a ]
    let val_b = this.memory[ ptr_b ]

    this.memory[ ptr_r ] = val_a * val_b
    this.ptr += 4
  }

  stop() {
    this.halted = true
  }
}

const input = withInput().split(',').map(Number)

let p1Computer = new Computer(input)
p1Computer.memory[1] = 12
p1Computer.memory[2] = 2
p1Computer.run()
console.log('2019 day 02 part 1 -', p1Computer.memory[0]);

(() => {
  const target = 19690720
  for (let noun = 0; noun <= 99; noun++) {
    for (let verb = 0; verb <= 99; verb++) {
      let p2Computer = new Computer(input)
      p2Computer.memory[1] = noun
      p2Computer.memory[2] = verb
      p2Computer.run()
      if (p2Computer.memory[0] === target) {
        console.log('2019 day 02 part 2 -', 100 * noun + verb)
        return
      }
    }
  }
})()

console.log(totalElapsed())
