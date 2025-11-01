import { FunctionComponent, useState } from 'react';
import { colors, ThemeProvider, Stepper, Mode } from '@seedui-react/seedui';

import './style.css';
import '@fontsource/poppins';
import '@fontsource-variable/inter';

export const App: FunctionComponent = () => {
  const [mode, _setMode] = useState<Mode>('light');

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
        <div style={{ margin: 'auto', maxWidth: 600, width: '100%' }}>
          <Stepper
            steps={[
              'Step 1',
              'Step 2',
              'Step 3',
              'Step 4',
              'Step 5',
              'Step 6',
              'Step 7',
              'Step 8',
              'Step 9',
              'Step 10',
            ]}
            activeStep={2}
          />
        </div>
      </ThemeProvider>
    </div>
  );
};
