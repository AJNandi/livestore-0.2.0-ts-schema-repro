import RBush, { BBox } from "rbush"
import invariant from "tiny-invariant"
import { v4 as uuid } from "uuid"
import { RawCellContent } from ".."

interface RegionEntry extends BBox {
  empty: boolean
  id: string
}

export class RegionRTree {
  private tree = new RBush<RegionEntry>()

  tempRegions: RegionEntry[] = []

  constructor(
    row: boolean[],
    public length: number,
    private readonly axis: "row" | "col"
  ) {
    let currentCount = 0
    let currentValueIsEmpty = !row[0]

    row.forEach((value, index) => {
      const isEmpty = !value
      if (isEmpty === currentValueIsEmpty) {
        currentCount++
      } else {
        this.addRegion(index - currentCount, index - 1, currentValueIsEmpty)
        currentValueIsEmpty = isEmpty
        currentCount = 1
      }
    })

    // Push the count of the last consecutive sequence
    if (currentValueIsEmpty && this.length > row.length) {
      this.addRegion(row.length - currentCount, this.length - 1, true)
    } else {
      this.addRegion(Math.max(row.length - currentCount, 0), Math.max(0, row.length - 1), currentValueIsEmpty)
      // Fill the remainder of the total length with empty
      if (row.length < this.length) {
        this.addRegion(row.length, this.length - 1, true)
      }
    }

    this.loadRegions()
  }

  addRegion(startIndex: number, endIndex: number, empty: boolean, id: string = uuid()) {
    invariant(startIndex > -1, "start index cannot be negative")
    invariant(endIndex > -1, "end index cannot be negative")
    invariant(endIndex >= startIndex, `end index [${endIndex}] must be greater or equal to start index [${startIndex}]`)

    this.tempRegions.push({
      minX: 0,
      maxX: 0,
      minY: startIndex,
      maxY: endIndex,
      empty,
      id,
    })
  }

  loadRegions() {
    this.tree.load(this.tempRegions)
    this.tempRegions = []
  }

  removeRegion(region: RegionEntry) {
    this.tree.remove(region, (a, b) => a.id === b.id)
  }

  updateValue(index: number, value: RawCellContent) {
    const isEmpty = value === "" || value === null || value === undefined
    const box = this.getRegion(index)
    if (box.empty === isEmpty) return

    const indexMinus1 = Math.max(index - 1, 0)
    const inIndexPlus1 = Math.min(index + 1, this.length - 1)

    const indexAbove = this.getRegion(indexMinus1)
    const indexBelow = this.getRegion(inIndexPlus1)

    // Updating a value at index not on box border
    // We need to split the main box into 3 parts with the new value in the middle
    if (indexAbove.id === box.id && indexBelow.id === box.id) {
      // Do not add boxes if the index is at the bounds
      if (index > 0) this.addRegion(box.minY, indexMinus1, box.empty)
      this.addRegion(index, index, isEmpty)
      if (index < this.length - 1) this.addRegion(inIndexPlus1, box.maxY, box.empty)
      this.removeRegion(box)

      // We're inserting a value in between two matching boxes
      // We need to join this new value with the box above and below
    } else if (indexAbove.id !== box.id && indexBelow.id !== box.id) {
      invariant(indexAbove.empty === isEmpty && isEmpty === indexBelow.empty, "When joining three regions, they all must share the same empty value.")
      this.addRegion(indexAbove.minY, indexBelow.maxY, isEmpty)
      this.removeRegion(indexAbove)
      this.removeRegion(indexBelow)
      this.removeRegion(box)

      // We're inserting a value on the top of its box
      // We need to join this new value with the box above
    } else if (indexAbove.id !== box.id && indexBelow.id === box.id) {
      invariant(indexAbove.empty === isEmpty, "Merging regions must share same value")
      this.addRegion(indexAbove.minY, index, isEmpty, indexAbove.id)
      this.addRegion(inIndexPlus1, box.maxY, box.empty, box.id)
      this.removeRegion(box)
      this.removeRegion(indexAbove)

      // We're inserting a value on the bottom of its box
      // We need to join this new value with the box below
    } else if (indexAbove.id === box.id && indexBelow.id !== box.id) {
      invariant(indexBelow.empty === isEmpty, "Merging regions must share same value")
      this.addRegion(index, indexBelow.maxY, isEmpty, indexBelow.id)
      this.addRegion(box.minY, indexMinus1, box.empty, box.id)
      this.removeRegion(box)
      this.removeRegion(indexBelow)
    } else {
      throw new Error("Case not handled yet")
    }

    this.loadRegions()
  }

  get entries() {
    return this.tree.all()
  }

  get size() {
    return this.entries.length
  }

  getRegion(index: number): RegionEntry {
    const search = this.tree.search({ minX: 0, maxX: 0, minY: index, maxY: index })
    invariant(
      search.length === 1,
      `Sheet Region Map must always have 1 value at any index. Found ${search.length} at index ${index}, axis: ${this.axis}`
    )
    return search[0]!
  }

  getIndexOfContentBoundaryBefore(index: number): number {
    const currentRegion = this.getRegion(index)
    if (index === currentRegion.minY && !currentRegion.empty) {
      const nextRegion = this.getRegion(Math.max(currentRegion.minY - 1, 0))
      return Math.max(nextRegion.minY - 1, 0)
    }
    if (currentRegion.empty && index > 0) {
      const nextRegion = this.getRegion(Math.max(currentRegion.minY - 1, 0))
      if (nextRegion.id === currentRegion.id) return currentRegion.minY
      return nextRegion.maxY
    }
    return currentRegion.minY
  }

  getIndexOfContentBoundaryAfter(index: number): number {
    const currentRegion = this.getRegion(index)
    if (index === currentRegion.maxY && !currentRegion.empty) {
      const nextRegion = this.getRegion(Math.min(currentRegion.maxY + 1, this.length - 1))
      return Math.min(nextRegion.maxY + 1, this.length - 1)
    }
    if (currentRegion.empty && index < this.length - 1) {
      const nextRegion = this.getRegion(Math.min(currentRegion.maxY + 1, this.length - 1))
      if (nextRegion.id === currentRegion.id) return currentRegion.maxY
      return nextRegion.minY
    }
    return currentRegion.maxY
  }
}
