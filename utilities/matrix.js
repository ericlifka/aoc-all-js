
export class Matrix {
  constructor(data = []) {
    this.data = data
  }

  addRow(row) {
    if (this.data.length > 0 && this.data[0].length != row.length) {
      throw new Error(`tried to add row to matrix that wasn't the same size\nrow:${row}\nmatrix:${this.data}`)
    }
    this.data.push(row)
  }

  addColumn(column) {
    if (this.data.length > 0 && this.data.length != column.length) {
      throw new Error(`tried to add column to matrix that wasn't the same size\column:${column}\nmatrix:${this.data}`)
    }

    if (this.data.length == 0) {
      column.forEach( c => this.data.push([ c ]))
    } else {
      column.forEach((c, i) => this.data[i].push(c))
    }
  }

  getColumn(col) {
    return this.data.map( row => row[col] )
  }

  _swapRows(row1, row2) {
    let tmp = this.data[row2]
    this.data[row2] = this.data[row1]
    this.data[row1] = tmp
  }

  _addRowToOtherRow(row, target, scaler = 1) {
    this.data[row].forEach((v, i) => this.data[target][i] += v * scaler)
  }

  findReducedRowEchelonForm() {
    let m = new Matrix(this.data.map(row => [...row]))
    const height = m.data.length, width = m.data[0].length

    const operateOnSubmatrix = (row, col) => {
      // check if we've reached the recursive bottom
      if (row >= height || col >= width) {
        return
      }

      // look for first row with non zero value in leftmost position
      let targetRow = -1
      for (let y = row; y < height; y++) {
        if (m.data[y][col] != 0) {
          targetRow = y
          break
        }
      }
      // check for fully zero subcolumn
      if (targetRow < 0) {
        // skip over current column, but don't change row
        operateOnSubmatrix(row, col + 1)
        return
      }

      // if target row isn't the top row of the sub matrix then swap them
      if (targetRow != row) {
        m._swapRows(targetRow, row)
      }

      // if pivot value isn't one then scale row so that it is
      let pivotValue = m.data[row][col]
      if (pivotValue != 1) {
        for (let x = 0; x < width; x++) {
          m.data[row][x] /= pivotValue
        }
      }

      // eliminate pivot column above and below
      for (let y = 0; y < height; y++) {
        let pivotColValue = m.data[y][col]
        if (y != row && pivotColValue != 0) {
          m._addRowToOtherRow(row, y, -1 * pivotColValue)
        }
      }

      operateOnSubmatrix(row + 1, col + 1)
    }

    operateOnSubmatrix(0, 0)
    return m
  }

  isPivotColumn(col) {
    // check if only one value in this column is not zero and if it's 1
    let row = -1
    for (let y = 0; y < this.data.length; y++) {
      if (this.data[y][col] != 0) {
        // any non 0 non 1 value means it's not a pivot
        if (this.data[y][col] != 1) {
          return false
        }

        // if we found more than one value in this column it's not a pivot
        if (row != -1) {
          return false
        }

        row = y
      }
    }

    // check if we didn't find a potential pivot row
    if (row == -1) {
      return false
    }

    // check that all values to the left of the potential pivot are zero
    for (let x = 0; x < col; x++) {
      if (this.data[row][x] != 0) {
        return false
      }
    }

    return true
  }

  toString() {
    let data = this.data.map(row => row.map(String))
    let colWidth = 1
    data.forEach( row => row.forEach( cell => colWidth = Math.max(colWidth, cell.length)))

    return '[' + data.map(row => `[ ${row.map(s=>s.padStart(colWidth, ' ')).join(' ')} ]`).join('\n ') + ']\n'
  }
}