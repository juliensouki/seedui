import { ChangeEvent, FunctionComponent, useContext, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled, Toggle, Mode, Popover, Text, Tag, IconButton, SearchBar, useTheme } from '@seedui-react/seedui';
import { MoonIcon, GithubIcon, FigmaIcon, MenuIcon, XIcon } from 'lucide-react';
import { allPages, NavPage } from '../data/navigation';
import { MobileMenuContext } from './MobileMenuContext';

const Bar = styled('header')(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    height: 56,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 24px 0 20px',
    borderBottom: `1px solid ${isLight ? theme.colors.neutral[200] : theme.colors.neutral[300]}`,
    backgroundColor: isLight ? theme.colors.neutral.white : theme.colors.neutral[100],
    flexShrink: 0,
    zIndex: 110,
    position: 'relative' as const,
  };
});

const MenuButton = styled('div')(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.down('md')]: {
    display: 'flex',
    alignItems: 'center',
    marginRight: 4,
  },
}));

const DesktopOnly = styled('div')(({ theme }) => ({
  display: 'contents',
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

const RightSection = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: 4,
}));

const VerticalDivider = styled('div')(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    width: 1,
    height: 20,
    backgroundColor: isLight ? theme.colors.neutral[200] : theme.colors.neutral[300],
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
  borderRadius: theme.borderRadius(4),
}));

const SectionLabel = styled('div')(({ theme }) => ({
  padding: '8px 14px 4px',
  color: theme.mode === 'light' ? theme.colors.neutral[400] : theme.colors.neutral[600],
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
      backgroundColor: isLight ? theme.colors.neutral[100] : theme.colors.neutral[400],
    },
  };
});

const NoResults = styled(Text)(({ theme }) => ({
  padding: '12px 14px',
  color: theme.mode === 'light' ? theme.colors.neutral[400] : theme.colors.neutral[600],
}));

interface TopbarProps {
  mode: Mode;
  onModeToggle: () => void;
}

export const Topbar: FunctionComponent<TopbarProps> = ({ mode, onModeToggle }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { isOpen: mobileMenuOpen, toggle: toggleMobileMenu } = useContext(MobileMenuContext);
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
        <MenuButton>
          <IconButton
            variant="transparent"
            color="neutral"
            size="sm"
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? <XIcon size={20} /> : <MenuIcon size={20} />}
          </IconButton>
        </MenuButton>
        <img
          src="/logo-black.svg"
          alt="seedui"
          height={24}
          width={24}
          style={mode === 'dark' ? { filter: 'invert(1)' } : undefined}
        />
        <span style={{ fontSize: 18, fontWeight: 600, letterSpacing: '-0.01em', fontFamily: theme.typography.h1.fontFamily, color: mode === 'dark' ? '#fff' : undefined }}>seedui</span>
        <Tag color="neutral" size="sm">docs</Tag>
      </div>
      <RightSection>
        <DesktopOnly>
          <IconButton
            variant="transparent"
            color="neutral"
            size="sm"
            onClick={() => window.open('https://github.com', '_blank')}
          >
            <GithubIcon size={18} />
          </IconButton>
          <IconButton
            variant="transparent"
            color="neutral"
            size="sm"
            onClick={() => window.open('https://figma.com', '_blank')}
          >
            <FigmaIcon size={18} />
          </IconButton>
          <VerticalDivider style={{ margin: '0 8px' }} />
        </DesktopOnly>
        <DesktopOnly>
          <Popover
            isOpen={popoverOpen}
            onClose={() => setPopoverOpen(false)}
            verticalAlignment="bottom"
            horizontalAlignment="center"
            elementProps={{
              panel: {
                style: mode === 'dark' ? { backgroundColor: theme.colors.neutral[300] } : undefined,
              },
            }}
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
            <SearchBar
              value={search}
              onChange={handleChange}
              placeholder="Search docs..."
              width={260}
              hideButton
              style={mode === 'dark' ? { backgroundColor: theme.colors.neutral[400] } : undefined}
            />
          </Popover>
          <VerticalDivider style={{ margin: '0 8px' }} />
        </DesktopOnly>
        <ThemeToggle>
          <MoonIcon size={16} />
          <Toggle checked={mode === 'dark'} onChange={onModeToggle} size="sm" />
        </ThemeToggle>
      </RightSection>
    </Bar>
  );
};
