import {withInputSegments} from "../utilities/with-input.js"
import {sum} from "../utilities/reducers.js";

let machines = withInputSegments('\n\n')
  .map( str => str.split('\n').join(' '))
  .map( str => /Button A: X\+(\d+), Y\+(\d+) Button B: X\+(\d+), Y\+(\d+) Prize: X=(\d+), Y=(\d+)/.exec(str))
  .map(([_, ...matched]) => matched.map(Number))
  .map(([Xa, Ya, Xb, Yb, X, Y]) => ({Xa, Ya, Xb, Yb, X: X + 10000000000000, Y: Y + 10000000000000}))

let costs = machines.map(({Xa, Ya, Xb, Yb, X, Y}) => {
  let B = (Xa * Y - Ya * X) / (Xa * Yb - Ya * Xb)
  let A = (X - Xb * B) / Xa

  if (B % 1 !== 0 || A % 1 !== 0) {
    return 0
  } else {
    return A * 3 + B
  }
})

console.log('2024 day 13 -', costs.reduce(sum))

/*
Xa * A + Xb * B = X
     A          = (X - Xb * B) / Xa

Ya * A + Yb * B = Y
     A          = (Y - Yb * B) / Ya

      (X - Xb * B) / Xa = (Y - Yb * B) / Ya
   Ya * X - Ya * Xb * B = Xa * Y - Xa * Yb * B
B * (Xa * Yb - Ya * Xb) = Xa * Y - Ya * X
                      B = (Xa * Y - Ya * X) / (Xa * Yb - Ya * Xb)


Xa * A + Xb * B = X
              A = (X - Xb * B) / Xa
 */
