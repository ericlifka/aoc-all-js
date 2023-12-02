import { withInputLines } from "../utilities/with-input.js"

const threeVowels = str => str.split('').filter( ch => new Set('aeiou'.split('')).has(ch)).length >= 3
const doubleLetter = str => !str.split('').every((_, i) => str[i] != str[i + 1])
const excludes = str => !/ab|cd|pq|xy/.test(str)

const duplicatePair = str => !str.split('').every((_, i) => !new RegExp(str.slice(i, i+2)).test(str.slice(i+2)))
const dupWithSkip = str => !str.split('').every((_, i) => str[i] != str[i + 2])


const strings = withInputLines("2015/input/05.txt")

console.log("part 1: ", strings.filter(str => threeVowels(str) && doubleLetter(str) && excludes(str)).length)
console.log("part 2: ", strings.filter(str => duplicatePair(str) && dupWithSkip(str)).length)
