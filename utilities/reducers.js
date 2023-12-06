
export const sum = (accum, val) => accum + val
export const sumOfSums = (accum, row) => row.reduce(sum, accum)

export const multiply = (accum, val) => accum * val
