import { FunctionComponent, useState } from 'react';
import { colors, ThemeProvider, Mode, Text, Button, Popover } from '@seedui-react/seedui';

import './style.css';
import '@fontsource/poppins';
import '@fontsource-variable/inter';

export const App: FunctionComponent = () => {
  const [mode] = useState<Mode>('light');
  const [openPopover, setOpenPopover] = useState<string | null>(null);

  const handleOpen = (id: string) => setOpenPopover(id);
  const handleClose = () => setOpenPopover(null);

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
                    isOpen={openPopover === 'p1'}
                    onOpen={() => handleOpen('p1')}
                    onClose={handleClose}
                    verticalAlignment="bottom"
                    horizontalAlignment="center"
                    content={
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        <Text>
                          <strong>Bottom Center</strong>
                        </Text>
                        <Text>Aligned below, centered horizontally.</Text>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 8 }}>
                          <Button size="sm" variant="transparent" onClick={handleClose}>
                            Option 1
                          </Button>
                          <Button size="sm" variant="transparent" onClick={handleClose}>
                            Option 2
                          </Button>
                        </div>
                      </div>
                    }
                  >
                    <Button>Bottom Center</Button>
                  </Popover>

                  <Popover
                    isOpen={openPopover === 'p2'}
                    onOpen={() => handleOpen('p2')}
                    onClose={handleClose}
                    verticalAlignment="bottom"
                    horizontalAlignment="left"
                    content={
                      <div>
                        <Text>
                          <strong>Bottom Left</strong>
                        </Text>
                        <Text>Below, left edges aligned.</Text>
                      </div>
                    }
                  >
                    <Button>Bottom Left</Button>
                  </Popover>

                  <Popover
                    isOpen={openPopover === 'p3'}
                    onOpen={() => handleOpen('p3')}
                    onClose={handleClose}
                    verticalAlignment="bottom"
                    horizontalAlignment="right"
                    content={
                      <div>
                        <Text>
                          <strong>Bottom Right</strong>
                        </Text>
                        <Text>Below, right edges aligned.</Text>
                      </div>
                    }
                  >
                    <Button>Bottom Right</Button>
                  </Popover>

                  <Popover
                    isOpen={openPopover === 'p4'}
                    onOpen={() => handleOpen('p4')}
                    onClose={handleClose}
                    verticalAlignment="top"
                    horizontalAlignment="center"
                    content={
                      <div>
                        <Text>
                          <strong>Top Center</strong>
                        </Text>
                        <Text>Above, centered horizontally.</Text>
                      </div>
                    }
                  >
                    <Button>Top Center</Button>
                  </Popover>

                  <Popover
                    isOpen={openPopover === 'p5'}
                    onOpen={() => handleOpen('p5')}
                    onClose={handleClose}
                    verticalAlignment="center"
                    horizontalAlignment="right"
                    content={
                      <div>
                        <Text>
                          <strong>Right Center</strong>
                        </Text>
                        <Text>Right side, centered vertically.</Text>
                      </div>
                    }
                  >
                    <Button>Right Center</Button>
                  </Popover>

                  <Popover
                    isOpen={openPopover === 'p6'}
                    onOpen={() => handleOpen('p6')}
                    onClose={handleClose}
                    verticalAlignment="center"
                    horizontalAlignment="left"
                    content={
                      <div>
                        <Text>
                          <strong>Left Center</strong>
                        </Text>
                        <Text>Left side, centered vertically.</Text>
                      </div>
                    }
                  >
                    <Button>Left Center</Button>
                  </Popover>
                </div>

                <Text>
                  <p style={{ fontSize: 12, color: 'inherit', opacity: 0.7 }}>
                    Popovers support independent vertical (top/bottom/center) and horizontal (left/right/center)
                    alignment for precise positioning control. Spacing can be customized per popover.
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
