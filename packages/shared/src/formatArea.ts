import { BorderType } from "./cellFormat"
import { customUuid } from "./customUuid"
import { RowColumnIndex, RTreeRect, Slice } from "./selection"

export type FormatArea = {
  ranges: RTreeRect[]
  rows: Slice[]
  cols: Slice[]
}

// We use multiple ids because some commands like borders require multiple ids
export type FormatAreaWithIds = {
  ranges: { ids: string[]; rect: RTreeRect }[]
  rows: { ids: string[]; row: RowColumnIndex }[]
  cols: { ids: string[]; col: RowColumnIndex }[]
}

export const addUuidsToFormatArea = (formatArea: FormatArea): FormatAreaWithIds => {
  return {
    ranges: formatArea.ranges?.map((rect) => ({ ids: [customUuid()], rect })) || [],
    rows: formatArea.rows?.map((row) => ({ ids: [customUuid()], row })) || [],
    cols: formatArea.cols?.map((col) => ({ ids: [customUuid()], col })) || [],
  }
}

export const getIdsFromFormatArea = (formatArea: FormatAreaWithIds): string[] => {
  return [
    ...formatArea.ranges.map(({ ids }) => ids).flat(),
    ...formatArea.rows.map(({ ids }) => ids).flat(),
    ...formatArea.cols.map(({ ids }) => ids).flat(),
  ]
}

export const addUuidsToBorderFormatArea = (area: FormatArea, borderType: BorderType): FormatAreaWithIds => {
  return {
    ranges: area.ranges?.map((rect) => ({ ids: idsFromBorderType(borderType), rect })) || [],
    rows: area.rows?.map((row) => ({ ids: idsFromBorderType(borderType), row })) || [],
    cols: area.cols?.map((col) => ({ ids: idsFromBorderType(borderType), col })) || [],
  }
}

const idsFromBorderType = (borderType: BorderType): string[] => {
  switch (borderType) {
    case BorderType.Outside:
      return [customUuid(), customUuid(), customUuid(), customUuid()]
    case BorderType.Top:
      return [customUuid()]
    case BorderType.Bottom:
      return [customUuid()]
    case BorderType.Left:
      return [customUuid()]
    case BorderType.Right:
      return [customUuid()]
    case BorderType.None:
      return [customUuid()]
  }
}
