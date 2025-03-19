import { FunctionComponent, useState } from 'react';
import { colors, Button, ThemeProvider } from '@seedui/seedui';

import './style.css';
import '@fontsource/poppins';
import '@fontsource-variable/inter';

export const App: FunctionComponent = () => {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

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

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Button variant="filled" color="primary" size="sm">
            Hello World
          </Button>

          <Button variant="filled" color="primary" size="md">
            Hello World
          </Button>

          <Button variant="filled" color="primary" size="lg">
            Hello World
          </Button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 16 }}>
          <Button variant="transparent" color="primary" size="sm">
            Hello World
          </Button>

          <Button variant="transparent" color="primary" size="md">
            Hello World
          </Button>

          <Button variant="transparent" color="primary" size="lg">
            Hello World
          </Button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 16 }}>
          <Button variant="filled" color="secondary" size="sm">
            Hello World
          </Button>

          <Button variant="filled" color="secondary" size="md">
            Hello World
          </Button>

          <Button variant="filled" color="secondary" size="lg">
            Hello World
          </Button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 16 }}>
          <Button variant="transparent" color="secondary" size="sm">
            Hello World
          </Button>

          <Button variant="transparent" color="secondary" size="md">
            Hello World
          </Button>

          <Button variant="transparent" color="secondary" size="lg">
            Hello World
          </Button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 16 }}>
          <Button variant="filled" color="neutral" size="sm">
            Hello World
          </Button>

          <Button variant="filled" color="neutral" size="md">
            Hello World
          </Button>

          <Button variant="filled" color="neutral" size="lg">
            Hello World
          </Button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 16 }}>
          <Button variant="transparent" color="neutral" size="sm">
            Hello World
          </Button>

          <Button variant="transparent" color="neutral" size="md">
            Hello World
          </Button>

          <Button variant="transparent" color="neutral" size="lg">
            Hello World
          </Button>
        </div>
      </ThemeProvider>
    </div>
  );
};
