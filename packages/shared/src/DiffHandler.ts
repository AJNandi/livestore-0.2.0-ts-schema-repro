import { RawCellContent } from "./types"

type DiffOperationAdd<Key> = {
  readonly op: "add"
  readonly key: Key
  readonly newValue: any
}
type DiffOperationDel<Key> = {
  readonly op: "del"
  readonly key: Key
  readonly oldValue: any
}
type DiffOperationChange<Key> = {
  readonly op: "change"
  readonly key: Key
  readonly oldValue: any
  readonly newValue: any
}
export type Diff = DiffOperationAdd<string> | DiffOperationDel<string> | DiffOperationChange<string>

export interface UniqueCellAddress {
  rowId: string
  colId: string
}

export type UnmappedCell = { addr: UniqueCellAddress; values: RawCellContent; sheet: string }
export type MappedCell = { address: { row: number; col: number; sheet: string }; values: RawCellContent }

type DiffHandler = {
  add?: (diff: DiffOperationAdd<string>) => void
  del?: (diff: DiffOperationDel<string>) => void
  change?: (diff: DiffOperationChange<string>) => void
}

/**
 *
 * @param key comes in the form "row/uuid"
 * @returns uuid
 */
export const getIdFromKey = (key: string) => key.split("/")[1]!

export const handleDiffs = (diffs: any, diffHandler: DiffHandler) => {
  ;(diffs as Diff[]).forEach((diff) => {
    switch (diff.op) {
      case "add":
        diffHandler.add?.(diff)
        break
      case "del":
        diffHandler.del?.(diff)
        break
      case "change":
        diffHandler.change?.(diff)
        break
      default:
        throw new Error(`Invalid diff operation ${diff}`)
    }
  })
}
