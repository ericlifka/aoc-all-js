import { roundToPlaces } from "./numbers.js"

let marker = Date.now()

const formatTime = millis => {
    if (millis < 1000) return millis + "ms"
    if (millis < 60000) return roundToPlaces(millis / 1000, 2) + "s"
    if (millis < 3600000) return roundToPlaces(millis / 60000, 2) + "m"
    return roundToPlaces(millis / 3600000, 2) + "h"
}

export const elapsed = () => {
    let newMarker = Date.now()
    let msg = `\n  elapsed: ${formatTime(newMarker-marker)}\n`
    marker = newMarker
    return msg
}
