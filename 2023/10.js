import { withInputLines } from "../utilities/with-input.js"

let maze = withInputLines().map( line => line.split('') )

const CHARS = {
    '|': "│",
    '-': "─",
    'L': "╰",
    'J': "╯",
    '7': "╮",
    'F': "╭",
    'S': "╯",
}

const explode = ch => {
    switch (ch) {
    case '│': return [
        " ║ ",
        " ║ ",
        " ║ "]
    case '─': return [
        "   ",
        "═══",
        "   "]
    case '╰': return [
        " ║ ",
        " ╚═",
        "   "]
    case '╯': return [
        " ║ ",
        "═╝ ",
        "   "]
    case '╮': return [
        "   ",
        "═╗ ",
        " ║ "]
    case '╭': return [
        "   ",
        " ╔═",
        " ║ "]
    case '╯': return [
        " ║ ",
        "═╝ ",
        "   "]
    default: return [
        "   ",
        "   ",
        "   "]
    }
}

const getAt = ({ x, y }) => maze[y][x]

const findNextFrom = (pos, last) => {
    let [a, b] = directionChoicesForPipe(pos)
    if (a.x == last.x && a.y == last.y)
        return b
    else 
        return a
}

const directionChoicesForPipe = ({ x, y }) => {
    switch(getAt({ x, y })) {
        case '|': return [ { x: x + 0, y: y + 1 }, { x: x + 0, y: y - 1 } ]
        case '-': return [ { x: x - 1, y: y + 0 }, { x: x + 1, y: y + 0 } ]
        case 'L': return [ { x: x + 0, y: y - 1 }, { x: x + 1, y: y + 0 } ]
        case 'J': return [ { x: x + 0, y: y - 1 }, { x: x - 1, y: y + 0 } ]
        case '7': return [ { x: x - 1, y: y + 0 }, { x: x + 0, y: y + 1 } ]
        case 'F': return [ { x: x + 1, y: y + 0 }, { x: x + 0, y: y + 1 } ]
    }
}

const copyAtPoint = (grid, point, pipeChart) => {
    for (let y = 0; y < 3; y++) {
        for (let x = 0; x < 3; x++) {
            grid[point.y + y][point.x + x] = pipeChart[y][x]
        }
    }
}


// starting position and path found manually
let last = { x: 111, y: 62 }
let current = { x: 110, y: 62 }
let visited = [ last, current ]
let steps = 1

while (getAt(current) != 'S') {
    let next = findNextFrom(current, last)
    visited.push(next)
    last = current
    current = next
    steps++
}

console.log('part 1: ', steps / 2)

let pathGrid = maze.map( line => line.map( ch => ' '))
visited.forEach(({ x, y }) => pathGrid[y][x] = CHARS[maze[y][x]])

const bigMaze = Array.from(new Array(pathGrid.length * 3)).map(() => [])
pathGrid.forEach((line, y) => line.forEach((ch, x) =>
    copyAtPoint(bigMaze, { x: x*3, y: y*3 }, explode(ch))))

let yMax = bigMaze.length - 1
let xMax = bigMaze[0].length - 1
let queue = [ { x: 0, y: 0 }]
while (queue.length > 0) {
    let { x, y } = queue.pop()
    if (x >= 0 && x <= xMax && y >= 0 && y <= yMax && bigMaze[y][x] == ' ') {
        bigMaze[y][x] = '█'
        queue.push(...[{x: x-1, y}, {x: x+1, y}, {x, y: y-1}, {x, y: y+1}])
    }
}

let count = 0
pathGrid.forEach((line, y) => line.forEach((ch, x) => {
    if (bigMaze[y * 3 + 1][x * 3 + 1] == ' ') {
        count++
        pathGrid[y][x] = '█'
    }
}))

console.log('part 2: ', count)
