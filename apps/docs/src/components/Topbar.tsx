import { ChangeEvent, FunctionComponent } from 'react';
import { styled, Toggle, Mode } from '@seedui-react/seedui';
import { SearchIcon, MoonIcon, GithubIcon, FigmaIcon } from 'lucide-react';

const Bar = styled('header')(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    height: 56,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 24px',
    borderBottom: `1px solid ${isLight ? theme.colors.neutral[200] : theme.colors.neutral[700]}`,
    backgroundColor: isLight ? theme.colors.neutral.white : theme.colors.neutral[900],
    flexShrink: 0,
  };
});

const SearchWrapper = styled('div')(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '6px 12px',
    borderRadius: 8,
    border: `1px solid ${isLight ? theme.colors.neutral[200] : theme.colors.neutral[700]}`,
    backgroundColor: isLight ? theme.colors.neutral[100] : theme.colors.neutral[800],
    color: theme.colors.neutral[500],
    width: 260,
  };
});

const SearchInput = styled('input')(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    border: 'none',
    outline: 'none',
    background: 'transparent',
    fontSize: 14,
    fontFamily: 'inherit',
    color: isLight ? theme.colors.neutral[900] : theme.colors.neutral[100],
    width: '100%',
    '&::placeholder': {
      color: theme.colors.neutral[400],
    },
  };
});

const RightSection = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: 12,
}));

const VerticalDivider = styled('div')(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    width: 1,
    height: 20,
    backgroundColor: isLight ? theme.colors.neutral[200] : theme.colors.neutral[700],
  };
});

const IconLink = styled('a')(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.colors.neutral[500],
    transition: 'color 150ms',
    '&:hover': {
      color: isLight ? theme.colors.neutral[900] : theme.colors.neutral[100],
    },
  };
});

const ThemeToggle = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
}));

interface TopbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  mode: Mode;
  onModeToggle: () => void;
}

export const Topbar: FunctionComponent<TopbarProps> = ({ search, onSearchChange, mode, onModeToggle }) => {
  return (
    <Bar>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <img
          src="/logo-black.svg"
          alt="SeedUI"
          height={24}
          width={24}
          style={mode === 'dark' ? { filter: 'invert(1)' } : undefined}
        />
        <span style={{ fontSize: 15, fontWeight: 600, letterSpacing: '-0.01em' }}>seedui</span>
        <span style={{ fontSize: 12, fontWeight: 500, opacity: 0.4 }}>docs</span>
      </div>
      <RightSection>
        <IconLink href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <GithubIcon size={18} />
        </IconLink>
        <IconLink href="https://figma.com" target="_blank" rel="noopener noreferrer" aria-label="Figma">
          <FigmaIcon size={18} />
        </IconLink>
        <VerticalDivider />
        <SearchWrapper>
          <SearchIcon size={16} />
          <SearchInput
            value={search}
            onChange={(e: ChangeEvent<HTMLInputElement>) => onSearchChange(e.target.value)}
            placeholder="Search components..."
          />
        </SearchWrapper>
        <VerticalDivider />
        <ThemeToggle>
          <MoonIcon size={16} />
          <Toggle checked={mode === 'dark'} onChange={onModeToggle} size="sm" />
        </ThemeToggle>
      </RightSection>
    </Bar>
  );
};
