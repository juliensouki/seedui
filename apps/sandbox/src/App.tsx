import { FunctionComponent, useState } from 'react';
import { colors, ThemeProvider, Mode, Text, Button, Popover } from '@seedui-react/seedui';

import './style.css';
import '@fontsource/poppins';
import '@fontsource-variable/inter';

export const App: FunctionComponent = () => {
  const [mode, _setMode] = useState<Mode>('light');
  const [isPopoverBottomOpen, setIsPopoverBottomOpen] = useState(false);
  const [isPopoverTopOpen, setIsPopoverTopOpen] = useState(false);
  const [isPopoverRightOpen, setIsPopoverRightOpen] = useState(false);
  const [isPopoverLeftOpen, setIsPopoverLeftOpen] = useState(false);

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
                <h2 style={{ marginBottom: 16 }}>Popover Component</h2>
              </Text>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
                  <Popover
                    isOpen={isPopoverBottomOpen}
                    onOpen={() => setIsPopoverBottomOpen(true)}
                    onClose={() => setIsPopoverBottomOpen(false)}
                    direction="bottom"
                    spacing={10}
                    content={
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        <Text>
                          <strong>Popover Menu</strong>
                        </Text>
                        <Text>This is a popover that appears when you click the button.</Text>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 8 }}>
                          <Button size="sm" variant="transparent" onClick={() => setIsPopoverBottomOpen(false)}>
                            Option 1
                          </Button>
                          <Button size="sm" variant="transparent" onClick={() => setIsPopoverBottomOpen(false)}>
                            Option 2
                          </Button>
                          <Button size="sm" variant="transparent" onClick={() => setIsPopoverBottomOpen(false)}>
                            Option 3
                          </Button>
                        </div>
                      </div>
                    }
                  >
                    <Button>Open Popover (Bottom)</Button>
                  </Popover>
                  <Popover
                    isOpen={isPopoverTopOpen}
                    onOpen={() => setIsPopoverTopOpen(true)}
                    onClose={() => setIsPopoverTopOpen(false)}
                    direction="top"
                    content={
                      <div>
                        <Text>
                          <strong>Top Popover</strong>
                        </Text>
                        <Text>This popover appears above the trigger element.</Text>
                      </div>
                    }
                  >
                    <Button>Open Popover (Top)</Button>
                  </Popover>
                  <Popover
                    isOpen={isPopoverRightOpen}
                    onOpen={() => setIsPopoverRightOpen(true)}
                    onClose={() => setIsPopoverRightOpen(false)}
                    direction="right"
                    content={
                      <div>
                        <Text>
                          <strong>Right Popover</strong>
                        </Text>
                        <Text>This popover appears to the right of the trigger.</Text>
                      </div>
                    }
                  >
                    <Button>Open Popover (Right)</Button>
                  </Popover>
                  <Popover
                    isOpen={isPopoverLeftOpen}
                    onOpen={() => setIsPopoverLeftOpen(true)}
                    onClose={() => setIsPopoverLeftOpen(false)}
                    direction="left"
                    content={
                      <div>
                        <Text>
                          <strong>Left Popover</strong>
                        </Text>
                        <Text>This popover appears to the left of the trigger.</Text>
                      </div>
                    }
                  >
                    <Button>Open Popover (Left)</Button>
                  </Popover>
                </div>
                <Text>
                  <p style={{ fontSize: 12, color: 'inherit', opacity: 0.7 }}>
                    Popovers can be closed by clicking outside, pressing Escape, or clicking the trigger again.
                  </p>
                </Text>
              </div>
            </div>
          </div>
        </div>
      </ThemeProvider>
    </div>
  );
};
