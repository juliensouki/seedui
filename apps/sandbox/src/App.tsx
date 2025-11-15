import { FunctionComponent, useState } from 'react';
import { colors, ThemeProvider, Mode, Tag } from '@seedui-react/seedui';

import './style.css';
import '@fontsource/poppins';
import '@fontsource-variable/inter';

export const App: FunctionComponent = () => {
  const [mode, _setMode] = useState<Mode>('light');
  const [fruit, setFruit] = useState<string | null>(null);

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
          <div style={{ display: 'flex', flexDirection: 'row', gap: 8 }}>
            <Tag color="neutral">Neutral</Tag>
            <Tag color="primary">Fruit</Tag>
            <Tag color="success">Fruit</Tag>
            <Tag color="info">Fruit</Tag>
            <Tag color="warning">Fruit</Tag>
            <Tag color="error">Fruit</Tag>
          </div>
        </div>
      </ThemeProvider>
    </div>
  );
};
