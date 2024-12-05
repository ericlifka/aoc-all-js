import {withInputSegments} from "../utilities/with-input.js"
import {sum} from "../utilities/reducers.js"
import {totalElapsed} from "../utilities/timer.js"

let [rulesText, printingsText] = withInputSegments("\n\n")

let rules = rulesText.split('\n').map( line => line.split('|').map(Number))
let printings = printingsText.split('\n').map( line => line.split(',').map(Number))

const tabulate = printing =>
  printing.reduce((index, page, i) => (index[page] = i, index), {})

const checkRule = tabs => rule =>
  isNaN(tabs[rule[0]]) || isNaN(tabs[rule[1]]) || tabs[rule[0]] < tabs[rule[1]]

const checkRules = printing =>
  rules.every(checkRule(tabulate(printing)))

let correctPrintings = printings.filter(checkRules)

const calcPrintingScore = printings => printings
  .map( printing => printing[Math.floor(printing.length / 2)])
  .reduce(sum)

console.log('2024 day 05 part 1 -', calcPrintingScore(correctPrintings))

let incorrectPrintings = printings.filter( p => !checkRules(p))

const associatedRules = tabs =>
  rules.filter(([l, r]) => !isNaN(tabs[l]) && !isNaN(tabs[r]))

let correctedPrintings = incorrectPrintings.map( printing => {
  let tabs = tabulate(printing)
  let last = printing.length
  let rules = associatedRules(tabs)
  let ordered = false
  while (!ordered) {
    ordered = true
    for (let [l, r] of rules) {
      if (tabs[l] > tabs[r]) {
        tabs[r] = last++
        ordered = false
        break
      }
    }
  }
  let newPrinting = []
  for (let page in tabs) {
    newPrinting[tabs[page]] = page
  }
  return newPrinting.filter(i => !isNaN(i)).map(Number)
})

console.log('2024 day 05 part 2 -', calcPrintingScore(correctedPrintings))
console.log(totalElapsed())
