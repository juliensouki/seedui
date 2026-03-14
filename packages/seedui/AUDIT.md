# seedui Audit — 2026-03-15

## Bugs

### 1. Custom theme colors ignore dark mode
`theme-service.ts:116` — `generateCustomColors` is called without the `mode` parameter, so custom color overrides always resolve against light mode tokens. The `boxShadow` call on line 115 correctly passes `mode`.

### 2. ResizeObserver memory leak in Tooltip
`Tooltip.tsx:179-183` — Two `ResizeObserver` instances are created every time the effect runs but never disconnected. The `useEffect` has no cleanup return, so observers leak on every re-render triggered by `direction` or `text` changes.

### 3. `setDefaultColors` mutates its input
`color-service.ts:36-41` — Directly mutates `colors[color].default = values[600]` on the passed-in object. If the same semantic colors object is reused elsewhere (e.g. cached default themes), the mutation bleeds across.

### 4. `as any` casts on DOM event listeners
`Modal.tsx:198` and `Popover.tsx:242,263` — React's `KeyboardEvent` is cast to `any` to satisfy `addEventListener`. Should use the global DOM `KeyboardEvent` type instead.

### 5. Variable shadow in `joinClasses`
`classes.ts:2` — The `.filter((classes) => ...)` callback parameter shadows the outer `classes` rest parameter. Not breaking, but confusing and should be renamed.

---

## Type Issues

### 6. Text `forwardedRef` type mismatch
`Text.tsx:77-80` — The outer generic declares `forwardRef<HTMLParagraphElement, ...>` but the inner callback types it as `ForwardedRef<HTMLDivElement>`.

### 7. Divider doesn't use `getDefaultProps`
`Divider.tsx:79` — Only component that uses manual default parameter syntax instead of `getDefaultProps`. This means global customization `defaultProps` for Divider are silently ignored.

---

## Accessibility

### 8. Divider lacks `role="separator"`
Renders plain `<div>` elements. Should use `role="separator"` (or `<hr>`) for screen readers.

### 9. SearchBar icon has no accessible label
`SearchBar.tsx:115-128` — The search icon SVG has no `aria-label` or `role="img"` with a title, making it invisible to screen readers.

### 10. ProgressBar missing `aria-label`
`ProgressBar.tsx:115-118` — Has `role="progressbar"` and `aria-valuenow`, but no `aria-label` or `aria-labelledby` to identify what it represents.

---

## Consistency

### 11. Divider still uses spread-everything pattern
Every other component uses `elementProps` for inner element access. Divider extends `HTMLAttributes` and spreads `...divProps`. This is the only component with this pattern.

### 12. Token export style mismatch
`tokens/colors/*/primitives/` — `white.ts` and `black.ts` use `export default`, while all other color files use named `export const`. Inconsistent across both light and dark token sets.

### 13. `SelectMenu` not wrapped with `applyCustomStyles`
`Select.tsx:161` — `SelectDiv` and `SelectContainer` are wrapped, but `SelectMenu` is not, so custom `styles` from the customization config won't apply to the dropdown menu.

---

## Minor

### 14. Modal `body.style.overflow` cleanup
`Modal.tsx:204-214` — Always resets `overflow` to `''` on unmount, even if another component (or another Modal) set it. Could stomp on other overflow managers.

### 15. Object spread in loop in `custom-styles.ts`
`utils/custom-styles.ts:19` — `result = { ...result, ...remove$(key, value) }` creates a new object each iteration. Minor performance concern for components with many props.
