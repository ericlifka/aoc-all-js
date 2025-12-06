export const vecAdd = (vecA, vecB) =>
    vecA.map((vA, index) => vA + vecB[index])

export const vecSub = (vecA, vecB) =>
    vecA.map((vA, index) => vA - vecB[index])

export const vecEqual = (vecA, vecB) =>
       vecA.length == vecB.length 
    && vecA.every((_, i) => vecA[i] == vecB[i])

export const splitIntoGroups = (vec, size) => {
    let collection = []
    for (let i = 0; i < vec.length; i+= size) {
        let newVec = []
        for (let x = 0; x < size; x++) {
            newVec[x] = vec[i + x]
        }
        collection.push(newVec)
    }
    return collection
}

export const permutations = vec =>
      (!vec || !vec.length) ? []
    : (vec.length == 1) ? [ [...vec] ]
    : vec.reduce((perms, val, i) =>
        ( perms.push(...permutations([...vec.slice(0, i), ...vec.slice(i+1)]).map( perm => [val, ...perm] )) // lmao wut
        , perms ), [])


export const map2d = (vec2d, handler) =>
    vec2d.map((row, y) => 
        row.map((cell, x) => 
            handler(cell, x, y, vec2d)))

export const reduce2d = (vec2d, handler, accum) => {
    vec2d.forEach((row, y) => row.forEach((cell, x) => {
        accum = handler(accum, cell, x, y, vec2d)
    }))
    return accum
}

export const coalesceBy = (vec, prop) =>
    vec.reduce((map, entry) => (map[entry[prop]] = entry, map), {})


export const vec2dGetColumn = (vec2d, col) => {
    let vec = []
    for (let i = 0; i < vec2d.length; i++) {
        vec.push(vec2d[ i ][ col ])
    }
    return vec
}