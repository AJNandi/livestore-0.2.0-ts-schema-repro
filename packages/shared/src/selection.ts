import { GridSelectionRange } from "./types"

export type Slice = [start: number, end: number]

export interface StaticGridSelection {
  rows: Slice[]
  columns: Slice[]
  ranges: GridSelectionRange[]
}

export type RowColumnIndex = [indexAt: number, count: number]

export type RTreeRect = { min_x: number; min_y: number; max_x: number; max_y: number }
