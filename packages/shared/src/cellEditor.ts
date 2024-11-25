import { CellPosition } from "./types"

export interface CellSelection {
  anchor: CellPosition
  head: CellPosition
  sheet: string | number
}

export const CellModes = {
  Ready: "Ready",
  Enter: "Enter",
  Point: "Point",
  Edit: "Edit",
} as const

// https://www.excel-first.com/excel-cell-modes/
export type CellMode = keyof typeof CellModes
