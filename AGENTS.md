# Repository Guidelines

## Project Structure & Module Organization
This is an Expo + React Native + TypeScript app. Application code lives in `src/`.

- `src/Screens/` contains route-level screens such as `Main`, `Login`, and `Debt`.
- `src/Features/` contains feature-focused UI and logic such as `Overview` and `DebtOverview`.
- `src/Widgets/` contains reusable composed UI blocks such as `DebtCard`.
- `src/Shared/` contains shared API clients, config, styles, and domain types.
- `src/Store/` contains Redux Toolkit setup, RTK Query APIs, selectors, and auth storage.
- `assets/` stores static files such as `background.jpg`.

Prefer keeping non-UI business logic outside widgets, for example in `src/entities/` or `src/Shared/`.

## Build, Test, and Development Commands
- `npm install` installs dependencies.
- `npm run start` starts the Expo dev server.
- `npm run android` launches the app on Android.
- `npm run ios` launches the app on iOS.
- `npm run web` launches the web build.
- `npm run start:clear` clears Metro cache before starting.
- `npx tsc --noEmit -p tsconfig.json` runs a TypeScript-only validation pass.

## Coding Style & Naming Conventions
Use TypeScript for all new code. Follow the existing style:

- 2-space indentation is not enforced; match the file’s current formatting and keep it consistent.
- Use `PascalCase` for components and screen folders: `DebtCard`, `DebtOverview`.
- Use `camelCase` for variables, functions, and hooks.
- Keep types in `src/Shared/Types/` unless they are feature-specific.
- Use Prettier-compatible formatting. If you reformat, keep diffs narrow.

## Testing Guidelines
There is currently no dedicated test framework configured in this repository. Until one is added:

- validate changes with `npx tsc --noEmit -p tsconfig.json`
- manually verify key flows in Expo (`login`, `overview`, `debt details`)
- when adding tests later, colocate them near the feature as `*.test.ts` or `*.test.tsx`

## Commit & Pull Request Guidelines
This branch currently has no commit history, so use a simple conventional format:

- `feat: add debt detail navigation`
- `fix: handle missing dueDate in debt cards`

PRs should include a short description, affected screens/features, manual test notes, and screenshots for UI changes.

## Security & Configuration Tips
Do not commit real secrets. Keep environment examples in `.env.example`, and route all network access through the shared API layer in `src/Shared/Api/`.
