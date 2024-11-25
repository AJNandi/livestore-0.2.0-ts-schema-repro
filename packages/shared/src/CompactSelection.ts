import { Slice } from "./selection"

export type CompactSelectionRanges = readonly Slice[]

let emptyCompactSelection: CompactSelection | undefined

export class CompactSelection {
  // Glide doesn't export this constructor so that it can guarantee compactness of selection
  // eslint-disable-next-line no-useless-constructor, no-empty-function
  constructor(readonly items: CompactSelectionRanges) {}

  static empty = (): CompactSelection => {
    // eslint-disable-next-line no-return-assign
    return emptyCompactSelection ?? (emptyCompactSelection = new CompactSelection([]))
  }

  static fromSingleSelection = (selection: number | Slice) => {
    return CompactSelection.empty().add(selection)
  }

  offset = (amount: number): CompactSelection => {
    if (amount === 0) return this
    const newItems = this.items.map((x) => [x[0] + amount, x[1] + amount] as Slice)
    return new CompactSelection(newItems)
  }

  add = (selection: number | Slice): CompactSelection => {
    const slice: Slice = typeof selection === "number" ? [selection, selection + 1] : selection

    const newItems = mergeRanges([...this.items, slice])

    return new CompactSelection(newItems)
  }

  remove = (selection: number | Slice): CompactSelection => {
    const items = [...this.items]

    const selMin = typeof selection === "number" ? selection : selection[0]
    const selMax = typeof selection === "number" ? selection + 1 : selection[1]

    for (const [i, slice] of items.entries()) {
      const [start, end] = slice
      // Remove part of slice that intersects removed selection.
      if (start <= selMax && selMin <= end) {
        const toAdd: Slice[] = []
        if (start < selMin) {
          toAdd.push([start, selMin])
        }
        if (selMax < end) {
          toAdd.push([selMax, end])
        }
        items.splice(i, 1, ...toAdd)
      }
    }
    return new CompactSelection(items)
  }

  first = (): number | undefined => {
    if (this.items.length === 0) return undefined
    // @ts-ignore
    return this.items[0][0]
  }

  last = (): number | undefined => {
    if (this.items.length === 0) return undefined
    // @ts-ignore
    return this.items.slice(-1)[0][1] - 1
  }

  hasIndex = (index: number): boolean => {
    for (let i = 0; i < this.items.length; i++) {
      // @ts-ignore
      const [start, end] = this.items[i]
      if (index >= start && index < end) {
        return true
      }
    }
    return false
  }

  hasAll = (index: Slice): boolean => {
    for (let x = index[0]; x < index[1]; x++) {
      if (!this.hasIndex(x)) return false
    }
    return true
  }

  some = (predicate: (index: number) => boolean): boolean => {
    for (const i of this) {
      if (predicate(i)) return true
    }
    return false
  }

  equals = (other: CompactSelection): boolean => {
    if (other === this) return true

    if (other.items.length !== this.items.length) return false

    for (let i = 0; i < this.items.length; i++) {
      const left = other.items[i]
      const right = this.items[i]
      // @ts-ignore
      if (left[0] !== right[0] || left[1] !== right[1]) return false
    }

    return true
  }

  // Really old JS wont have access to the iterator and babel will stop people using it
  // when trying to support browsers so old we don't support them anyway. What goes on
  // between an engineer and their bundler in the privacy of their CI server is none of
  // my business anyway.
  toArray = (): number[] => {
    const result: number[] = []
    for (const [start, end] of this.items) {
      for (let x = start; x < end; x++) {
        result.push(x)
      }
    }
    return result
  }

  get length(): number {
    let len = 0
    for (const [start, end] of this.items) {
      len += end - start
    }

    return len
  }

  *[Symbol.iterator]() {
    for (const [start, end] of this.items) {
      for (let x = start; x < end; x++) {
        yield x
      }
    }
  }
}

function mergeRanges(input: CompactSelectionRanges) {
  if (input.length === 0) {
    return []
  }
  const ranges = [...input]

  const stack: [number, number][] = []

  // eslint-disable-next-line func-names
  ranges.sort(function (a, b) {
    return a[0] - b[0]
  })

  // @ts-ignore
  stack.push([...ranges[0]])

  for (const range of ranges.slice(1)) {
    const top = stack[stack.length - 1]

    // @ts-ignore
    if (top[1] < range[0]) {
      stack.push([...range])
      // @ts-ignore
    } else if (top[1] < range[1]) {
      // @ts-ignore
      // eslint-disable-next-line prefer-destructuring
      top[1] = range[1]
    }
  }

  return stack
}
