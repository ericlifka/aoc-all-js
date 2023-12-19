import { withInputLines } from "../utilities/with-input.js"
import { vecAdd } from "../utilities/vectors.js"

const vectors = {
    3: [  0,  1 ],  1: [  0, -1 ],  2: [ -1,  0 ],  0: [  1,  0 ],
    U: [  0,  1 ],  D: [  0, -1 ],  L: [ -1,  0 ],  R: [  1,  0 ] }

const shoeLaceBetweenTwoPoints = ([ p1x, p1y ], [ p2x, p2y ]) => p1x * p2y - p1y * p2x

const shoeLaceAlgorithm = points => {
    let sum = 0
    for (let i = 0; i < points.length - 1; i++) {
        sum += shoeLaceBetweenTwoPoints(points[i], points[i + 1])
    }
    return sum / 2
}

const pickAlgorithm = (area, boundary) => Math.abs(area) - Math.abs(boundary) / 2 + 1

const followInstructions = instructions => {
    let position = [ 0, 0 ]
    let points = [ position ]
    let boundarySize = 0

    instructions.forEach(([direction, distance]) => {
        boundarySize += distance
        position = vecAdd(position, direction.map( v => v * distance ))
        points.push(position)
    })

    let interiorPoints = pickAlgorithm(shoeLaceAlgorithm(points), boundarySize)

    return boundarySize + interiorPoints
}

console.log('part 1: ', followInstructions(
    withInputLines()
        .map(line => line.split(' '))
        .map(([direction, distance]) => [ vectors[direction], parseInt(distance, 10) ])))

console.log('part 2: ', followInstructions(
    withInputLines()
        .map(line => line.match(/.*\(#(.{5})(.)\)/))
        .map(([_, distance, direction]) => [ vectors[direction], parseInt(distance, 16) ])))