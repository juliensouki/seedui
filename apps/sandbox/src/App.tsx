import { FunctionComponent, useState } from 'react';
import { colors, ThemeProvider, Mode, SearchBar } from '@seedui-react/seedui';

import './style.css';
import '@fontsource/poppins';
import '@fontsource-variable/inter';

export const App: FunctionComponent = () => {
  const [mode, setMode] = useState<Mode>('light');
  const [value, setValue] = useState<string>('');

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
        <SearchBar value={value} onChange={(e) => setValue(e.target.value)} onSearch={() => console.log('searching')} />
      </ThemeProvider>
    </div>
  );
};
