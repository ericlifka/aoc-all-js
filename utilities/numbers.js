
export const roundToPlaces = (num, places) =>
    Math.floor(Math.pow(10, places) * num) / Math.pow(10, places)