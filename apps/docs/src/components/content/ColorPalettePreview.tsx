import { FunctionComponent } from 'react';
import { ThemeProvider } from '@seedui-react/seedui';
import styled, { useTheme } from '@seedui-react/seedui/sc';
import type { ThemeCustomization } from '@seedui-react/seedui';

const PreviewBox = styled.div(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    borderRadius: theme.borderRadius(4),
    border: `1px solid ${isLight ? theme.colors.neutral[200] : theme.colors.neutral[300]}`,
    backgroundColor: isLight ? theme.colors.neutral[100] : theme.colors.neutral[200],
    padding: theme.spacing(2.5),
    marginBottom: theme.spacing(1.5),
  };
});

const PaletteRow = styled.div(({ theme }) => ({
  display: 'flex',
  gap: 3,
  borderRadius: theme.borderRadius(3),
  overflow: 'hidden',
}));

const PaletteLabel = styled.span(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    fontSize: theme.typography.caption.fontSize,
    fontWeight: 600,
    color: isLight ? theme.colors.neutral[600] : theme.colors.neutral[800],
    marginBottom: theme.spacing(0.75),
    display: 'block',
    textTransform: 'capitalize' as const,
  };
});

const Swatch = styled.div(({ theme }) => ({
  flex: 1,
  height: theme.spacing(4),
}));

const shades = [100, 200, 300, 400, 500, 600, 700, 800, 900] as const;

const colorsCustomization: ThemeCustomization = {
  colors: {
    light: {
      primary: '#e11d48',
      success: {
        500: '#0ea5e9',
        600: '#0284c7',
      },
    },
    dark: {
      primary: '#fb7185',
      success: {
        400: '#fb923c',
        500: '#f97316',
      },
    },
  },
};

const Palettes: FunctionComponent = () => {
  const theme = useTheme();
  const primary = theme.colors.primary as unknown as Record<number, string>;
  const success = theme.colors.success as unknown as Record<number, string>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing(1.5) }}>
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
