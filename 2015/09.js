/*

["AlphaCentauri", "Snowdin", 4]
Snowdin to Arbre = 7
Faerun to Norrath = 11
Tristram to AlphaCentauri = 34
Tambi to Arbre = 40
Faerun to Straylight = 66
Tristram to Straylight = 89


 * AlphaCentauri to Faerun = 44
 * Snowdin to Norrath = 48
 * Tristram to Tambi = 63
 * Tambi to Faerun = 68
 * AlphaCentauri to Arbre = 74
 * AlphaCentauri to Tambi = 79
 * Snowdin to Straylight = 88
 * Snowdin to Faerun = 95
 * Tristram to Snowdin = 100
 * Snowdin to Tambi = 105
 * Tambi to Straylight = 107
 * Tristram to Faerun = 108
 * Tristram to Norrath = 111
 * Norrath to Straylight = 115
 * Straylight to Arbre = 127
 * Tristram to Arbre = 132
 * AlphaCentauri to Straylight = 133
Tambi to Norrath = 134
 * Norrath to Arbre = 135
 * Faerun to Arbre = 144
 * AlphaCentauri to Norrath = 147

*/

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

const createsClosedLoop = (networks, city1, city2) => {
    for (let network of networks) {
        if (network.has(city1) && network.has(city2)) {
            return true
        }
    }
    return false
}

const findAffectedNetworks = (networks, city1, city2) => {
    let found = []
    for (let network of networks) {
        if (network.has(city1) || network.has(city2)) {
            found.push(network)
        }
    }
    return found
}

const findPath = orderedPaths => {
    let completedCities = new Set()
    let selectedPaths = []
    let connectedNetworks = []

    orderedPaths.forEach( path => {
        let [city1, city2] = path

        if (!completedCities.has(city1) && !completedCities.has(city2)) {
            let affectedNetworks = findAffectedNetworks(connectedNetworks, city1, city2)
            if (!(affectedNetworks.length == 1 && affectedNetworks[0].has(city1) && affectedNetworks[0].has(city2))) { // make sure it won't make a closed loop
                selectedPaths.push(path)

                if (affectedNetworks.length == 1) {
                    let network = affectedNetworks[0]
                    if (network.has(city1)) completedCities.add(city1)
                    if (network.has(city2)) completedCities.add(city2)
                    network.add(city1)
                    network.add(city2)
                } else if (affectedNetworks.length == 0) {
                    connectedNetworks.push(new Set([city1, city2]))
                } else { // need to merge two networks
                    affectedNetworks[1].forEach( city => affectedNetworks[0].add(city) )
                    affectedNetworks[1].clear()
                    connectedNetworks = connectedNetworks.filter( network => network.size > 0 )
                    completedCities.add(city1)
                    completedCities.add(city2)
                }
            }
        }
    })

    return selectedPaths
}

const pathLength = network => network.reduce((total, [,,distance]) => total + distance, 0)

let orderedAscending = [...paths].sort((left, right) => left[2] - right[2])
let orderedDescending = [...paths].sort((left, right) => right[2] - left[2])

console.log('part 1: ', pathLength(findPath(orderedAscending)))
console.log('part 2: ', pathLength(findPath(orderedDescending)))

