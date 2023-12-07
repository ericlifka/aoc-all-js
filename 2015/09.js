import { ascending } from "../utilities/sort.js"

let paths = [
    ["Tristram", "AlphaCentauri", 34],
    ["Tristram", "Snowdin", 100],
    ["Tristram", "Tambi", 63],
    ["Tristram", "Faerun", 108],
    ["Tristram", "Norrath", 111],
    ["Tristram", "Straylight", 89],
    ["Tristram", "Arbre", 132],
    ["AlphaCentauri", "Snowdin", 4],
    ["AlphaCentauri", "Tambi", 79],
    ["AlphaCentauri", "Faerun", 44],
    ["AlphaCentauri", "Norrath", 147],
    ["AlphaCentauri", "Straylight", 133],
    ["AlphaCentauri", "Arbre", 74],
    ["Snowdin", "Tambi", 105],
    ["Snowdin", "Faerun", 95],
    ["Snowdin", "Norrath", 48],
    ["Snowdin", "Straylight", 88],
    ["Snowdin", "Arbre", 7],
    ["Tambi", "Faerun", 68],
    ["Tambi", "Norrath", 134],
    ["Tambi", "Straylight", 107],
    ["Tambi", "Arbre", 40],
    ["Faerun", "Norrath", 11],
    ["Faerun", "Straylight", 66],
    ["Faerun", "Arbre", 144],
    ["Norrath", "Straylight", 115],
    ["Norrath", "Arbre", 135],
    ["Straylight", "Arbre", 127],
]

const pathsByCity = {}
paths.forEach(([city1, city2, distance]) => {
    pathsByCity[city1] = pathsByCity[city1] || {}
    pathsByCity[city1][city2] = distance

    pathsByCity[city2] = pathsByCity[city2] || {}
    pathsByCity[city2][city1] = distance
})

const permutations = items => {
    if (items.length == 1) {
        return [[...items]]
    }

    let perms = []
    for (let i = 0; i < items.length; i++) {
        let item = items[i]
        let rest = items.filter(it => it != item)
        let subPerms = permutations(rest)
        subPerms.forEach( perm => {
            perms.push([item, ...perm])
        })
    }
    return perms
}

const pathLength = path => {
    let distance = 0
    for (let i = 0; i < path.length - 1; i++) {
        distance += pathsByCity[path[i]][path[i+1]]
    }
    return distance
}

let allPaths = permutations(Object.keys(pathsByCity))
    .map(pathLength)
    .sort(ascending)

console.log('part 1: ', allPaths[0])
console.log('part 2: ', allPaths[allPaths.length - 1])
