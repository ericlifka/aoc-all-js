import {withInput} from "../utilities/with-input.js"
import {sum} from "../utilities/reducers.js"
import {totalElapsed} from "../utilities/timer.js"

const input = withInput().split('').map(Number)
const size = input.reduce(sum)
const p1_memory = Array(size).fill(null)
let p1_ptr = 0
let p1_block_id = 0

const checksum = memory => memory.map((v, i) => v !== null ? v * i : 0).reduce(sum)

for (let i in input) {
  let block = input[ i ]
  if (i % 2 === 0) {
    for (let m = 0; m < block; m++) {
      p1_memory[p1_ptr++] = p1_block_id
    }
    p1_block_id++
  } else {
    p1_ptr += block
  }
}

let f_ptr = 0
let b_ptr = p1_memory.length - 1

while (f_ptr < b_ptr) {
  if (p1_memory[ f_ptr ] !== null) {
    f_ptr++
  } else if (p1_memory[ b_ptr ] === null) {
    b_ptr--
  } else {
    p1_memory[ f_ptr ] = p1_memory[ b_ptr ]
    p1_memory[ b_ptr ] = null
  }
}

console.log('2024 day 09 part 1 -', checksum(p1_memory))

const p2_memory = Array(size).fill(null)
let p2_ptr = 0
let p2_block_id = 0
const gaps = []
const blocks = []

for (let i in input) {
  let block = input[ i ]
  if (i % 2 === 0) {
    blocks.push({
      id: p2_block_id,
      start: p2_ptr,
      size: block
    })
    for (let m = 0; m < block; m++) {
      p2_memory[p2_ptr++] = p2_block_id
    }
    p2_block_id++
  } else {
    gaps.push({
      start: p2_ptr,
      size: block
    })
    p2_ptr += block
  }
}

while (blocks.length > 0) {
  let rightmost = blocks.pop()
  for (let i = 0; i < gaps.length; i++) {
    let gap = gaps[ i ]
    if (gap.start > rightmost.start) { // don't move memory block backwards
      break
    }
    if (gap.size >= rightmost.size) { // found gap big enough
      // move block
      for (let i = 0; i < rightmost.size; i++) {
        p2_memory[ gap.start + i ] = rightmost.id
        p2_memory[ rightmost.start + i ] = null
      }

      // check for remaining space and update gap
      if (gap.size > rightmost.size) {
        gap.start += rightmost.size
        gap.size -= rightmost.size
      } else {
        gaps.splice(i, 1)
      }
      break
    }
  }
}

console.log('2024 day 09 part 2 -', checksum(p2_memory))
console.log(totalElapsed())
