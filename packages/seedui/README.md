# <picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/juliensouki/seedui/main/apps/docs/public/logo-white.svg" /><img src="https://raw.githubusercontent.com/juliensouki/seedui/main/apps/docs/public/logo-black.svg" width="28" alt="" align="absmiddle" style="vertical-align: -4px" /></picture> &nbsp;seedui

A React component library and design system. I built it for my own side projects, and I'm sharing it so anyone can use it in theirs.

Full documentation and live examples at [seedui.dev](https://seedui.dev).

## Installation

```bash
yarn add @juliensouki/seedui styled-components
# or
npm install @juliensouki/seedui styled-components
```

### Peer dependencies

seedui requires these to be installed in your app:

- `react ^18.2.0`
- `react-dom ^18.2.0`
- `styled-components ^6.1`

styled-components is a peer dependency (not bundled) so your app and seedui share a single instance. This is required for theming.

### Fonts

The default theme uses **Inter** and **Source Serif 4**. Install them via Fontsource:

```bash
yarn add @fontsource-variable/inter @fontsource-variable/source-serif-4
```

Import them once at the root of your app (e.g. `main.tsx`):

```tsx
import '@fontsource-variable/inter';
import '@fontsource-variable/source-serif-4';
```

If you override typography tokens with your own fonts, you can skip this step.

## Why seedui

- **Open source.** Free to use, MIT licensed. Feature requests and pull requests welcome.
- **AI-friendly docs.** Every page is server-rendered so coding assistants can read them directly.
- **Dark mode.** Built in. Every component adapts automatically.
- **Design tokens.** Colors, spacing, typography, radii, and shadows exposed as theme tokens.
- **Fully customizable.** Any token or component style can be overridden through the theme.
- **Designed in Figma.** Every component has a matching Figma design.

## Components

- **Buttons** ([Button](https://seedui.dev/components/Button), [IconButton](https://seedui.dev/components/IconButton))
- **Inputs** ([Input](https://seedui.dev/components/Input), [SearchBar](https://seedui.dev/components/SearchBar), [Select](https://seedui.dev/components/Select), [TagSelector](https://seedui.dev/components/TagSelector), [Textarea](https://seedui.dev/components/Textarea), [Toggle](https://seedui.dev/components/Toggle))
- **Data Display** ([Avatar](https://seedui.dev/components/Avatar), [AvatarStack](https://seedui.dev/components/AvatarStack), [ProgressBar](https://seedui.dev/components/ProgressBar), [Skeleton](https://seedui.dev/components/Skeleton), [Stepper](https://seedui.dev/components/Stepper), [Tag](https://seedui.dev/components/Tag), [Text](https://seedui.dev/components/Text))
- **Layout** ([Card](https://seedui.dev/components/Card), [Divider](https://seedui.dev/components/Divider))
- **Overlays** ([Modal](https://seedui.dev/components/Modal), [Popover](https://seedui.dev/components/Popover), [Tooltip](https://seedui.dev/components/Tooltip))

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

### Using styled-components

> **Do not import directly from `styled-components`.** Use the re-export from `@juliensouki/seedui/sc` instead. This ensures you share the same styled-components instance as seedui, which is required for theming.

```tsx
import styled, { css, keyframes } from '@juliensouki/seedui/sc';

const Container = styled.div(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: theme.colors.primary[100],
  borderRadius: theme.borderRadius(4),
}));
```

### Using the theme

Read theme values in any component with the `useTheme` hook:

```tsx
import { useTheme } from '@juliensouki/seedui';

function MyComponent() {
  const theme = useTheme();
  return <div style={{ color: theme.colors.primary[600] }}>Themed content</div>;
}
```

Every color, spacing value, radius, and typography style is exposed as a token. Override any of them through the `ThemeProvider` to match your brand or existing design system. See the [theming guide](https://seedui.dev/theming/customization) for the full overview.

## Contributing

This is the very beginning of seedui. I'm more than happy to receive feedback, pull requests, or feature requests. Anything that helps it grow in a useful direction is welcome.

- Open an issue for bugs or feature ideas: https://github.com/juliensouki/seedui/issues
- Send a pull request: https://github.com/juliensouki/seedui/pulls
- Read the full contributor guide: [CONTRIBUTING.md](https://github.com/juliensouki/seedui/blob/main/CONTRIBUTING.md)

## Contact

Maintained by Julien Souki-Léon ([julien.soukileon@gmail.com](mailto:julien.soukileon@gmail.com)). Happy to chat or answer any questions you might have.

## License

[MIT](https://github.com/juliensouki/seedui/blob/main/LICENSE)
