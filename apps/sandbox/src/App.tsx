import { ChangeEvent, FunctionComponent, useState } from 'react';
import { colors, ThemeProvider, Textarea, Tag, Button, Input, Card, Text, Tooltip, Mode } from '@seedui-react/seedui';
import { BedIcon } from 'lucide-react';

import './style.css';
import '@fontsource/poppins';
import '@fontsource-variable/inter';

export const App: FunctionComponent = () => {
  const [mode, setMode] = useState<Mode>('light');
  const [value, setValue] = useState<string>('');

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

        <div style={{ display: 'flex', flexDirection: 'row', gap: 8 }}>
          <Button>Save</Button>
          <Button color="neutral">Cancel</Button>
        </div>

        <div style={{ marginTop: 32 }}>
          <Tooltip text="OMG! You hovered me!" direction="right">
            <Text>Hover Me!</Text>
          </Tooltip>
        </div>

        <div style={{ marginTop: 32 }}>
          <Card htmlAttributes={{ rootDiv: { style: { padding: '8px 16px' } } }}>
            <Text>Hello World! This is a card component.</Text>
            <Text>Looking pretty good!</Text>
          </Card>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', gap: 8, marginTop: 32 }}>
          <Tag color="primary">Hello World!</Tag>
          <Tag color="info">Hello World!</Tag>
          <Tag color="success">Hello World!</Tag>
          <Tag color="warning">Hello World!</Tag>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 32 }}>
          <Input
            placeholder="Placeholder"
            label="label"
            value={value}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
          />
          <Input
            placeholder="Placeholder"
            label="label"
            value={value}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
            inputIcon={{ icon: <BedIcon /> }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 32 }}>
          <Textarea
            placeholder="Placeholder"
            label="Label"
            value={value}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setValue(e.target.value)}
          />
        </div>
      </ThemeProvider>
    </div>
  );
};
