export type CellPosition = [col: number, row: number]
export enum Direction {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT",
}

export interface GridRect {
  x: number
  y: number
  width: number
  height: number
}

export type RawCellContent = Date | string | number | boolean | null | undefined

export interface GridSelectionRange {
  x: number
  y: number
  width: number
  height: number
}

export type BatchChange = { mutator: string; args: any[] }
export type BatchChangeHandler = (change: BatchChange) => void

export type Maybe<T> = T | undefined

export interface SheetCellAddress {
  col: number
  row: number
}

export interface SimpleCellAddress {
  col: number
  row: number
  sheet: string
}

export type SheetDimensions = { height: number; width: number }

export type CellValue = number | string | boolean | null
export type DetailedCellError = { value?: string; error: string }

export enum CellValueDetailedType {
  EMPTY = "EMPTY",
  NUMBER = "NUMBER",
  STRING = "STRING",
  BOOLEAN = "BOOLEAN",
  ERROR = "ERROR",
  NUMBER_RAW = "NUMBER_RAW",
  NUMBER_DATE = "NUMBER_DATE",
  NUMBER_TIME = "NUMBER_TIME",
  NUMBER_DATETIME = "NUMBER_DATETIME",
  NUMBER_CURRENCY = "NUMBER_CURRENCY",
  NUMBER_PERCENT = "NUMBER_PERCENT",
  RANGE = "RANGE",
}

export const CellValueDetailNumberTypes: string[] = [
  CellValueDetailedType.BOOLEAN,
  CellValueDetailedType.NUMBER,
  CellValueDetailedType.NUMBER_RAW,
  CellValueDetailedType.NUMBER_CURRENCY,
  CellValueDetailedType.NUMBER_DATE,
  CellValueDetailedType.NUMBER_DATETIME,
  CellValueDetailedType.NUMBER_PERCENT,
  CellValueDetailedType.NUMBER_TIME,
]


export type ColResize = { index: number; startWidth: number; endWidth: number }
