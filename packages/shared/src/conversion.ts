import { CellPosition } from "./types"

export function convertNumberToLetter(index: number) {
  return String.fromCodePoint(index + 65)
}

export function convertLetterToNumber(letter: string) {
  let result = 0

  for (let i = 0; i < letter.length; i++) {
    const char = letter.charAt(i)
    const charCode = char.charCodeAt(0) - "A".charCodeAt(0) + 1
    result = result * 26 + charCode
  }

  return result - 1
}

// export function convertLetterToNumber(letter: string) {
//   return (letter.codePointAt(0) ?? 0) - 65
// }

export function convertNumberToRow(row: number) {
  return row + 1
}

export function convertNumberToCol(col: number) {
  let result = ""

  while (col >= 0) {
    result = String.fromCharCode((col % 26) + 97) + result
    col = Math.floor(col / 26) - 1
  }

  return result.toUpperCase()
}

export function posToLetter(pos: CellPosition): string {
  return `${convertNumberToCol(pos[0])}${convertNumberToRow(pos[1])}`
}
