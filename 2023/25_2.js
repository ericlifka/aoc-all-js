import { withInputLines } from "../utilities/with-input.js"
import { sum } from "../utilities/reducers.js"

function createGraph() {
    let input = withInputLines().map( line => line.split(/:? /))

    let nodeList = [...new Set(input.flat())].map((name) => ({ 
        name,
        links: {}
    }))

    let graph = {}
    nodeList.forEach((node) => graph[node.name] = node)
    
    input.forEach(([node, ...connections]) => {
        connections.forEach( otherNode => {
            graph[ node ].links[ otherNode ] = 1
            graph[ otherNode ].links[ node ] = 1
        })
    })
    resetGroups(graph)
    
    return graph
}

function resetGroups(graph) {
    Object.values(graph).forEach( node => {
        node.group = 'b'
        node.external = 0
        node.internal = Object.values(node.links).reduce(sum, 0)
    })
}

function addNodeToGroupA(graph, node) {
    // console.assert(node.group != 'a', "Node shouldn't already be in group A")

    node.group = 'a'
    node.external = 0
    node.internal = 0
    Object.keys(node.links).forEach( other => {
        let weight = node.links[ other ]
        let otherNode = graph[ other ]

        if (otherNode.group == 'a') {
            otherNode.external -= weight
            otherNode.internal += weight
            node.internal += weight
        } else {
            otherNode.external += weight
            otherNode.internal -= weight
            node.external += weight
        }
    })
}

function mergeNodes(graph, node1, node2) {
    let mergedName = node1.name + '-' + node2.name
    let mergedLinks = { ...node1.links }
    Object.keys(node2.links).forEach( n => {
        mergedLinks[ n ] = (mergedLinks[ n ] || 0) + node2.links[ n ]
    })
    delete mergedLinks[ node1.name ]
    delete mergedLinks[ node2.name ]

    let mergedNode = {
        name: mergedName,
        links: mergedLinks
    }

    Object.keys(mergedLinks).forEach( n => {
        let node = graph[ n ]
        delete node.links[ node1.name ]
        delete node.links[ node2.name ]
        node.links[ mergedName ] = mergedLinks[ n ]
    })

    delete graph[ node1.name ]
    delete graph[ node2.name ]

    graph[ mergedName ] = mergedNode
}

const calcGroupSize = (group) => group.map(name => name.split('-')).flat().length


function minimumCutPhase(graph, start) {
    resetGroups(graph)

    let group_a = [ start ]
    let group_b = Object.keys(graph).filter( name => name != start )
    addNodeToGroupA(graph, graph[start])

    const tallyCutWeight = () =>
        group_a.map( name => graph[name].external ).reduce(sum, 0)
    
    let minimum_cut_weight = tallyCutWeight()
    
    while (true) {
        group_b.sort((left, right) => graph[left].external - graph[right].external)
        let to_switch = group_b.pop()
        // console.log(to_switch)
        group_a.push(to_switch)
        addNodeToGroupA(graph, graph[to_switch])

        let cut_weight = tallyCutWeight()
        if (cut_weight == 3) {
            console.log('answer:', calcGroupSize(group_a) * calcGroupSize(group_b))
            process.exit()
        }

        if (group_b.length == 1) {
            let final_node = group_b.pop()
            mergeNodes(graph, graph[to_switch], graph[final_node])

            return minimum_cut_weight
        }
    }
}


let graph = createGraph()

let mins = Object.keys(graph).map( (start, i) => {
    let min = minimumCutPhase(createGraph(), start)
    console.log(i, '-', start, '-', min)
    return min
}).sort((l, r) => l - r)

console.log(mins.slice(0, 5))
console.log(mins.slice(mins.length - 5))
