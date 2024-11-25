# Subset Monorepo

## What's inside?

This repo includes the following packages/apps:

### Apps and Packages

- `apps/api`: An express api for auth and other misc backend items
- `apps/desktop-playground`: A tauri app for for just subset's editor
- `apps/jamsocket`: Multiplayer sync service
- `apps/landing`: Nextjs subset public landing page
- `apps/playground`: A vite react app for just subset's editor
- `apps/tauri-app`: A tauri app for subset's main desktop client
- `apps/web`: A vite react app for subset's main web client

- `packages/cell-value-parser`: Helps parse dates and datetimes for importing in the import web worker (not used currently)
- `packages/editor`: Main spreadsheet editor component
- `packages/eslint-config`: `eslint` configurations
- `packages/file-explorer`: Main react component library for file explorer
- `packages/instantdb`: Instantdb client, queries, and mutations
- `packages/jazz`: Jazz schema and mutations
- `packages/lezer-spreadsheet`: CodeMirror plugin for spreadsheet text editor
- `packages/shared`: Shared classes, types, and other misc utils
- `packages/subset`: Core spreadsheet state
- `packages/typescript-config`: `tsconfig.json`s used throughout the monorepo

- `crates/sheetgraph`: Core calc engine + CRDT



# Running web app locally

If you don't have wasm-pack installed you can install it using
```
cargo install wasm-pack
```

or from this url
https://rustwasm.github.io/wasm-pack/installer/


### Required ENV vars

Include it in the app directory at `apps/web/.env.local`

```
VITE_SUBSET_API_URL=https://subset-web-api-2.onrender.com
```

###  To run the app

First install node mods. Then build the wasm lib for the spreadsheet. Then start vite.

```
pnpm i
pnpm run wasm
pnpm run web
```

App will be hosted at http://localhost:5173/
