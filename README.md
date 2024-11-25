# Subset Monorepo

## What's inside?

This repo includes the following packages/apps:

### Apps and Packages

- `apps/web`: A vite react app for subset's main web client

- `packages/eslint-config`: `eslint` configurations
- `packages/file-explorer`: Main react component library for file explorer
- `packages/shared`: Shared classes, types, and other misc utils
- `packages/typescript-config`: `tsconfig.json`s used throughout the monorepo

###  To run the app

First install node mods. Then build the wasm lib for the spreadsheet. Then start vite.

```
pnpm i
pnpm run web
```

App will be hosted at http://localhost:5173/


# Error Reproduction

After installing livestore 0.2.0, I'm getting type errors in a few places: 

- Any table in the schema
 `packages/livestore/src/schema.ts`


```ts
const file = DbSchema.table(
  "file",
  {
    id: DbSchema.text({ primaryKey: true }),
    ...
```


```
The inferred type of 'file' cannot be named without a reference to '.pnpm/@livestore+db-schema@0.2.0_effect@3.10.12/node_modules/@livestore/db-schema/dist/ast/sqlite'. This is likely not portable. A type annotation is necessary.
```



- Using a useRow query `packages/livestore/src/queries.ts`



```
The inferred type of 'useClientState' cannot be named without a reference to '.pnpm/@livestore+db-schema@0.2.0_effect@3.10.12/node_modules/@livestore/db-schema/dist/ast/sqlite'. This is likely not portable. A type annotation is necessary.
```

Note: Not quite finished porting over useRow queries. 