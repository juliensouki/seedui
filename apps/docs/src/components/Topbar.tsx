import { ChangeEvent, FunctionComponent, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled, Toggle, Mode, Popover, Text, useTheme } from '@seedui-react/seedui';
import { SearchIcon, MoonIcon, GithubIcon, FigmaIcon } from 'lucide-react';
import { allPages, NavPage } from '../data/navigation';

const Bar = styled('header')(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    height: 56,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 24px 0 20px',
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

const ResultList = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column' as const,
  minWidth: 280,
  maxHeight: 360,
  overflowY: 'auto' as const,
  padding: '6px 0',
  borderRadius: theme.borderRadius[100],
}));

const SectionLabel = styled('div')(({ theme }) => ({
  padding: '8px 14px 4px',
  color: theme.colors.neutral[400],
  fontSize: 11,
  fontWeight: 600,
  textTransform: 'uppercase' as const,
  letterSpacing: '0.04em',
  fontFamily: theme.typography.caption.fontFamily,
}));

const ResultItem = styled('button')(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    display: 'block',
    width: '100%',
    padding: '7px 14px',
    border: 'none',
    background: 'none',
    textAlign: 'left' as const,
    fontFamily: 'inherit',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: isLight ? theme.colors.neutral[100] : theme.colors.neutral[700],
    },
  };
});

const NoResults = styled(Text)(({ theme }) => ({
  padding: '12px 14px',
  color: theme.colors.neutral[400],
}));

interface TopbarProps {
  mode: Mode;
  onModeToggle: () => void;
}

export const Topbar: FunctionComponent<TopbarProps> = ({ mode, onModeToggle }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [popoverOpen, setPopoverOpen] = useState(false);

  const groupedResults = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return [];
    const matched = allPages.filter((p) => p.name.toLowerCase().includes(q));
    const groups: { section: string; pages: NavPage[] }[] = [];
    for (const page of matched) {
      const section = page.section || 'Other';
      const existing = groups.find((g) => g.section === section);
      if (existing) {
        existing.pages.push(page);
      } else {
        groups.push({ section, pages: [page] });
      }
    }
    return groups;
  }, [search]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    setPopoverOpen(value.trim().length > 0);
  };

  const handleSelect = (path: string) => {
    navigate(path);
    setSearch('');
    setPopoverOpen(false);
  };

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
        <span style={{ fontSize: 18, fontWeight: 600, letterSpacing: '-0.01em', fontFamily: theme.typography.h1.fontFamily }}>seedui</span>
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
        <Popover
          isOpen={popoverOpen}
          onClose={() => setPopoverOpen(false)}
          verticalAlignment="bottom"
          horizontalAlignment="center"
          content={
            <ResultList>
              {groupedResults.length > 0 ? (
                groupedResults.map((group) => (
                  <div key={group.section}>
                    <SectionLabel>{group.section}</SectionLabel>
                    {group.pages.map((page) => (
                      <ResultItem key={page.path} onClick={() => handleSelect(page.path)}>
                        <Text variant="p">{page.name}</Text>
                      </ResultItem>
                    ))}
                  </div>
                ))
              ) : (
                <NoResults variant="p">No results found</NoResults>
              )}
            </ResultList>
          }
        >
          <SearchWrapper>
            <SearchIcon size={16} />
            <SearchInput
              value={search}
              onChange={handleChange}
              placeholder="Search docs..."
            />
          </SearchWrapper>
        </Popover>
        <VerticalDivider />
        <ThemeToggle>
          <MoonIcon size={16} />
          <Toggle checked={mode === 'dark'} onChange={onModeToggle} size="sm" />
        </ThemeToggle>
      </RightSection>
    </Bar>
  );
};
