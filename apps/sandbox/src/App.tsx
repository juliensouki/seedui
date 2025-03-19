import { FunctionComponent, useState } from 'react';
import { colors, IconButton, ThemeProvider } from '@seedui/seedui';
import { GemIcon } from 'lucide-react';

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
          <IconButton variant="filled" color="primary" size="sm">
            <GemIcon strokeWidth={1} />
          </IconButton>

          <IconButton variant="filled" color="primary" size="md">
            <GemIcon strokeWidth={1} />
          </IconButton>

          <IconButton variant="filled" color="primary" size="lg">
            <GemIcon strokeWidth={1} />
          </IconButton>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 16 }}>
          <IconButton variant="transparent" color="primary" size="sm">
            <GemIcon strokeWidth={1} />
          </IconButton>

          <IconButton variant="transparent" color="primary" size="md">
            <GemIcon strokeWidth={1} />
          </IconButton>

          <IconButton variant="transparent" color="primary" size="lg">
            <GemIcon strokeWidth={1} />
          </IconButton>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 16 }}>
          <IconButton variant="filled" color="secondary" size="sm">
            <GemIcon strokeWidth={1} />
          </IconButton>

          <IconButton variant="filled" color="secondary" size="md">
            <GemIcon strokeWidth={1} />
          </IconButton>

          <IconButton variant="filled" color="secondary" size="lg">
            <GemIcon strokeWidth={1} />
          </IconButton>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 16 }}>
          <IconButton variant="transparent" color="secondary" size="sm">
            <GemIcon strokeWidth={1} />
          </IconButton>

          <IconButton variant="transparent" color="secondary" size="md">
            <GemIcon strokeWidth={1} />
          </IconButton>

          <IconButton variant="transparent" color="secondary" size="lg">
            <GemIcon strokeWidth={1} />
          </IconButton>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 16 }}>
          <IconButton variant="filled" color="neutral" size="sm">
            <GemIcon strokeWidth={1} />
          </IconButton>

          <IconButton variant="filled" color="neutral" size="md">
            <GemIcon strokeWidth={1} />
          </IconButton>

          <IconButton variant="filled" color="neutral" size="lg">
            <GemIcon strokeWidth={1} />
          </IconButton>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 16 }}>
          <IconButton variant="transparent" color="neutral" size="sm">
            <GemIcon strokeWidth={1} />
          </IconButton>

          <IconButton variant="transparent" color="neutral" size="md">
            <GemIcon strokeWidth={1} />
          </IconButton>

          <IconButton variant="transparent" color="neutral" size="lg">
            <GemIcon strokeWidth={1} />
          </IconButton>
        </div>
      </ThemeProvider>
    </div>
  );
};
