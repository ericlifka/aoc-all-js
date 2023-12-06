import { withInputLines } from '../utilities/with-input.js'

const isABBA = (str, i) => str[i] == str[i+3] && str[i+1] == str[i+2] && str[i] != str[i+1]
const isABA = (str, i) => str[i] == str[i+2] && str[i] != str[i+1] && str[i+1] != "[" && str[i+1] != "]"

const isTLS = ip => {
    let hasABBA = false
    let hasABBAinHypernet = false
    let insideHypernet = false

    for (let i = 0; i < ip.length; i++) {
        if (ip[i] == '[') {
            insideHypernet = true
        } else if (ip[i] == ']') {
            insideHypernet = false
        } else if (isABBA(ip, i)) {
            if (insideHypernet) {
                hasABBAinHypernet = true
            } else {
                hasABBA = true
            }
        }
    }
    return hasABBA && !hasABBAinHypernet
}

const isSSL = ip => {
    const ABAs = []
    const BABs = []
    let insideHypernet = false

    for (let i = 0; i < ip.length; i++) {
        if (ip[i] == '[') {
            insideHypernet = true
        } else if (ip[i] == ']') {
            insideHypernet = false
        } else if (isABA(ip, i)) {
            if (insideHypernet) {
                BABs.push(ip.slice(i, i+3))
            } else {
                ABAs.push(ip.slice(i, i+3))
            }
        }
    }

    return !!ABAs.find( aba => BABs.find( bab => aba[0] == bab[1] && aba[1] == bab[0] ))
}

let ips = withInputLines("2016/input/07.txt")

console.log('part 1: ', ips.filter(isTLS).length)
console.log('part 2: ', ips.filter(isSSL).length)
