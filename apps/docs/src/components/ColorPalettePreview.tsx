import { FunctionComponent } from 'react';
import { styled, useTheme, ThemeProvider } from '@seedui-react/seedui';
import type { ThemeCustomization } from '@seedui-react/seedui';

const PreviewBox = styled('div')(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    borderRadius: 8,
    border: `1px solid ${isLight ? theme.colors.neutral[200] : theme.colors.neutral[700]}`,
    backgroundColor: isLight ? theme.colors.neutral[100] : theme.colors.neutral[800],
    padding: 20,
    marginBottom: 12,
  };
});

const PaletteRow = styled('div')(() => ({
  display: 'flex',
  gap: 3,
  borderRadius: 6,
  overflow: 'hidden',
}));

const PaletteLabel = styled('span')(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    fontSize: 12,
    fontWeight: 600,
    color: isLight ? theme.colors.neutral[600] : theme.colors.neutral[400],
    marginBottom: 6,
    display: 'block',
    textTransform: 'capitalize' as const,
  };
});

const Swatch = styled('div')(() => ({
  flex: 1,
  height: 32,
}));

const shades = [100, 200, 300, 400, 500, 600, 700, 800, 900] as const;

const colorsCustomization: ThemeCustomization = {
  colors: {
    light: {
      primary: '#6366f1',
      success: {
        500: '#22c55e',
        600: '#16a34a',
      },
    },
    dark: {
      primary: '#818cf8',
    },
  },
};

const Palettes: FunctionComponent = () => {
  const theme = useTheme();
  const primary = theme.colors.primary as unknown as Record<number, string>;
  const success = theme.colors.success as unknown as Record<number, string>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div>
        <PaletteLabel>primary</PaletteLabel>
        <PaletteRow>
          {shades.map(s => (
            <Swatch key={s} style={{ backgroundColor: primary[s] }} title={`${s}: ${primary[s]}`} />
          ))}
        </PaletteRow>
      </div>
      <div>
        <PaletteLabel>success</PaletteLabel>
        <PaletteRow>
          {shades.map(s => (
            <Swatch key={s} style={{ backgroundColor: success[s] }} title={`${s}: ${success[s]}`} />
          ))}
        </PaletteRow>
      </div>
    </div>
  );
};

export const ColorPalettePreview: FunctionComponent = () => {
  const theme = useTheme();
  return (
    <PreviewBox>
      <ThemeProvider mode={theme.mode} theme={colorsCustomization}>
        <Palettes />
      </ThemeProvider>
    </PreviewBox>
  );
};
