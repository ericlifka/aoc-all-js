import { withInputGrid } from "../utilities/with-input.js"
import { map2d } from "../utilities/vectors.js"
import { sum } from "../utilities/reducers.js"
import { elapsed } from "../utilities/timer.js"

const batteryBanks = map2d(withInputGrid(), Number)

const findMax = (arr, begin, end) => {
  let highest = begin
  for (let i = begin; i < end; i++) {
    if (arr[i] == 9) {
      return i
    }
    else if (arr[i] > arr[highest]) {
      highest = i
    }
  }
  return highest
}

const joltage = batteryBanks
  .map(bank => {
    let first = findMax(bank, 0, bank.length - 1)
    let second = findMax(bank, first + 1, bank.length)
    return Number("" + bank[first] + bank[second])
  })
  .reduce(sum)

console.log('part1 -', joltage, elapsed())

const bigJoltage = batteryBanks
  .map(bank => {
    let first    = findMax(bank, 0,            bank.length - 11)
    let second   = findMax(bank, first + 1,    bank.length - 10)
    let third    = findMax(bank, second + 1,   bank.length -  9)
    let fourth   = findMax(bank, third + 1,    bank.length -  8)
    let fifth    = findMax(bank, fourth + 1,   bank.length -  7)
    let sixth    = findMax(bank, fifth + 1,    bank.length -  6)
    let seventh  = findMax(bank, sixth + 1,    bank.length -  5)
    let eighth   = findMax(bank, seventh + 1,  bank.length -  4)
    let ninth    = findMax(bank, eighth + 1,   bank.length -  3)
    let tenth    = findMax(bank, ninth + 1,    bank.length -  2)
    let eleventh = findMax(bank, tenth + 1,    bank.length -  1)
    let twelfth  = findMax(bank, eleventh + 1, bank.length -  0)

    return Number([ 
      bank[ first    ],
      bank[ second   ],
      bank[ third    ],
      bank[ fourth   ],
      bank[ fifth    ],
      bank[ sixth    ],
      bank[ seventh  ],
      bank[ eighth   ],
      bank[ ninth    ],
      bank[ tenth    ],
      bank[ eleventh ],
      bank[ twelfth  ],
    ].join(''))
  })
  .reduce(sum)

console.log('part2 -', bigJoltage, elapsed())
