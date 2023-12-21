import { multiply } from "./reducers.js"

export const getPrimeFactors = num => {
    let factors = []
    let f = 2
    while (f <= num)
        if (num % f == 0) {
            factors.push(f)
            num /= f
        } else f++

    return factors
}

const combineFactorLists = (list1, list2) => {
    let leftList = [...list1]
    let rightList = [...list2]
    let combined = []
    while (leftList.length > 0 || rightList.length > 0) {
        if (leftList.length == 0)               combined.push(rightList.shift())
        else if (rightList.length == 0)         combined.push(leftList.shift())
        else if (leftList[0] < rightList[0])    combined.push(leftList.shift())
        else if (rightList[0] < leftList[0])    combined.push(rightList.shift())
        else { // values are the same, only add one copy to combined list but remove both
            combined.push(leftList[0])
            leftList.shift()
            rightList.shift()
        }
    }
    return combined
}

export const leastCommonMultiple = (...numbers) =>
    numbers.map(getPrimeFactors).reduce(combineFactorLists).reduce(multiply, 1)
