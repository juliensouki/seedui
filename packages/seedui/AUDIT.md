# seedui Audit — 2026-03-03

## Bugs

### 1. `joinClasses` called with duplicate arguments — 4 components
- `Tag.tsx:117` — `joinClasses(className, className, ...)`
- `Textarea.tsx:119` — `joinClasses(className, className, ...)`
- `Input.tsx:229` — `joinClasses(className, className, ...)`
- `Tooltip.tsx:200` — `joinClasses(className, className, ...)`

`className` is passed twice in all four. This produces doubled class names in the DOM.

### 2. `TagSelector` references `searchBar` customization key instead of its own
- `TagSelector.tsx:126` reads `customizations?.components?.searchBar?.defaultProps`
- `TagSelector.tsx:162` uses `$customizations={customizations.components?.searchBar}`
- `TagSelector` has no entry in `CustomComponents` type — it borrows SearchBar's config, so consumers can't customize it independently.

### 3. `TagSelector` uses deprecated `onKeyPress`
`onKeyPress` was deprecated in React 17+ and removed in React 19. Should be `onKeyDown`.

---

## Props API Inconsistencies

### 4. `Select` uses a completely different HTML attributes pattern
Every other component uses `htmlAttributes?: { rootDiv?: HTMLAttributes<...> }`. Select uses flat props: `rootContainerProps` and `selectContainerProps`.

### 5. `SelectProps` is never exported
`Select/index.ts` exports `Select` but not `SelectProps`. Consumers can't type their own wrappers.

### 6. `TagSelector` types its props as `any`
```ts
forwardProps?: { labelTextProps?: any }
htmlAttributes?: { rootDiv?: any }
```
Every other component properly types these as `TextPropsAndAttributes` and `HTMLAttributes<HTMLDivElement>`.

### 7. `Toggle` defines `size` as inline string union instead of using `Sizes` type
```ts
size?: 'sm' | 'md' | 'lg'  // Toggle
size?: ButtonSizes           // Button (derived from Sizes)
size?: TagSize               // Tag (derived from Sizes)
```
If `Sizes` ever changes, Toggle won't follow along.

### 8. Components without `htmlAttributes` — no way to pass native HTML attributes
- `SearchBar` — only exposes `className`
- `Stepper` — only exposes `className`
- `Divider` — spreads `...divProps` directly (extends `HTMLAttributes`)
- `Text` — spreads `...allHTMLAttributes` directly (extends `HTMLAttributes`)

Divider and Text use a "spread everything" pattern; SearchBar and Stepper offer almost nothing. Neither matches the `htmlAttributes` pattern used by the rest.

---

## `forwardRef` / `displayName` Inconsistencies

### 9. Three public components skip `forwardRef`
- `Divider` — `React.FC`
- `Select` — `React.FC`
- `ThemeProvider` — `React.FC`

Every other public component uses `forwardRef`.

### 10. Missing `displayName` on public components
- `Divider`
- `ThemeProvider`

These won't show meaningful names in React DevTools.

---

## Export / File Inconsistencies

### 11. Four different export styles across component `index.ts` files
- **Style A** (most): `export { Foo, type FooProps } from './Foo'`
- **Style B** (Button): `export * from './Button'`
- **Style C** (SearchBar): import then re-export — drops the `type` keyword on `SearchBarProps`
- **Style D** (Modal, Toggle): separate `export { X }` and `export type { Y }` lines

### 12. `Stepper/index.tsx` uses `.tsx` extension
Every other barrel file is `.ts`. No JSX exists in this file.

### 13. Stale `Popover2` in `dist/`
`dist/` contains `Popover2/Popover2.d.ts` but there's no corresponding source.

---

## Dark Mode Gaps

### 14. `SearchBar` hardcodes light-mode background
```ts
backgroundColor: theme.colors.neutral.white
```
No dark mode branch. Input and Textarea both do `isLight ? neutral.white : neutral[700]`.

### 15. `TagSelector` has the same problem
Its `InputContainer` also hardcodes `theme.colors.neutral.white`.

---

## Dead / Unused Code

### 16. `IconButton` has three unused state variables
```ts
const [_isFocused, setIsFocused] = useState(false);
const [_isActive, setIsActive] = useState(false);
const [_isClicking, setIsClicking] = useState(false);
```
States are set but never read — leftover scaffolding causing unnecessary re-renders.

### 17. `FocusRing` is dead code
Defined in `_internal/`, never imported by any component, not exported from `components/index.ts`.

---

## Minor / Stylistic

### 18. `Select` customization has double-nested key path
`customizations?.components?.select?.select?.defaultProps` — the only component with nested customization. Every other component is `customizations?.components?.{name}?.defaultProps`.

### 19. Mixed padding notation in `Modal`
- `ModalHeader`: `` padding: `${theme.spacing[200]}px ${theme.spacing[200]}px` `` (template string, redundant repeated value)
- `ModalContent`: `padding: theme.spacing[200]` (raw number, relies on implicit `px`)

The codebase otherwise always uses explicit `${value}px`.

### 20. `Modal` applies `$customizations` to 4 inner styled components
All point to `customizations.components?.modal`. Any custom `styles` override hits Overlay, ModalContainer, ModalHeader, and ModalContent simultaneously. Every other component applies it to just the root element.

### 21. `Loader` uses template literal CSS
Every other component uses object notation. Loader and ExpandArrow are the outliers.

---

## Standardization Recommendations

| Concern | Recommendation |
|---|---|
| HTML attributes API | Adopt `htmlAttributes` pattern everywhere (fix Select, SearchBar, Stepper, Divider, Text) |
| `forwardRef` | Add to Divider, Select |
| `displayName` | Add to Divider, ThemeProvider |
| Export style | Pick one pattern (Style A is cleanest) and use it everywhere |
| Size/Color types | Always derive from shared `Sizes`/`Colors` types |
| Dark mode | Audit every hardcoded color for light/dark branching |
| `any` types | Replace with proper types in TagSelector |
| Customization keys | Give TagSelector its own key, fix Select double-nesting |
