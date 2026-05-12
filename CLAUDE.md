# CLAUDE.md

## Project context

This is a Next.js app using TypeScript, React, Drizzle, PostgreSQL, MUI, Tailwind, and map-related UI.

## Commands

- npm run dev
- npm run build
- npm run lint
- npm run typecheck
- npm run db:seed

## Development preferences

- Keep changes minimal, focused, and reviewable.
- Do not rewrite, rename, reformat, or refactor unrelated code.
- Preserve the existing style, structure, and visual design unless asked otherwise.
- Prefer simple, explicit code over clever abstractions.
- Use existing project patterns before introducing new ones.
- Ask before adding dependencies.
- Ask before changing database schemas, migrations, auth, API contracts, `.env`, deployment config, or destructive commands.
- Prefer type-safe TypeScript; avoid `any` unless clearly justified.
- Do not silence TypeScript or lint errors without explaining the underlying cause.
- Explain the cause before the fix when debugging.
- Explain trade-offs briefly when more than one approach is reasonable.
- Add comments only for intent, constraints, or non-obvious behaviour.

## React / Next.js preferences

- Be explicit about client/server boundaries.
- Keep Leaflet/browser-only code out of server components and server utilities.
- Use plain serialisable types across server/client boundaries.
- Prefer `{ lat: number; lng: number }` or tuple types over Leaflet classes in shared/server code.
- Avoid unnecessary state and effects.
- Keep components small, but do not over-split prematurely.
- Prefer dumb/presentational components where practical.
- Keep business logic out of UI components where practical.

## Project structure preferences

- Keep map domain logic separate from interface, modal, menu, and tool components.
- Keep menu/tool UI separate from map rendering logic.
- Keep modal components together under the interface area.
- Prefer central shared types where they are used across multiple features.
- Avoid coupling Trips, Paths, and Sites UI too tightly unless the data relationship requires it.

## Database preferences

- Keep Drizzle schema, relations, migrations, and seed logic consistent.
- Prefer clear schema relationships and predictable seed data.
- Do not change schemas or migrations without explaining the impact first.
- Do not run destructive database commands unless explicitly asked.

## AI editing rules

- First identify the smallest correct change.
- Check existing files before assuming structure.
- Never fabricate APIs, props, package names, imports, or file paths.
- Do not create files unless they are needed.
- Do not remove code because it appears unused unless verified.
- Avoid placeholder code unless clearly marked.
- Make one focused patch rather than several speculative changes.
- After changes, mention anything that should be tested manually.
