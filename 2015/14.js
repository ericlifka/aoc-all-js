import { withInputLines } from "../utilities/with-input.js"
import { toInt } from "../utilities/parsers.js"
import { descending } from "../utilities/sort.js"
import { sum } from "../utilities/reducers.js"


const distanceAfter = (reindeer, time) => {
    let cycleCadence = reindeer.duration + reindeer.rest
    let fullCycles = Math.floor(time / cycleCadence)
    let remainder = Math.min(time % cycleCadence, reindeer.duration)
    let movementSeconds = fullCycles * reindeer.duration + remainder

    return movementSeconds * reindeer.speed
}

let specs = withInputLines()
    .map( line => line.match(/(\w+) can fly (\d+) km\/s for (\d+) seconds, but then must rest for (\d+) seconds\./) )
    .map(([_, name, speed, duration, rest]) => ({ name, speed: toInt(speed), duration: toInt(duration), rest: toInt(rest) }))

console.log('part 1: ', specs.map( reindeer => distanceAfter(reindeer, 2503)).sort(descending).at(0) )

let scores = specs.reduce((obj, {name}) => ({...obj, [name]: 0}), {})
let raceFrames = specs.map( reindeer => {
    let frames = [ reindeer.name ]
    for (let i = 1; i <= 2503; i++) {
        frames.push(distanceAfter(reindeer, i))
    }
    return frames
})

for (let i = 1; i <= 2503; i++) {
    raceFrames.sort((left, right) => right[i] - left[i])
    let topScore = raceFrames[0][i]
    for (let j = 0; j < raceFrames.length; j++) {
        if (raceFrames[j][i] == topScore) {
            scores[ raceFrames[j][0] ] += 1
        }
    }

    // raceFrames.forEach(([name, ...positions]) => console.log(name, ": ", positions[i - 1]))
    // console.log(scores, "\n\n")
}
console.log(scores)
console.log(Object.values(scores).reduce(sum))