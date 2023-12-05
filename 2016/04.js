import { withInputLines } from "../utilities/with-input.js"
import { sum } from "../utilities/reducers.js"

const validate = ({ name, checksum }) => {
    let counts = name
        .split('')
        .filter(ch => ch != "-")
        .reduce((counts, ch) => (counts[ch] = (counts[ch] || 0) + 1, counts), {})

    let computedCecksum = Object.keys(counts)
        .sort((l, r) => counts[r] - counts[l] || l.charCodeAt(0) - r.charCodeAt(0))
        .join('')
        .slice(0, 5)

    return computedCecksum == checksum
}

const A = 'a'.charCodeAt(0)
const decrypt = room => {
    room.name = room.name.split('').map( ch =>
        ch == '-'
            ? ' '
            : String.fromCharCode((ch.charCodeAt(0) - A + room.id) % 26 + A)
    ).join('')
    return room
}

let rooms = withInputLines("2016/input/04.txt")
    .map( room => /(.*)-(\d+)\[(.*)\]/.exec(room) )
    .map(([ _, name, sectorId, checksum ]) => ({ id: parseInt(sectorId, 10), name, checksum }))
    .filter(validate)
    .map(decrypt)

console.log('part 1:',rooms
    .map(({ id }) => id)
    .reduce(sum, 0))

console.log('part 2: ', rooms.find(({name}) => name.match(/north/)).id)