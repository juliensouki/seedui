import { FunctionComponent, useState } from 'react';
import { colors, ThemeProvider, Mode, Select } from '@seedui-react/seedui';

import './style.css';
import '@fontsource/poppins';
import '@fontsource-variable/inter';

export const App: FunctionComponent = () => {
  const [mode, _setMode] = useState<Mode>('light');
  const [value, setValue] = useState<string | null>('0');

  const options = [
    {
      label: 'None',
      value: null,
    },
    {
      label: 'France',
      value: '0',
    },
    {
      label: 'Spain',
      value: '1',
    },
    {
      label: 'Portugal',
      value: '2',
    },
  ];

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
        <div style={{ margin: 'auto', width: 600 }}>
          <Select
            width="100%"
            placeholder="Country..."
            label={{ text: 'Countries' }}
            value={value}
            onChange={setValue}
            options={options}
          />
        </div>
      </ThemeProvider>
    </div>
  );
};
