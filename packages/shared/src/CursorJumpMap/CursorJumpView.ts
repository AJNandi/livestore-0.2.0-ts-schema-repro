import invariant from "tiny-invariant"
import { CellPosition, Direction, GridRect, SheetDimensions } from "../types"
import { RegionRTree } from "./RegionRTree"

export class CursorJumpView {
  rowTree: RegionRTree | undefined
  colTree: RegionRTree | undefined

  constructor(
    public maxRows: number,
    public maxCols: number
  ) {}

  update(rawRow: boolean[], rawCol: boolean[], dimensions: SheetDimensions) {
    this.rowTree = new RegionRTree(rawRow, dimensions.width, "row")
    this.colTree = new RegionRTree(rawCol, dimensions.height, "col")
  }

  nextContentfulCellInDirection([col, row]: CellPosition, direction: Direction): CellPosition {
    invariant(this.colTree, "Col tree must exist")
    invariant(this.rowTree, "Row tree must exist")

    let nextRow: number
    let nextCol: number
    switch (direction) {
      case Direction.Up:
        nextRow = this.colTree.getIndexOfContentBoundaryBefore(row)
        nextCol = col
        break
      case Direction.Down:
        nextRow = this.colTree.getIndexOfContentBoundaryAfter(row)
        nextCol = col
        break
      case Direction.Left:
        nextCol = this.rowTree.getIndexOfContentBoundaryBefore(col)
        nextRow = row
        break
      case Direction.Right:
        nextCol = this.rowTree.getIndexOfContentBoundaryAfter(col)
        nextRow = row
        break
      default:
        throw new Error("Invalid direction")
    }

    return [nextCol, nextRow]
  }

  getNextCell(direction: Direction, shiftKey: boolean, cell: CellPosition, range: GridRect) {
    const [col, row] = cell
    const { x, y, width, height } = range

    if (shiftKey) {
      switch (direction) {
        case Direction.Left:
        case Direction.Right:
          return this.nextContentfulCellInDirection([col > x ? x : x + width - 1, row], direction)
        case Direction.Up:
        case Direction.Down:
          return this.nextContentfulCellInDirection([col, row > y ? y : y + height - 1], direction)
        default:
          throw Error("invalid direction")
      }
    }
    const singleSelectionHead: CellPosition = [col, row]

    return this.nextContentfulCellInDirection(singleSelectionHead, direction)
  }
}
