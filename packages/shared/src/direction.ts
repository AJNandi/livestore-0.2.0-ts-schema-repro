import { Direction } from "./types"

export const isHorizontal = (direction: Direction) => direction === Direction.Left || direction === Direction.Right
export const isVertical = (direction: Direction) => direction === Direction.Up || direction === Direction.Down
