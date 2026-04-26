# <picture><source media="(prefers-color-scheme: dark)" srcset="./apps/docs/public/logo-white.svg" /><img src="./apps/docs/public/logo-black.svg" width="28" alt="" align="absmiddle" style="vertical-align: -4px" /></picture> &nbsp;seedui

A React component library and design system. I built it for my own side projects, and I'm sharing it so anyone can use it in theirs.

This repository contains everything related to seedui:

- The published library, [`@juliensouki/seedui`](./packages/seedui), under [`packages/seedui`](./packages/seedui).
- The documentation website at [seedui.dev](https://seedui.dev), under [`apps/docs`](./apps/docs).

## Installation

```bash
yarn add @juliensouki/seedui styled-components
# or
npm install @juliensouki/seedui styled-components
```

## Why seedui

- **Open source.** Free to use, MIT licensed. Feature requests and pull requests welcome.
- **AI-friendly docs.** Every page is server-rendered so coding assistants can read them directly.
- **Dark mode.** Built in. Every component adapts automatically.
- **Design tokens.** Colors, spacing, typography, radii, and shadows exposed as theme tokens.
- **Fully customizable.** Any token or component style can be overridden through the theme.
- **Designed in Figma.** Every component has a matching Figma design.

## Components

- **Buttons** ([Button](./packages/seedui/src/components/Button/Button/Button.tsx), [IconButton](./packages/seedui/src/components/Button/IconButton/IconButton.tsx))
- **Inputs** ([Input](./packages/seedui/src/components/Input/Input.tsx), [SearchBar](./packages/seedui/src/components/SearchBar/SearchBar.tsx), [Select](./packages/seedui/src/components/Select/Select.tsx), [TagSelector](./packages/seedui/src/components/TagSelector/TagSelector.tsx), [Textarea](./packages/seedui/src/components/Textarea/Textarea.tsx), [Toggle](./packages/seedui/src/components/Toggle/Toggle.tsx))
- **Data Display** ([Avatar](./packages/seedui/src/components/Avatar/Avatar.tsx), [AvatarStack](./packages/seedui/src/components/AvatarStack/AvatarStack.tsx), [ProgressBar](./packages/seedui/src/components/ProgressBar/ProgressBar.tsx), [Skeleton](./packages/seedui/src/components/Skeleton/Skeleton.tsx), [Stepper](./packages/seedui/src/components/Stepper/Stepper.tsx), [Tag](./packages/seedui/src/components/Tag/Tag.tsx), [Text](./packages/seedui/src/components/Text/Text.tsx))
- **Layout** ([Card](./packages/seedui/src/components/Card/Card.tsx), [Divider](./packages/seedui/src/components/Divider/Divider.tsx))
- **Overlays** ([Modal](./packages/seedui/src/components/Modal/Modal.tsx), [Popover](./packages/seedui/src/components/Popover/Popover.tsx), [Tooltip](./packages/seedui/src/components/Tooltip/Tooltip.tsx))

## Technologies

### Library (`packages/seedui`)

- [React](https://react.dev) `^18.2.0`. Component runtime (peer dependency).
- [styled-components](https://styled-components.com) `^6.1`. All styling and theming (peer dependency).
- [@ctrl/tinycolor](https://github.com/scttcper/tinycolor) `^4.1`. Color manipulation helpers used by the theme engine.
- [Vite](https://vite.dev) `^5`. Bundler for the library build.

### Docs site (`apps/docs`, [seedui.dev](https://seedui.dev))

Built with [Astro](https://astro.build) and deployed on [Render](https://render.com) (auto-redeploys on every push to `main`). Live code previews use:

- [react-live](https://github.com/FormidableLabs/react-live). JSX interpreter that evaluates and renders samples in real time.
- [react-simple-code-editor](https://github.com/react-simple-code-editor/react-simple-code-editor). Editable code view inside each playground.
- [Shiki](https://shiki.matsu.io). Syntax highlighting in the editor.
- [prism-react-renderer](https://github.com/FormidableLabs/prism-react-renderer). Syntax highlighting for read-only code blocks.

## Quick start

```tsx
import { ThemeProvider, Button } from '@juliensouki/seedui';

function App() {
  return (
    <ThemeProvider mode="light">
      <Button onClick={() => alert('Hello')}>Click me</Button>
    </ThemeProvider>
  );
}
```

See [`packages/seedui/README.md`](./packages/seedui/README.md) for the full install guide (fonts, peer dependencies, styled-components setup), and [seedui.dev](https://seedui.dev) for component usage, theming, and live examples.

## Development

```bash
yarn install                    # install all workspaces
yarn dev:package:seedui         # build library in watch mode
yarn dev:app:docs               # run the docs site
yarn lint                       # lint all workspaces
```

## Contributing

This is the very beginning of seedui. I'm more than happy to receive feedback, pull requests, or feature requests. Anything that helps it grow in a useful direction is welcome.

- Open an issue for bugs or feature ideas: https://github.com/juliensouki/seedui/issues
- Send a pull request: https://github.com/juliensouki/seedui/pulls
- Read the full contributor guide: [CONTRIBUTING.md](./CONTRIBUTING.md)

## Contact

Maintained by Julien Souki-Léon ([julien.soukileon@gmail.com](mailto:julien.soukileon@gmail.com)). Happy to chat or answer any questions you might have.

## License

[MIT](./LICENSE)
