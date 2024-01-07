import { withInputLines } from "../utilities/with-input.js"
import { sum } from "../utilities/reducers.js"

let connections = withInputLines().map( line => line.split(/:? /))

let nodes = [...new Set(connections.flat())].map((name, i) => ({ 
    name,
    connections: [],
    group: i % 2 == 0 ? 'a' : 'b',
    internal: 0,
    external: 0,
    lastSwapped: 0
 }))
let nodeMap = nodes.reduce((map, node) => ({...map, [node.name]: node}), {})

connections.forEach(([node, ...connections]) => {
    connections.forEach( otherNode => {
        nodeMap[ node ].connections.push(otherNode)
        nodeMap[ otherNode ].connections.push(node)
    })
})

nodes.sort((left, right) => right.connections.length - left.connections.length)

nodes[0].group = 'a'
nodes[0].connections.forEach( conn => nodeMap[ conn ].group = 'a')
nodes[1].group = 'b'
nodes[1].connections.forEach( conn => nodeMap[ conn ].group = 'b')

// console.log(nodes[0])
// console.log(nodes[1])

function tallyConnections() {
    nodes.forEach( node => {
        node.internal = 0
        node.external = 0
        node.connections.forEach( other => {
            let otherNode = nodeMap[ other ]
            if (node.group == otherNode.group) {
                node.internal++
            } else {
                node.external++
            }
        })
    })
}

const countCrossGroupLinks = () => nodes
    .filter( node => node.group == 'a' )
    .map( node => node.external )
    .reduce( sum, 0 )


for (let i = 0; true; i++) {
    console.log('round', i)
    tallyConnections()
    let links = countCrossGroupLinks()
    if (links <= 3) {
        console.log(`${links} links left, ending`)
        break
    } else {
        console.log(`${links} external links`)
    }

    nodes.sort((left, right) => {
        let left_ordinal = left.external - left.internal
        let right_ordinal = right.external - right.internal

        if (left_ordinal == right_ordinal) {
            return left.lastSwapped - right.lastSwapped
        } else {
            return right_ordinal - left_ordinal
        }
    })
    // nodes.slice(0, 5).forEach(node => console.log(`${node.name}:(${node.external-node.internal})- e:(${node.external}) i:(${node.internal})`))

    let swap = nodes[0]

    console.log(`swaping node ${swap.name} which had ${swap.external} external links and ${swap.internal} internal links\n`)

    swap.lastSwapped = i
    if (swap.group == 'a')
        swap.group = 'b'
    else
        swap.group = 'a'

}

nodes.forEach(node => console.log(`${node.name}:(${node.external-node.internal})- e:(${node.external}) i:(${node.internal})`))

let group_a = nodes.filter(({group}) => group == 'a')
let group_b = nodes.filter(({group}) => group == 'b')

console.log(`group a, size ${group_a.length} - ${group_a.map(({name}) => name)}`)
console.log(`group b, size ${group_b.length} - ${group_b.map(({name}) => name)}`)
console.log('part 1: ', group_a.length * group_b.length)


// tallyConnections()
// // console.log(connections)
// console.log(nodes)
// console.log(countCrossGroupLinks())
// // console.log(nodeMap)
