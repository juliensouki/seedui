import { ChangeEvent, FunctionComponent, useState } from 'react';
import { colors, ThemeProvider, Mode, Tag, Select, Text, Modal, Toggle, Button } from '@seedui-react/seedui';

import './style.css';
import '@fontsource/poppins';
import '@fontsource-variable/inter';

export const App: FunctionComponent = () => {
  const [mode, _setMode] = useState<Mode>('light');
  const [fruit, setFruit] = useState<string | null>(null);
  const [country, setCountry] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toggleChecked, setToggleChecked] = useState(false);
  const [toggle2Checked, setToggle2Checked] = useState(true);

  const fruitOptions = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'orange', label: 'Orange' },
    { value: 'grape', label: 'Grape' },
  ];

  const countryOptions = [
    {
      value: 'us',
      label: (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#3B82F6' }} />
          <Text>🇺🇸</Text>
          <Text>United States</Text>
        </div>
      ),
    },
    {
      value: 'uk',
      label: (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#EF4444' }} />
          <Text>🇬🇧</Text>
          <Text>United Kingdom</Text>
        </div>
      ),
    },
    {
      value: 'fr',
      label: (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#10B981' }} />
          <Text>🇫🇷</Text>
          <Text>France</Text>
        </div>
      ),
    },
    {
      value: 'de',
      label: (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#F59E0B' }} />
          <Text>🇩🇪</Text>
          <Text>Germany</Text>
        </div>
      ),
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
        <div style={{ margin: 'auto', maxWidth: 600, width: '100%' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div>
              <Text>
                <h2 style={{ marginBottom: 16 }}>Select with Text Labels</h2>
              </Text>
              <Select
                options={fruitOptions}
                value={fruit}
                onChange={setFruit}
                placeholder="Select a fruit"
                label={{ text: 'Fruit Selection' }}
              />
            </div>

            <div>
              <Text>
                <h2 style={{ marginBottom: 16 }}>Select with ReactNode Labels</h2>
              </Text>
              <Select
                options={countryOptions}
                value={country}
                onChange={setCountry}
                placeholder="Select a country"
                label={{ text: 'Country Selection' }}
              />
            </div>

            <div>
              <Text>
                <h2 style={{ marginBottom: 16 }}>Toggle Component</h2>
              </Text>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <Toggle
                  checked={toggleChecked}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setToggleChecked(e.target.checked)}
                  label="Enable notifications"
                />
                <Toggle
                  checked={toggle2Checked}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setToggle2Checked(e.target.checked)}
                  label="Dark mode"
                  size="lg"
                />
                <Toggle checked={false} onChange={() => {}} label="Disabled toggle" disabled />
                <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                  <Toggle
                    checked={toggleChecked}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setToggleChecked(e.target.checked)}
                    size="sm"
                  />
                  <Toggle
                    checked={toggleChecked}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setToggleChecked(e.target.checked)}
                    size="md"
                  />
                  <Toggle
                    checked={toggleChecked}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setToggleChecked(e.target.checked)}
                    size="lg"
                  />
                </div>
              </div>
            </div>

            <div>
              <Text>
                <h2 style={{ marginBottom: 16 }}>Modal Component</h2>
              </Text>
              <Button onClick={() => setIsModalOpen(true)}>Open Modal</Button>
              <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Example Modal" width={500}>
                <Text>
                  <p>This is a modal component demo. You can close it by:</p>
                  <ul>
                    <li>Clicking the X button</li>
                    <li>Clicking outside the modal (overlay)</li>
                    <li>Pressing the Escape key</li>
                  </ul>
                  <p>Modal content can contain any React elements.</p>
                </Text>
              </Modal>
            </div>
          </div>
        </div>
      </ThemeProvider>
    </div>
  );
};
