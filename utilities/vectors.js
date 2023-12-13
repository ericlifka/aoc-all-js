export const vecAdd = (vecA, vecB) =>
    vecA.map((vA, index) => vecB[index] + vA)

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
