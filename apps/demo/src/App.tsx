import { ChangeEvent, FunctionComponent, useState } from 'react';
import {
  colors,
  ThemeProvider,
  Textarea,
  Tag,
  Button,
  Input,
  Card,
  Text,
  Tooltip,
  IconButton,
  styled,
} from '@seedui-react/seedui';
import { BedIcon, GemIcon, MoonIcon, SunIcon } from 'lucide-react';

import './style.css';
import '@fontsource/poppins';
import '@fontsource-variable/inter';

const ComponentName = styled(Text)(() => ({
  marginBottom: 16,
  marginTop: 50,
}));

export const App: FunctionComponent = () => {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const [input1Value, setInput1Value] = useState<string>('');
  const [input2Value, setInput2Value] = useState<string>('');
  const [textareaValue, setTextareaValue] = useState<string>('');

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
        <div style={{ position: 'absolute', top: 20, right: 20, textAlign: 'right' }}>
          <IconButton
            variant="transparent"
            color="neutral"
            onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
          >
            {mode === 'dark' ? <SunIcon strokeWidth={1.8} /> : <MoonIcon strokeWidth={1.8} />}
          </IconButton>
          <Text style={{ position: 'relative', right: 20 }}>Switch mode ☝️</Text>
        </div>

        <ComponentName variant="h6" style={{ marginTop: 0 }}>
          Button
        </ComponentName>
        <div style={{ display: 'flex', flexDirection: 'row', gap: 8 }}>
          <Button>Primary</Button>
          <Button color="neutral">Neutral</Button>
          <Button variant="transparent">Primary</Button>
          <Button variant="transparent" color="neutral">
            Neutral
          </Button>
        </div>

        <ComponentName variant="h6">IconButton</ComponentName>
        <div style={{ display: 'flex', flexDirection: 'row', gap: 8 }}>
          <IconButton>
            <GemIcon strokeWidth={1.8} />
          </IconButton>
          <IconButton color="neutral">
            <GemIcon strokeWidth={1.8} />
          </IconButton>
          <IconButton variant="transparent">
            <GemIcon strokeWidth={1.8} />
          </IconButton>
          <IconButton variant="transparent" color="neutral">
            <GemIcon strokeWidth={1.8} />
          </IconButton>
        </div>

        <ComponentName variant="h6">Tooltip</ComponentName>
        <div>
          <Tooltip text="I'm a tooltip text!" direction="right">
            <Text>Hover Me!</Text>
          </Tooltip>
        </div>
        <ComponentName variant="h6">Card</ComponentName>
        <div>
          <Card htmlAttributes={{ rootDiv: { style: { padding: '8px 16px' } } }}>
            <Text>This is a card.</Text>
          </Card>
        </div>

        <ComponentName variant="h6">Tag</ComponentName>
        <div style={{ display: 'flex', flexDirection: 'row', gap: 8 }}>
          <Tag color="primary">Primary</Tag>
          <Tag color="info">Info</Tag>
          <Tag color="success">Success</Tag>
          <Tag color="warning">Warning</Tag>
          <Tag color="error">Error</Tag>
        </div>

        <ComponentName variant="h6">Input</ComponentName>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 32 }}>
          <Input
            placeholder="Placeholder"
            label="label"
            value={input1Value}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setInput1Value(e.target.value)}
          />
          <Input
            placeholder="Placeholder"
            label="label"
            value={input2Value}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setInput2Value(e.target.value)}
            inputIcon={{ icon: <BedIcon /> }}
          />
        </div>

        <ComponentName variant="h6">Textarea</ComponentName>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Textarea
            placeholder="Placeholder"
            label="Label"
            value={textareaValue}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setTextareaValue(e.target.value)}
          />
        </div>

        <ComponentName variant="h6">Text</ComponentName>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Text variant="h1">Heading 1</Text>
          <Text variant="h2">Heading 2</Text>
          <Text variant="h3">Heading 3</Text>
          <Text variant="h4">Heading 4</Text>
          <Text variant="h5">Heading 5</Text>
          <Text variant="h6">Heading 6</Text>
          <Text variant="p">Paragraph</Text>
          <Text variant="caption">Caption</Text>
          <Text variant="small">Small</Text>
        </div>
      </ThemeProvider>
    </div>
  );
};
