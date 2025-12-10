import { withInputLines } from "../utilities/with-input.js"
import { elapsed } from "../utilities/timer.js"
import { descending } from "../utilities/sort.js"

let corners = withInputLines().map( line => line.split(',').map(Number))

let largestArea = 0
for (let i = 0; i < corners.length - 1; i++) {
  let [x1, y1] = corners[i]
  for (let j = i + 1; j < corners.length; j++) {
    let [x2, y2] = corners[j]
    let area = (Math.abs(x2 - x1) + 1) * (Math.abs(y2 - y1) + 1)
    if (area > largestArea) {
      largestArea = area
    }
  }
}

console.log('part 1 -', largestArea, elapsed())

// identified via graph generated in ./09.html
let slice1 = corners.slice(0, 248)
let pivot1 = corners[248]
let pivot2 = corners[249]
let slice2 = corners.slice(250)
let rects = []

function checkSliceAgainstPivot(slice, pivot) {
  slice.forEach( point => {
    let xmin = Math.min(point[0], pivot[0])
    let xmax = Math.max(point[0], pivot[0])
    let ymin = Math.min(point[1], pivot[1])
    let ymax = Math.max(point[1], pivot[1])

    for (let other of slice) {
      if ( other[0] > xmin && other[0] < xmax &&
           other[1] > ymin && other[1] < ymax ) {
        // point inside rect, not valid
        return
      }
    }
    // no point inside rect, record it's size
    rects.push((xmax - xmin + 1) * (ymax - ymin + 1))
  })
}

checkSliceAgainstPivot(slice1, pivot1)
checkSliceAgainstPivot(slice2, pivot2)
rects.sort(descending)

console.log('part 2 -', rects[0], elapsed())
