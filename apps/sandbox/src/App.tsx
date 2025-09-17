import { FunctionComponent, useState } from 'react';
import { colors, ThemeProvider, Mode, Button } from '@seedui-react/seedui';

import './style.css';
import '@fontsource/poppins';
import '@fontsource-variable/inter';

export const App: FunctionComponent = () => {
  const [mode, setMode] = useState<Mode>('light');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleClick = () => {
    setIsLoading((value) => {
      if (value) {
        return value;
      }
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
      return true;
    });
  };

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

        <Button isLoading={isLoading} onClick={handleClick}>
          My Button
        </Button>
      </ThemeProvider>
    </div>
  );
};
