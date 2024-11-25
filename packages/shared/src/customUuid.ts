import { v4 as random, v5 as hash } from "uuid"

/**
 * Extends uuid function to allow for setting a seed value.
 * https://github.com/automerge/automerge/blob/main/src/uuid.js
 * https://github.com/automerge/automerge/blob/main/test/uuid_test.js
 */

let getUUID: string | (() => string) = random

const customUuid = () => (getUUID instanceof Function ? getUUID() : getUUID)

// eslint-disable-next-line
customUuid.seed = (seed?: typeof getUUID) => void (getUUID = seed ?? random)
customUuid.random = random

const getHashedColId = ({ sheet, order }: { sheet: string; order: string }) => hash(`col:${sheet}:${order}`, customUuid())

const getHashedRowId = ({ sheet, order }: { sheet: string; order: string }) => hash(`row:${sheet}:${order}`, customUuid())

const getHashedCellId = ({ colId, rowId }: { colId: string; rowId: string }) => hash(`cell:${colId}:${rowId}`, customUuid())

export { customUuid, getHashedColId, getHashedRowId, getHashedCellId }
