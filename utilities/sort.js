export const ascending = (left, right) => left - right
export const compareByProp = (prop, comparer) =>
    (left, right) => comparer(left[prop], right[prop])
    