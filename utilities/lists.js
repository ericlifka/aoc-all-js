
export const zip = (...lists) =>
  lists[0].map((_, i) =>
    lists.map( list => list[i] ))

export const unzip = (list) =>
  list[0].map((_, i) =>
    list.map( row => row[i] ))
