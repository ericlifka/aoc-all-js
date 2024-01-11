import { withInputGrid } from "../utilities/with-input.js"
import { totalElapsed } from "../utilities/timer.js"


// step 1: parse the puzzle maze input into a graph of nodes and pathways

let maze = withInputGrid()
    .map( line => line.map( ch => ch == '#' ? '#' : ' ' ))

const get = ({x, y}) => maze[y] ? maze[y][x] || '#' : '#'    
const key = ({x, y}) => `<${x},${y}>`
const neighbors = ({x, y}) => [
    { x: x + 1, y: y + 0 },
    { x: x - 1, y: y + 0 },
    { x: x + 0, y: y + 1 },
    { x: x + 0, y: y - 1 },
]

let start = { y: 0, x: 1 }
let end = { y: maze.length - 1, x: maze[0].length - 2 }

let nodeList = [ ]

const getNode = (coord) => {
    let node = nodeList.find( node => node.name == key(coord) )
    if (!node) {
        node = { name: key(coord), position: coord, connections: [] }
        nodeList.push(node)
    }
    return node
}

getNode(start)
getNode(end)

let visited = new Set([ key(start) ])
let processingQueue = [
    { position: {x: start.x, y: start.y + 1}, node: start }
]

while (processingQueue.length) {
    let { position, node } = processingQueue.shift()
    if (visited.has(key(position)))
        // path already processed while waiting in the queue
        continue

    let startNode = getNode(node)
    let path = new Set([ startNode.name ])

    while (true) {
        visited.add(key(position))

        let pathOptions = neighbors(position)
            .filter( p => get(p) != '#' && !path.has(key(p)) )

        if (pathOptions.length == 1) {
            // not yet at a node, keep walking
            path.add(key(position))
            position = pathOptions[0]
        }
        else {
            // either at a node or a dead end
            if (pathOptions.length > 0 || key(position) == key(end)) {
                let endNode = getNode(position)
                
                startNode.connections.push({
                    target: endNode.name,
                    length: path.size
                })
                endNode.connections.push({
                    target: startNode.name,
                    length: path.size
                })

                pathOptions.forEach( position => processingQueue.push(({ position, node: endNode.position })) )
            }
            break
        }
    }
}

let nodes = {}
nodeList.forEach( node => nodes[ node.name ] = node )

// step 2: run a modified Dijkstra search to find longest possible path

let endNode = nodes[ key(end) ]
let goal = endNode.connections[ 0 ].target
let completedRoutes = 0
let longestRoute = 0
let routeQueue = [
    { position: key(start), length: endNode.connections[ 0 ].length, visited: new Set([ key(start) ]), sortkey: 0 }
]

while (routeQueue.length) {
    let { position, length, visited } = routeQueue.shift()
    let node = nodes[ position ]

    node.connections.forEach( connection => {
        if (!visited.has(connection.target)) {
            let newPosition = connection.target
            let newLength = length + connection.length
            let newVisited = new Set([ ...visited, connection.target ])
            let newSortkey = newLength / newVisited.size

            if (newPosition != goal) {
                routeQueue.push({ position: newPosition, length: newLength, visited: newVisited, sortkey: newSortkey })
            } else {
                completedRoutes++
                if (newLength > longestRoute) {
                    longestRoute = newLength
                    console.log(`Routes processed: ${completedRoutes}, new longest: ${longestRoute}`, totalElapsed())
                }
            }
        }
    })

    routeQueue.sort((left, right) => {
        if (right.visited.size != left.visited.size) {
            return right.visited.size - left.visited.size
        } else {
            right.sortkey - left.sortkey
        }
    })
}

console.log(`\nRoutes processed: ${completedRoutes}\nLongest route: ${longestRoute}`, totalElapsed())
