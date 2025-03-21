import { FunctionComponent, useState } from 'react';
import { colors, ThemeProvider, Input } from '@seedui/seedui';

import './style.css';
import '@fontsource/poppins';
import '@fontsource-variable/inter';
import { GemIcon } from 'lucide-react';

export const App: FunctionComponent = () => {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
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
      <ThemeProvider mode={mode}>
        <button
          style={{ position: 'absolute', top: 30, right: 30 }}
          onClick={() => setMode((currentMode) => (currentMode === 'light' ? 'dark' : 'light'))}
        >
          Switch to {mode === 'light' ? 'dark' : 'light'} mode
        </button>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <Input
            placeholder="Placeholder"
            label="label"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            inputIcon={{ icon: <GemIcon strokeWidth={1} />, placement: 'left' }}
          />
          <Input placeholder="Placeholder" label="label" value={value} onChange={(e) => setValue(e.target.value)} />
          <Input
            placeholder="Placeholder"
            label="label"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            disabled
          />
        </div>
      </ThemeProvider>
    </div>
  );
};
