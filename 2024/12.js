import {withInputGrid} from '../utilities/with-input.js'
import {sum} from "../utilities/reducers.js"
import {totalElapsed} from "../utilities/timer.js"

const plots = withInputGrid()
const plotsVisited = plots.map(row => row.map(() => false))
const width = plots[0].length
const height = plots.length
const groups = []

const get = ({x, y}) => {
  if (x < 0 || y < 0 || x >= width || y >= height) {
    return { plot: -1, visited: true }
  }
  return { plot: plots[y][x], visited: plotsVisited[y][x] }
}

const neighbors = (x, y) => [ [x, y + 1], [x, y - 1], [x + 1, y ], [x - 1, y] ]

const startGroupFrom = (x, y) => {
  let { plot, visited } = get({x, y})
  if (visited) return

  const group = { plot, area: 0, perimeter: 0, members: [] }

  const step = (x, y) => {
    plotsVisited[y][x] = true
    group.area++
    group.members.push({x, y})
    neighbors(x, y).forEach(([nx, ny]) => {
      let { plot: nplot, visited: nvisited } = get({x:nx, y:ny})
      if (nplot === plot) {
        if (!nvisited) {
          step(nx, ny)
        }
      } else {
        group.perimeter++
      }
    })
  }

  step(x, y)
  groups.push(group)
}


for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    startGroupFrom(x, y)
  }
}

console.log('2024 day 12 part 1 -', groups.map(({area, perimeter}) => area * perimeter).reduce(sum))

const assessVertex = (plot, neighbor1, neighbor2, cattycorner) => {
  let p = get(plot).plot
  let n1 = get(neighbor1).plot
  let n2 = get(neighbor2).plot
  let c = get(cattycorner).plot

  if (n1 !== p && n2 !== p) {
    return 1
  }
  if (n1 === p && n2 === p) {
    if (c === p) {
      return 0
    } else {
      return 1
    }
  }
  // n1 !== n2
  return 0
}

const countCorners = (plot) =>
  assessVertex(plot,
    {x: plot.x, y: plot.y-1},
    {x: plot.x-1, y: plot.y},
    {x: plot.x-1, y: plot.y-1},
  ) +
  assessVertex(plot,
    {x: plot.x, y: plot.y-1},
    {x: plot.x+1, y: plot.y},
    {x: plot.x+1, y: plot.y-1},
  ) +
  assessVertex(plot,
    {x: plot.x, y: plot.y+1},
    {x: plot.x+1, y: plot.y},
    {x: plot.x+1, y: plot.y+1},
  ) +
  assessVertex(plot,
    {x: plot.x, y: plot.y+1},
    {x: plot.x-1, y: plot.y},
    {x: plot.x-1, y: plot.y+1},
  )

groups.forEach( group => {
  group.corners = group.members.map(countCorners).reduce(sum)
})

console.log('2024 day 12 part 2 -', groups.map(({area, corners}) => area * corners).reduce(sum))
console.log(totalElapsed())
