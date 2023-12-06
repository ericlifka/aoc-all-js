import { multiply } from "../utilities/reducers.js"

// Time:        38     67     76     73
// Distance:   234   1027   1157   1236
let races = [
    [38, 234],
    [67, 1027],
    [76, 1157],
    [73, 1236],
]
let bigRace = [ 38677673, 234102711571236 ]

const doTheMath = (time, targetDistance) => {
    let a = -1, b = time, c = -targetDistance // 0 < -x^2 + time * x - targetDistance
    let lowerBound = (-b + Math.sqrt(b*b - 4 * a * c)) / (2 * a)
    let upperBound = (-b - Math.sqrt(b*b - 4 * a * c)) / (2 * a)
    return Math.ceil(upperBound - 1) - Math.floor(lowerBound + 1) + 1
}

console.log('part 1: ', races.map(([time, distance]) => doTheMath(time, distance)).reduce(multiply))
console.log('part 2: ', doTheMath(...bigRace))
