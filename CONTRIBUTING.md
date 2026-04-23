# Contributing to seedui

Thanks for taking the time to contribute. Feature requests, bug reports, and pull requests are all welcome.

## Reporting bugs and requesting features

Open a [GitHub issue](https://github.com/juliensouki/seedui/issues). For bugs, include:

- What you expected to happen
- What actually happened
- A minimal reproduction (a short code snippet or a link to a sandbox)
- Your seedui version, React version, and browser if relevant

For feature requests, describe the use case you are trying to solve. A concrete example helps more than a generic ask.

## Repository layout

This is a yarn workspaces monorepo.

```
packages/seedui     The published library (@seedui-react/seedui)
apps/docs           The documentation site (Astro + React + MDX)
```

## Prerequisites

- Node 18 or later
- Yarn 3 (pinned via `packageManager` in `package.json`; `corepack enable` will pick it up)

## Local setup

```bash
git clone https://github.com/juliensouki/seedui.git
cd seedui
yarn install
```

## Common commands

Run from the repository root:

```bash
yarn dev:package:seedui         # build the library in watch mode
yarn dev:app:docs               # run the docs site locally
yarn build:package:seedui       # production build of the library
yarn build:app:docs             # production build of the docs site
yarn lint                       # lint every workspace
```

The docs site consumes the library via a workspace link, so running `dev:package:seedui` alongside `dev:app:docs` will rebuild the library automatically as you edit it.

## Making changes

### Library code (`packages/seedui`)

- Source lives in `packages/seedui/src/components/<ComponentName>/`.
- Each component is self-contained: component file and types.
- Styling is done with styled-components. Import from `styled-components` inside the library (the `/sc` entry exists for consumers, not for internal code).
- New components need matching documentation in the docs app (see below).

### Documentation (`apps/docs`)

Each component has two files under `apps/docs/src/docs/components/<category>/<kebab-name>/`:

- `data.tsx` — metadata: name, description, props, code examples, anatomy. Export a `*Doc` object of type `ComponentDoc`.
- `<kebab-name>.mdx` — the rendered documentation page. Reads from `data.tsx` and renders sections with `<ComponentPlayground>`.

Code examples in `data.tsx` use a `code` string plus an optional `layout` object for preview styling. Do not embed layout `<div style={{ ... }}>` wrappers inside the code string. See existing components for the pattern.

## Code style

- TypeScript. No `any` unless there is no alternative.
- No unused exports. Do not add new exports to barrel files unless they are meant to be part of the public API.
- Run `yarn lint` before pushing. CI runs the same command.

## Commits and pull requests

- Keep commits focused. Prefer small, reviewable PRs over one large one.
- Open the PR against `main`. Describe what changed and why.
- If the PR changes a component's public API, call it out in the description.

## Questions

If something is unclear, open an issue or a draft PR with your question on the [GitHub repository](https://github.com/juliensouki/seedui). No question is too small.
