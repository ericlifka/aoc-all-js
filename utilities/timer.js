
let marker = Date.now()

export const elapsed = () => {
    let newMarker = Date.now()
    let msg = `\n  elapsed: ${newMarker-marker}ms\n`
    marker = newMarker
    return msg
}