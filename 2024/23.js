import {withInputLines} from "../utilities/with-input.js"

const intersection = (setA, setB) =>
  new Set([...setA].filter( i => setB.has(i) ))

let pairs = withInputLines().map(line => line.split('-'))
let links = {}
let computers = new Set()
links.addLink = function (from, to) {
  if (!this[from]) this[from] = new Set()
  this[from].add(to)
}

pairs.forEach(([l, r]) => {
  computers.add(l)
  computers.add(r)
  links.addLink(l, r)
  links.addLink(r, l)
})

let starts = [...computers].filter( name => name[0] === 't' )
let triples = new Set()
starts.forEach( computer => {
  for (let other of links[computer]) {
    let common = intersection(links[computer], links[other])
    for (let third of common) {
      triples.add([computer, other, third].sort().join('-'))
    }
  }
})
console.log('2024 day 23 part 1 -', triples.size)

console.log(Object.keys(links).sort((l, r) => links[l].size - links[r].size))
