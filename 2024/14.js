import { withInputLines } from "../utilities/with-input.js"

const width = 101, mid_width = Math.floor(width / 2)
const height = 103, mid_height = Math.floor(height / 2)

const part1 = () => {
    const constrain = (num, border) => {
        const res = (num % border)
        if (res < 0) {
            return border + res
        } else {
            return res
        }
    }

    let robots = withInputLines()
        .map( line => /p=(\d+),(\d+) v=(-?\d+),(-?\d+)/.exec(line))
        .map(([_, ...nums]) => nums.map(Number))
        .map(([px, py, vx, vy]) => [
            /* x */ constrain(px + vx * 100, width),
            /* y */ constrain(py + vy * 100, height)
        ])

    let quadrants = {
        upperleft: 0,
        upperright: 0,
        lowerleft: 0,
        lowerright: 0
    }

    robots.forEach(([x, y]) => {
        if (x < mid_width&& y < mid_height) quadrants.upperleft++
        if (x > mid_width&& y < mid_height) quadrants.upperright++
        if (x < mid_width&& y > mid_height) quadrants.lowerleft++
        if (x > mid_width&& y > mid_height) quadrants.lowerright++
    })

    console.log('2024 day 14 part 1 -', quadrants.lowerleft * quadrants.lowerright * quadrants.upperleft * quadrants.upperright)
}

part1()

const part2 = () => {
    let robots = withInputLines()
        .map( line => /p=(\d+),(\d+) v=(-?\d+),(-?\d+)/.exec(line))
        .map(([_, ...nums]) => nums.map(Number))

    const stepRobots = () => {
        robots = robots.map(([px, py, vx, vy]) => {
            let _px = px + vx
            let _py = py + vy
            if (_px < 0) _px += width
            else if (_px >= width) _px -= width
            if (_py < 0) _py += height
            else if (_py >= height) _py -= height

            return [ _px, _py, vx, vy ]
        })
    }

    const printGrid = () => {
        let grid = []
        for (let y = 0; y < height; y++) {
            grid[y] = []
            for (let x = 0; x < width; x++) {
                grid[y][x] = ' '
            }
        }
        robots.forEach(([x, y]) => grid[y][x] = '#')
        console.log('')
        console.log( grid.map( row => row.join('') ).join('\n') )
        console.log('')
    }

    // convergence points
    let y = 89
    let x = 11

    for (let i = 1; i <= 10000; i++) {
        stepRobots()

        if (  (i - 11) % 101 == 0
           && (i - 89) % 103 == 0 ) {
            console.log('2024 day 14 part 2 -', i)
            printGrid()
        }
    }
}

part2()
