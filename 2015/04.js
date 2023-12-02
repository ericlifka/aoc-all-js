import md5 from "md5"
import { withInput } from "../utilities/with-input.js"

const smallCoinMatch = coin => coin.slice(0, 5) == "00000"
const largeCoinMatch = coin => coin.slice(0, 6) == "000000"

let key = withInput("2015/input/04.txt")
let coin = 0
while (!smallCoinMatch(md5(key + coin)))
    coin++

console.log("part 1: ", coin)

while (!largeCoinMatch(md5(key + coin)))
    coin++

console.log("part 2: ", coin)
