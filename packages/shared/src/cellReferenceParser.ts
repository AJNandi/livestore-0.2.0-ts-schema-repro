import { convertLetterToNumber } from "./conversion"
import { CellPosition, SheetDimensions } from "./types"

export function textToCellPosition(text: string): CellPosition {
  const match = text.match(/^(\$)?([a-zA-Z]+)(\$)?(\d+)$/)

  if (!match) throw Error("Unable to parse cell position")

  const [, _absCol, letters, _absRow, numbers] = match
  if (!letters || !numbers) throw Error("Invalid row selection")
  return [convertLetterToNumber(letters), parseInt(numbers) - 1]
}

function textToRowSelection(text: string, config: SheetDimensions): CellPosition[] | null {
  const match = text.match(/^(\$)?(\d+):(\$)?(\d+)$/)
  if (match) {
    const [, _absoluteStart, firstNumber, _absoluteEnd, lastNumber] = match
    if (!firstNumber || !lastNumber) return null
    return [
      [0, parseInt(firstNumber) - 1],
      [config.width - 1, parseInt(lastNumber) - 1],
    ]
  } else {
    return null
  }
}

function textToColSelection(text: string, config: SheetDimensions): CellPosition[] | null {
  const match = text.match(/^(\$)?([a-zA-Z]+):(\$)?([a-zA-Z]+)$/)
  if (match) {
    const [, _absStart, firstCol, _absEnd, lastCol] = match
    if (!firstCol || !lastCol) return null
    return [
      [convertLetterToNumber(firstCol), 0],
      [convertLetterToNumber(lastCol), config.height - 1],
    ]
  } else {
    return null
  }
}

export function parseCellReference(reference: string, sheetDims: SheetDimensions): CellPosition[] | null {
  try {
    const rowSel = textToRowSelection(reference, sheetDims)
    if (rowSel) return rowSel
    const colSel = textToColSelection(reference, sheetDims)
    if (colSel) return colSel
    if (reference.indexOf(":") !== -1) {
      const split = reference.split(":") as [string, string]

      return [textToCellPosition(split[0]), textToCellPosition(split[1])]
    } else return [textToCellPosition(reference)]
  } catch (e) {
    return null
  }
}
