import { multiply } from "../utilities/reducers.js"

// Time:        38     67     76     73
// Distance:   234   1027   1157   1236
let races = [
    [38, 234],
    [67, 1027],
    [76, 1157],
    [73, 1236],
]

const waysToWin = (time, targetDistance) => {
    let count = 0
    for (let i = 1; i < time; i++) {
        if (i * (time - i) > targetDistance) {
            count += 1
        }
    }
    return count
}

console.log('part 1: ', races.map(([time, distance]) => waysToWin(time, distance)).reduce(multiply))
console.log('part 2: ', waysToWin(38677673, 234102711571236))
