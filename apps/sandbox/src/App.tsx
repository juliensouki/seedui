import { FunctionComponent, useState } from 'react';
import { colors, ThemeProvider, Mode, Button, Input } from '@seedui-react/seedui';

import './style.css';
import '@fontsource/poppins';
import '@fontsource-variable/inter';

export const App: FunctionComponent = () => {
  const [mode, setMode] = useState<Mode>('light');
  const [value, setValue] = useState<string>('');

  const inputValidation = (value: string): boolean => value.length >= 8;

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
        <div style={{ position: 'absolute', top: 30, right: 30 }}>
          <Button onClick={() => setMode((currentMode) => (currentMode === 'light' ? 'dark' : 'light'))}>
            Switch to {mode === 'light' ? 'dark' : 'light'} mode
          </Button>
        </div>

        <Input
          value={value}
          label="Label"
          placeholder="Enter text..."
          inputValidation={inputValidation}
          onChange={(e) => setValue(e.target.value)}
        />
      </ThemeProvider>
    </div>
  );
};
