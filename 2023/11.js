import { withInputLines } from "../utilities/with-input.js"
import { sum } from "../utilities/reducers.js"

const runExpansionSimulation = expansionCoefficient => {
    let stars = []
    let starGrid = withInputLines()
        .map((line, y) => line.split('')
            .map((cell, x) => ({ x, y, cell })))
            
    let yOffset = 0
    for (let y = 0; y < starGrid.length; y++) {
        let isEmpty = true
        for (let x = 0; x < starGrid[0].length; x++) {
            if (starGrid[y][x].cell == '#') {
                stars.push(starGrid[y][x])
                isEmpty = false
            }
            starGrid[y][x].y = yOffset
        }
        yOffset += isEmpty ? expansionCoefficient : 1
    }

    let xOffset = 0
    for (let x = 0; x < starGrid[0].length; x++) {
        let isEmpty = true
        for (let y = 0; y < starGrid.length; y++) {
            if (starGrid[y][x].cell == '#') {
                isEmpty = false
            }
            starGrid[y][x].x = xOffset
        }
        xOffset += isEmpty ? expansionCoefficient : 1
    }

    let paths = []
    for (let i = 0; i < stars.length - 1; i++) {
        let starLight = stars[i]
        for (let j = i + 1; j < stars.length; j++) {
            let starBright = stars[j]
            let distance = Math.abs(starBright.x - starLight.x) + Math.abs(starBright.y - starLight.y)
            paths.push(distance)
        }
    }

    return paths.reduce(sum)
}

console.log('part 1: ', runExpansionSimulation(2))
console.log('part 2: ', runExpansionSimulation(1000000))
