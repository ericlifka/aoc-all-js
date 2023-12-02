import { withInputLines } from "../utilities/with-input.js"

const pad = val => val.length >= 16 ? val : pad(`0${val}`)
const convert = dec => pad( (dec >>> 0).toString(2) ).split('')
const unconvert = bin => parseInt(bin.join(''), 2)

const NOT    = (val) => val.map( v => v == '1' ? '0' : '1' )
const OR     = (left, right) => left.map((v, i) => v == '1' || right[i] == '1' ? '1' : '0')
const AND    = (left, right) => left.map((v, i) => v == '1' && right[i] == '1' ? '1' : '0')
const LSHIFT = (val) => val.map((_, i) => val[i + 1] || '0')
const RSHIFT = (val) => val.map((_, i) => val[i - 1] || '0')

let wires = { }
let cache = { }
withInputLines("2015/input/07.txt")
  .map( line => line.split(' -> '))
  .forEach(([instr, wire]) => wires[wire] = instr)

const runStatement = statement => {
  if (cache[statement] != undefined) {
    return cache[statement]
  }

  let result
  if (/^-?\d+$/.test(statement)) { // 123 -> w
    result = convert(statement)
  }
  else if (/^[a-z]+$/.test(statement)) { // ow -> w
    result = runStatement(wires[statement])
  }
  else if (/^NOT /.test(statement)) { // NOT ow -> w
    let [cmd, right] = statement.split(' ')
    result = NOT(runStatement(right))
  }
  else if (/ OR /.test(statement)) { // wa OR wb -> w
    let [left, cmd, right] = statement.split(' ')
    result = OR(runStatement(left), runStatement(right))
  }
  else if (/ AND /.test(statement)) { // lc AND 1 -> w
    let [left, cmd, right] = statement.split(' ')
    result = AND(runStatement(left), runStatement(right))
  }
  else if (/ LSHIFT /.test(statement)) { // lc LSHIFT 1 -> w
    let [left, cmd, right] = statement.split(' ')
    result = runStatement(left)
    let count = unconvert(runStatement(right))
    while (count-- > 0) {
      result = LSHIFT(result)
    }
  }
  else if (/ RSHIFT /.test(statement)) { // lc RSHIFT 1 -> w
    let [left, cmd, right] = statement.split(' ')
    result = runStatement(left)
    let count = unconvert(runStatement(right))
    while (count-- > 0) {
      result = RSHIFT(result)
    }
  }
  else {
    console.log(`unknown statement: [${statement}"`)
  }
  
  cache[statement] = result
  return result
}

let part1 = unconvert(runStatement('a'))
cache = { }
wires['b'] = `${part1}`
let part2 = unconvert(runStatement('a'))

console.log('part1', part1)
console.log('part2', part2)