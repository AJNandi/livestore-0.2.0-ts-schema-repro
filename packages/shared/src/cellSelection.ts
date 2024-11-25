import { CompactSelection } from "./CompactSelection"
import { Slice } from "./selection"
import { CellPosition, GridSelectionRange } from "./types"

export interface CellSelectionState {
  rows: Slice[]
  columns: Slice[]
  current: { rangeStack: GridSelectionRange[]; range: GridSelectionRange; cell: CellPosition } | undefined
}
export interface GlideSelectionState {
  rows: CompactSelection
  columns: CompactSelection
  current: { rangeStack: GridSelectionRange[]; range: GridSelectionRange; cell: CellPosition } | undefined
}

export interface HighlightRegion {
  range: GridSelectionRange
  color: string
  style?: "dashed" | "solid" | "no-outline" | "solid-outline"
  sheetId?: string
}

export const EMPTY_GRID_SELECTION: CellSelectionState = {
  current: { cell: [0, 0], rangeStack: [], range: { x: 0, y: 0, width: 1, height: 1 } },
  rows: [],
  columns: [],
}

export type CellJumpMap = {
  up: CellPosition
  down: CellPosition
  left: CellPosition
  right: CellPosition
}

interface RTreeRect {
  min_x: number
  min_y: number
  max_x: number
  max_y: number
}

export function rangeToRTreeRect(ranges: GridSelectionRange[]) {
  const boxes: RTreeRect[] = []
  ranges.forEach(({ x, y, width, height }) => {
    boxes.push({ min_x: x, min_y: y, max_x: x + width - 1, max_y: y + height - 1 })
  })
  return boxes
}

export function rangeToStartEndRange(
  sheet: string,
  range: GridSelectionRange
): {
  start: { row: number; col: number; sheet: string }
  end: { row: number; col: number; sheet: string }
} {
  return {
    start: { row: range.y, col: range.x, sheet },
    end: { row: range.y + range.height - 1, col: range.x + range.width - 1, sheet },
  }
}
