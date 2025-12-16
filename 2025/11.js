import { elapsed } from "../utilities/timer.js"
import { withInputLines } from "../utilities/with-input.js"

const network = withInputLines()
  .map( line => line.split(': '))
  .map(([ source, targets ]) => [ source, targets.split(' ') ])
  .reduce((network, [ source, targets ]) => {
    network[ source ] = new Set(targets)
    return network
  }, { out: new Set() })

function pathsBetween(s, e) {
  let cache = {}

  const recur = (start, end) => {
    const cacheKey = `${start}-${end}`
    if (cache.hasOwnProperty(cacheKey)) {
      return cache[ cacheKey ]
    }
    if (start == end) {
      cache[ cacheKey ] = 1
      return 1
    }

    let count = 0
    for (let connection of network[start]) {
      count += recur(connection, end)
    }
    cache[ cacheKey ] = count
    return count
  }

  return recur(s, e)
}

const part1 = pathsBetween('you', 'out')
console.log('part 1 -', part1, elapsed())

const part2 =
  pathsBetween('svr', 'fft') *
  pathsBetween('fft', 'dac') *
  pathsBetween('dac', 'out')

console.log('part 2 -', part2, elapsed())