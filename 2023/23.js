import { withInputGrid } from "../utilities/with-input.js"
import { descending } from "../utilities/sort.js"

let maze = withInputGrid()
let size = maze.length
let start = {
    x: maze[0].findIndex( cell => cell == "." ),
    y: 0
}
let end = {
    x: maze[size - 1].findIndex( cell => cell == "." ),
    y: size - 1
}

const neighbors = ({ x, y }) => [ { x:x+1, y }, { x:x-1, y }, { x, y:y+1 }, { x, y:y-1 } ]

const withSlopeLimits = ({x, y}, visited, current) => {
    if (visited.has(`${x},${y}`) || maze[y][x] == '#') {
        return false
    }
    if (maze[y][x] == '>' && x == current.x-1 ||
        maze[y][x] == 'v' && y == current.y-1 ||
        maze[y][x] == '<' && x == current.x+1 ||
        maze[y][x] == '^' && y == current.y+1 )
    {
        return false
    }
    return true
}

const withoutSlopeLimits = ({x, y}, visited, current) => {
    if (visited.has(`${x},${y}`) || maze[y][x] == '#') {
        return false
    }
    return true
}

let longest = 0

function findLongestPath(position, steps, canBeTraversed, visited) {
    if (position.x == end.x && position.y == end.y) {
        if (steps > longest) {
            longest = steps
            console.log('new longest: ', longest)
        }
        return steps
    }

    while (true) {
        let next = neighbors(position).filter( neighbor => 
            canBeTraversed(neighbor, visited, position))

        if (next.length == 0) { 
            return -1   // dead end, not a valid path
        }
        else if (next.length == 1) {
            position = next[0]
            visited.add(position.x + ',' + position.y)
            steps += 1
            if (position.x == end.x && position.y == end.y) { // victory!
                if (steps > longest) {
                    longest = steps
                    console.log('new longest: ', longest)
                }
                return steps
            }
        }
        else {
            let pathResults = next.map((pathStart) => 
                findLongestPath(pathStart, steps + 1, canBeTraversed,
                    new Set([`${pathStart.x},${pathStart.y}`, ...visited])))

            pathResults.sort(descending)
            return pathResults[0]
        }
    }
}

console.log('part 1: ', findLongestPath(start, 0, withSlopeLimits, new Set([`${start.x},${start.y - 1}`])))
console.log('part 2: ', findLongestPath(start, 0, withoutSlopeLimits, new Set([`${start.x},${start.y - 1}`])))
