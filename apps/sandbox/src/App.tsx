import { FunctionComponent, useState } from 'react';
import { colors, Card, ThemeProvider, Text } from '@seedui/seedui';

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
        <div style={{ width: 400 }}>
          <Card variant="outlined" style={{ minWidth: 200, padding: '8px 12px' }}>
            <Text>Hello World!</Text>
          </Card>
        </div>

        <div style={{ marginTop: 80 }}>
          <Text variant="h1" makeSomeSpace>
            Lorem ipsum et bla bla bla.
          </Text>
          <Text variant="h2" makeSomeSpace>
            Lorem ipsum et bla bla bla.
          </Text>
          <Text variant="h3" makeSomeSpace>
            Lorem ipsum et bla bla bla.
          </Text>
          <Text variant="h4" makeSomeSpace>
            Lorem ipsum et bla bla bla.
          </Text>
          <Text variant="h5" makeSomeSpace>
            Lorem ipsum et bla bla bla.
          </Text>
          <Text variant="h6" makeSomeSpace>
            Lorem ipsum et bla bla bla.
          </Text>
          <Text variant="p" makeSomeSpace>
            Lorem ipsum et bla bla bla.
          </Text>
          <Text variant="caption" makeSomeSpace>
            Lorem ipsum et bla bla bla.
          </Text>
          <Text variant="small" makeSomeSpace>
            Lorem ipsum et bla bla bla.
          </Text>
        </div>
      </ThemeProvider>
    </div>
  );
};
