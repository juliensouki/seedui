import { FunctionComponent, useState } from 'react';
import { colors, ThemeProvider, Mode, Card, Text } from '@seedui-react/seedui';

import './style.css';
import '@fontsource/poppins';
import '@fontsource-variable/inter';

export const App: FunctionComponent = () => {
  const [mode, setMode] = useState<Mode>('light');

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
          boxShadow: { light: { 1: 'rgba(0, 0, 0, 0.16) 0px 1px 4px, rgb(51, 51, 51) 0px 0px 0px 3px' } },
        }}
      >
        <button
          style={{ position: 'absolute', top: 30, right: 30 }}
          onClick={() => setMode((currentMode) => (currentMode === 'light' ? 'dark' : 'light'))}
        >
          Switch to {mode === 'light' ? 'dark' : 'light'} mode
        </button>

        <div style={{ display: 'flex', gap: 50, flexDirection: 'row' }}>
          <Card htmlAttributes={{ rootDiv: { style: { padding: 30 } } }}>
            <Text>Hello World !</Text>
          </Card>
        </div>
      </ThemeProvider>
    </div>
  );
};
