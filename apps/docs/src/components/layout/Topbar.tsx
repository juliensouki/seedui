import { ChangeEvent, FunctionComponent, useContext, useEffect, useMemo, useState } from 'react';
import { Toggle, Mode, Popover, Text, Tag, IconButton, SearchBar } from '@seedui-react/seedui';
import styled, { useTheme } from '@seedui-react/seedui/sc';
import { MoonIcon, GithubIcon, FigmaIcon, MenuIcon, XIcon } from 'lucide-react';
import { allPages, NavPage } from './navigation';
import { MobileMenuContext } from './MobileMenuContext';

const Bar = styled.header(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    height: theme.spacing(7),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: `0 ${theme.spacing(3)}px 0 ${theme.spacing(2.5)}px`,
    borderBottom: `1px solid ${isLight ? theme.colors.neutral[200] : theme.colors.neutral[300]}`,
    backgroundColor: isLight ? theme.colors.neutral.white : theme.colors.neutral[100],
    flexShrink: 0,
    zIndex: 110,
    position: 'relative' as const,
  };
});

const MenuButton = styled.div(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.down('md')]: {
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(0.5),
  },
}));

const DesktopOnly = styled.div(({ theme }) => ({
  display: 'contents',
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

const RightSection = styled.div(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
}));

const VerticalDivider = styled.div(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    width: 1,
    height: theme.spacing(2.5),
    backgroundColor: isLight ? theme.colors.neutral[200] : theme.colors.neutral[300],
  };
});

const ThemeToggle = styled.div(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

const ResultList = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column' as const,
  minWidth: 280,
  maxHeight: 360,
  overflowY: 'auto' as const,
  padding: `${theme.spacing(0.75)}px 0`,
  borderRadius: theme.borderRadius(4),
}));

const SectionLabel = styled(Text)(({ theme }) => ({
  padding: `${theme.spacing(1)}px ${theme.spacing(1.75)}px ${theme.spacing(0.5)}px`,
  color: theme.mode === 'light' ? theme.colors.neutral[600] : theme.colors.neutral[800],
  textTransform: 'uppercase' as const,
  letterSpacing: '0.04em',
}));

const ResultItem = styled.button(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    display: 'block',
    width: '100%',
    padding: `${theme.spacing(0.875)}px ${theme.spacing(1.75)}px`,
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
  padding: `${theme.spacing(1.5)}px ${theme.spacing(1.75)}px`,
  color: theme.mode === 'light' ? theme.colors.neutral[400] : theme.colors.neutral[600],
}));

interface TopbarProps {
  mode: Mode;
  onModeToggle: () => void;
}

export const Topbar: FunctionComponent<TopbarProps> = ({ mode, onModeToggle }) => {
  const theme = useTheme();
  const { isOpen: mobileMenuOpen, toggle: toggleMobileMenu } = useContext(MobileMenuContext);
  const [search, setSearch] = useState('');
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

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
    window.location.href = path;
    setSearch('');
    setPopoverOpen(false);
  };

  return (
    <Bar>
      <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing(1.25) }}>
        <MenuButton>
          <IconButton
            variant="transparent"
            color="neutral"
            size="md"
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? <XIcon size={20} /> : <MenuIcon size={20} />}
          </IconButton>
        </MenuButton>
        <a
          href="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: theme.spacing(1.25),
            textDecoration: 'none',
            color: 'inherit',
          }}
        >
          <img
            src="/logo-black.svg"
            alt="seedui"
            height={24}
            width={24}
            style={mode === 'dark' ? { filter: 'invert(1)' } : undefined}
          />
          <span style={{ fontSize: 18, fontWeight: 600, letterSpacing: '-0.01em', fontFamily: theme.typography.h1.fontFamily, color: mode === 'dark' ? theme.colors.neutral.white : undefined }}>seedui</span>
        </a>
        <Tag
          color="neutral"
          size="sm"
          elementProps={{ root: { style: { minHeight: 'unset', borderRadius: 12 } } }}
        >
          docs
        </Tag>
      </div>
      <RightSection>
        <DesktopOnly>
          <IconButton
            variant="transparent"
            color="neutral"
            size="md"
            onClick={() => window.open('https://github.com/juliensouki/seedui', '_blank', 'noopener,noreferrer')}
          >
            <GithubIcon size={18} />
          </IconButton>
          <IconButton
            variant="transparent"
            color="neutral"
            size="md"
            onClick={() => window.open('https://figma.com', '_blank')}
          >
            <FigmaIcon size={18} />
          </IconButton>
          <VerticalDivider style={{ margin: `0 ${theme.spacing(1)}px` }} />
        </DesktopOnly>
        <DesktopOnly>
          {(() => {
            const searchBar = (
              <SearchBar
                value={mounted ? search : ''}
                onChange={mounted ? handleChange : () => {}}
                placeholder="Search docs..."
                width={260}
                hideButton
                elementProps={{
                  root: {
                    style: {
                      padding: '8px 8px 8px 4px',
                      backgroundColor: mode === 'dark' ? theme.colors.neutral[400] : theme.colors.neutral[100],
                    },
                  },
                }}
              />
            );
            if (!mounted) return searchBar;
            return (
              <Popover
                isOpen={popoverOpen}
                onClose={() => setPopoverOpen(false)}
                verticalAlignment="bottom"
                horizontalAlignment="center"
                elementProps={{
                  panel: {
                    style: {
                      backgroundColor: mode === 'dark' ? theme.colors.neutral[300] : theme.colors.neutral.white,
                    },
                  },
                }}
                content={
                  <ResultList>
                    {groupedResults.length > 0 ? (
                      groupedResults.map((group) => (
                        <div key={group.section}>
                          <SectionLabel variant="small">{group.section}</SectionLabel>
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
                {searchBar}
              </Popover>
            );
          })()}
          <VerticalDivider style={{ margin: `0 ${theme.spacing(1)}px` }} />
        </DesktopOnly>
        <ThemeToggle>
          <MoonIcon size={16} />
          <Toggle checked={mode === 'dark'} onChange={onModeToggle} size="sm" />
        </ThemeToggle>
      </RightSection>
    </Bar>
  );
};
