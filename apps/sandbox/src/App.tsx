import { FunctionComponent, useState } from 'react';
import { colors, ThemeProvider, Tooltip } from '@seedui/seedui';

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

        <div style={{ padding: 300 }}>
          <Tooltip text="This button is disabled." direction="bottom">
            <button disabled>Hover Me</button>
          </Tooltip>
        </div>
      </ThemeProvider>
    </div>
  );
};

// Fix all warnings in the console
