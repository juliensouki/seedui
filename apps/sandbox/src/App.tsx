import { FunctionComponent, useState } from 'react';
import { colors, ThemeProvider, Mode, Stepper } from '@seedui-react/seedui';

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
        <div style={{ border: '1px solid grey', margin: 'auto', width: 500 }}>
          <Stepper steps={['Intro', 'Details', 'Overview', 'Confirmation']} activeStep={2} />
        </div>
      </ThemeProvider>
    </div>
  );
};
