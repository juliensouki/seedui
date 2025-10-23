import { FunctionComponent, useState } from 'react';
import { colors, ThemeProvider, Mode, TagSelector, SearchBar } from '@seedui-react/seedui';

import './style.css';
import '@fontsource/poppins';
import '@fontsource-variable/inter';

export const App: FunctionComponent = () => {
  const [mode, _setMode] = useState<Mode>('light');
  const [tags, setTags] = useState<string[]>(['Tag 1', 'Tag 2', 'Tag 3']);

  return (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: mode === 'light' ? colors.light.semantic.neutral[100] : colors.dark.semantic.neutral[900],
        padding: 20,
        boxSizing: 'border-box',
      }}
    >
      <ThemeProvider
        mode={mode}
        theme={{
          typography: { p: { responsive: { desktop: { fontSize: 14 } } } },
        }}
      >
        <div style={{ margin: 'auto', width: 600 }}>
          <TagSelector
            tags={tags}
            onAddTag={(tag) => setTags([...tags, tag])}
            onRemoveTag={(tag) => setTags(tags.filter((t) => t !== tag))}
          />
        </div>
      </ThemeProvider>
    </div>
  );
};
