
export const intersection = (setA, setB) => new Set([...setA].filter( value => setB.has(value) ))
