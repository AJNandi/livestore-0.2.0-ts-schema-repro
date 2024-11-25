import { queryDb, SessionIdSymbol, sql } from "@livestore/livestore"
import { useQuery, useRow, useScopedQuery, useStore } from "@livestore/react"
import { Schema } from "effect"
import { clientStateTable, tables } from "./schema"
import { DbSchema as __DbSchema } from "@livestore/common/schema"

export const useClientState = () => {
  return useRow(clientStateTable, SessionIdSymbol)
}

const activeUserId$ = queryDb(tables.clientState.query.row(SessionIdSymbol), {
  map: (_: any) => _.activeUserId,
  label: "activeWorkspaceQuery",
})

const activeWorkspaceId$ = queryDb(tables.clientState.query.row(SessionIdSymbol), {
  map: (_: any) => _.activeWorkspaceId,
  label: "activeWorkspaceId",
})

export const userWorkspaceIds$ = queryDb(
  (get) => tables.workspaceMembership.query.select("workspaceId", { pluck: true }).where({ userId: get(activeUserId$) }),
  {
    label: "userWorkspaceIds",
  }
)
export const userWorkspaceFileIds$ = queryDb(
  (get) => tables.fileMembership.query.select("fileId", { pluck: true }).where({ workspaceId: get(activeUserId$) }),
  {
    label: "userWorkspaceFileIds",
  }
)

export const useFoldersInFolder = (folderId: string): readonly string[] => {
  return useScopedQuery(
    () => queryDb(tables.folder.query.select("id", { pluck: true }).where({ parentFolderId: folderId }).orderBy("name", "desc")),
    [folderId]
  )
}

export const useFilesInFolder = (folderId: string): readonly string[] => {
  return useScopedQuery(() => queryDb(tables.file.query.select("id", { pluck: true }).where({ folderId }).orderBy("name", "desc")), [folderId])
}

export const personalRootFolderId$ = queryDb(
  (get) => ({
    query: sql`
    SELECT fm.folderId 
    FROM folderMembership fm 
    JOIN folder f ON fm.folderId = f.id 
    WHERE fm.workspaceId = '${get(activeWorkspaceId$)}' 
    AND f.rootUserId = '${get(activeUserId$)}'
    LIMIT 1`,
    schema: Schema.Array(Schema.Struct({ folderId: Schema.String }).pipe(Schema.pluck("folderId"))),
  }),
  {
    label: "userPersonalRootFolder",
  }
)

export const usePersonalFolderId = () => {
  const personalRootFolderId = useQuery(personalRootFolderId$)
  return personalRootFolderId[0]
}

export const userFavorites$ = queryDb(
  (get) => tables.favorite.query.select().where({ userId: get(activeUserId$), workspaceId: get(activeWorkspaceId$) }),
  {
    label: "userFavorites",
  }
)
