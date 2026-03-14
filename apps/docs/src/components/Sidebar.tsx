import { ChangeEvent, FunctionComponent, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { styled, IconButton, SearchBar } from '@seedui-react/seedui';
import { GithubIcon, FigmaIcon } from 'lucide-react';
import { ComponentCategory } from '../data/components';
import { allPages, NavPage, ThemeCategory } from '../data/navigation';
import { MobileMenuContext } from '../App';


const Nav = styled('nav')<{ $mobileOpen: boolean }>(({ theme, $mobileOpen }) => {
  const isLight = theme.mode === 'light';
  return {
    width: 260,
    flexShrink: 0,
    borderRight: `1px solid ${isLight ? theme.colors.neutral[200] : theme.colors.neutral[700]}`,
    backgroundColor: isLight ? theme.colors.neutral.white : theme.colors.neutral[900],
    overflowY: 'auto' as const,
    padding: '16px 0',
    [theme.breakpoints.down('md')]: {
      display: 'flex',
      flexDirection: 'column' as const,
      overflow: 'hidden',
      width: '100%',
      padding: 0,
      paddingTop: 12,
      position: 'fixed' as const,
      top: 56,
      left: 0,
      right: 0,
      bottom: 0,
      borderRight: 'none',
      zIndex: 100,
      transform: $mobileOpen ? 'translateX(0)' : 'translateX(-100%)',
      transition: 'transform 0.25s ease',
    },
  };
});

const MobileSearch = styled('div')(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    display: 'none',
    [theme.breakpoints.down('md')]: {
      display: 'block',
      padding: '0 12px 12px',
      borderBottom: `1px solid ${isLight ? theme.colors.neutral[200] : theme.colors.neutral[700]}`,
      marginBottom: 8,
    },
  };
});

const SearchResultList = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column' as const,
  marginTop: 8,
}));

const SearchResultItem = styled('button')(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    display: 'block',
    width: '100%',
    padding: '8px 10px',
    border: 'none',
    background: 'none',
    textAlign: 'left' as const,
    fontFamily: 'inherit',
    fontSize: 14,
    cursor: 'pointer',
    borderRadius: 6,
    color: isLight ? theme.colors.neutral[900] : theme.colors.neutral[100],
    '&:hover': {
      backgroundColor: isLight ? theme.colors.neutral[100] : theme.colors.neutral[800],
    },
  };
});

const NavContent = styled('div')(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    flex: 1,
    overflowY: 'auto' as const,
    padding: '8px 0',
  },
}));

const MobileFooter = styled('div')(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    display: 'none',
    [theme.breakpoints.down('md')]: {
      display: 'flex',
      alignItems: 'center',
      gap: 4,
      padding: '12px 20px',
      flexShrink: 0,
      borderTop: `1px solid ${isLight ? theme.colors.neutral[200] : theme.colors.neutral[700]}`,
    },
  };
});

const SectionHeader = styled('button')(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: '0 20px',
    marginBottom: 4,
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    color: isLight ? theme.colors.neutral[900] : theme.colors.neutral[100],
    fontSize: 14,
    fontWeight: 700,
    fontFamily: 'inherit',
    '&:hover': {
      color: isLight ? theme.colors.neutral[700] : theme.colors.neutral[300],
    },
  };
});

const Chevron = styled('span')<{ $open: boolean }>(({ $open }) => ({
  display: 'inline-block',
  fontSize: 14,
  transition: 'transform 0.2s ease',
  transform: $open ? 'rotate(90deg)' : 'rotate(0deg)',
}));

const SmallChevron = styled('span')<{ $open: boolean }>(({ $open }) => ({
  display: 'inline-block',
  fontSize: 12,
  transition: 'transform 0.2s ease',
  transform: $open ? 'rotate(90deg)' : 'rotate(0deg)',
}));

const SectionLinks = styled('div')<{ $open: boolean }>(({ $open }) => ({
  display: 'grid',
  gridTemplateRows: $open ? '1fr' : '0fr',
  transition: 'grid-template-rows 0.2s ease',
  '& > div': {
    overflow: 'hidden',
  },
}));

const LinkList = styled('div')(() => ({
  padding: '0 10px',
  display: 'flex',
  flexDirection: 'column' as const,
  gap: 1,
}));

const StyledLink = styled(NavLink)(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    display: 'block',
    padding: '7px 10px',
    borderRadius: 6,
    fontSize: 14,
    fontFamily: 'inherit',
    color: isLight ? theme.colors.neutral[900] : theme.colors.neutral[100],
    textDecoration: 'none',
    transition: 'background 0.15s, color 0.15s',
    '&:hover': {
      backgroundColor: isLight ? theme.colors.neutral[100] : theme.colors.neutral[800],
    },
    '&.active': {
      color: isLight ? theme.colors.primary[600] : theme.colors.primary[400],
      backgroundColor: isLight ? theme.colors.primary[100] : theme.colors.primary[900],
      fontWeight: 500,
    },
  };
});

const CategoryGroup = styled('div')(() => ({
  margin: '4px 20px 0 28px',
}));

const CategoryHeader = styled('button')(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: '4px 0',
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    fontSize: 11,
    fontWeight: 600,
    color: theme.colors.neutral[400],
    fontFamily: 'inherit',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
    '&:hover': {
      color: theme.colors.neutral[400],
    },
  };
});

const CategoryLinks = styled('div')(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    marginLeft: 6,
    paddingLeft: 6,
    borderLeft: `1px solid ${isLight ? theme.colors.neutral[200] : theme.colors.neutral[700]}`,
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 2,
  };
});

const CategoryLink = styled(NavLink)(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    display: 'block',
    padding: '5px 8px',
    borderRadius: 4,
    fontSize: 14,
    fontFamily: 'inherit',
    color: isLight ? theme.colors.neutral[900] : theme.colors.neutral[100],
    textDecoration: 'none',
    transition: 'background 0.15s, color 0.15s',
    '&:hover': {
      backgroundColor: isLight ? theme.colors.neutral[100] : theme.colors.neutral[800],
    },
    '&.active': {
      color: isLight ? theme.colors.primary[600] : theme.colors.primary[400],
      backgroundColor: isLight ? theme.colors.primary[100] : theme.colors.primary[900],
      fontWeight: 500,
    },
  };
});

interface SidebarProps {
  gettingStartedPages: NavPage[];
  themeGroups: { category: ThemeCategory; pages: NavPage[] }[];
  componentGroups: { category: ComponentCategory; names: string[] }[];
}

export const Sidebar: FunctionComponent<SidebarProps> = ({
  gettingStartedPages,
  themeGroups,
  componentGroups,
}) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [mobileSearch, setMobileSearch] = useState('');

  // Compute which keys need to be open for a given path
  const getKeysForPath = useCallback((path: string): string[] => {
    const keys: string[] = [];

    // Check getting-started
    if (gettingStartedPages.some((p) => p.path === path)) {
      keys.push('getting-started');
      return keys;
    }

    // Check theme groups
    for (const group of themeGroups) {
      if (group.pages.some((p) => p.path === path)) {
        keys.push('theme', `theme-${group.category}`);
        return keys;
      }
    }

    // Check component groups
    const componentName = path.startsWith('/components/') ? path.replace('/components/', '') : '';
    for (const group of componentGroups) {
      if (group.names.includes(componentName)) {
        keys.push('components', `cat-${group.category}`);
        return keys;
      }
    }

    return ['getting-started'];
  }, [gettingStartedPages, themeGroups, componentGroups]);

  // State tracks open/closed for each key
  const [openState, setOpenState] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    for (const key of getKeysForPath(pathname)) {
      initial[key] = true;
    }
    return initial;
  });

  // When navigating, ensure the target section/subsection is open (but don't close anything)
  useEffect(() => {
    const needed = getKeysForPath(pathname);
    setOpenState((prev) => {
      const allOpen = needed.every((k) => prev[k]);
      if (allOpen) return prev;
      const next = { ...prev };
      for (const key of needed) {
        next[key] = true;
      }
      return next;
    });
  }, [pathname, getKeysForPath]);

  const { isOpen: mobileOpen, close: closeMobile } = useContext(MobileMenuContext);

  const mobileSearchResults = useMemo(() => {
    const q = mobileSearch.toLowerCase().trim();
    if (!q) return [];
    return allPages.filter((p) => p.name.toLowerCase().includes(q)).slice(0, 8);
  }, [mobileSearch]);

  const handleMobileSearchSelect = (path: string) => {
    navigate(path);
    setMobileSearch('');
    closeMobile();
  };

  // Clear search when menu closes
  useEffect(() => {
    if (!mobileOpen) setMobileSearch('');
  }, [mobileOpen]);

  const isOpen = (key: string) => !!openState[key];

  const toggle = (key: string) =>
    setOpenState((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <Nav $mobileOpen={mobileOpen}>
      <MobileSearch>
        <SearchBar
          value={mobileSearch}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setMobileSearch(e.target.value)}
          placeholder="Search docs..."
          hideButton
        />
        {mobileSearchResults.length > 0 && (
          <SearchResultList>
            {mobileSearchResults.map((page) => (
              <SearchResultItem key={page.path} onClick={() => handleMobileSearchSelect(page.path)}>
                {page.name}
              </SearchResultItem>
            ))}
          </SearchResultList>
        )}
      </MobileSearch>
      <NavContent>
      {gettingStartedPages.length > 0 && (
        <div>
          <SectionHeader onClick={() => toggle('getting-started')}>
            Getting Started
            <Chevron $open={isOpen('getting-started')}>&#8250;</Chevron>
          </SectionHeader>
          <SectionLinks $open={isOpen('getting-started')}>
            <div>
              <LinkList>
                {gettingStartedPages.map((page) => (
                  <StyledLink key={page.path} to={page.path} end={page.path === '/'}>
                    {page.name}
                  </StyledLink>
                ))}
              </LinkList>
            </div>
          </SectionLinks>
        </div>
      )}

      {themeGroups.length > 0 && (
        <div style={{ marginTop: 16 }}>
          <SectionHeader onClick={() => toggle('theme')}>
            Theme
            <Chevron $open={isOpen('theme')}>&#8250;</Chevron>
          </SectionHeader>
          <SectionLinks $open={isOpen('theme')}>
            <div>
              {themeGroups.map((group) => (
                <CategoryGroup key={group.category}>
                  <CategoryHeader onClick={() => toggle(`theme-${group.category}`)}>
                    {group.category}
                    <SmallChevron $open={isOpen(`theme-${group.category}`)}>&#8250;</SmallChevron>
                  </CategoryHeader>
                  <SectionLinks $open={isOpen(`theme-${group.category}`)}>
                    <div>
                      <CategoryLinks>
                        {group.pages.map((page) => (
                          <CategoryLink key={page.path} to={page.path}>
                            {page.name}
                          </CategoryLink>
                        ))}
                      </CategoryLinks>
                    </div>
                  </SectionLinks>
                </CategoryGroup>
              ))}
            </div>
          </SectionLinks>
        </div>
      )}

      {componentGroups.length > 0 && (
        <div style={{ marginTop: 16 }}>
          <SectionHeader onClick={() => toggle('components')}>
            Components
            <Chevron $open={isOpen('components')}>&#8250;</Chevron>
          </SectionHeader>
          <SectionLinks $open={isOpen('components')}>
            <div>
              {componentGroups.map((group) => (
                <CategoryGroup key={group.category}>
                  <CategoryHeader onClick={() => toggle(`cat-${group.category}`)}>
                    {group.category}
                    <SmallChevron $open={isOpen(`cat-${group.category}`)}>&#8250;</SmallChevron>
                  </CategoryHeader>
                  <SectionLinks $open={isOpen(`cat-${group.category}`)}>
                    <div>
                      <CategoryLinks>
                        {group.names.map((name) => (
                          <CategoryLink key={name} to={`/components/${name}`}>
                            {name}
                          </CategoryLink>
                        ))}
                      </CategoryLinks>
                    </div>
                  </SectionLinks>
                </CategoryGroup>
              ))}
            </div>
          </SectionLinks>
        </div>
      )}
      </NavContent>
      <MobileFooter>
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
      </MobileFooter>
    </Nav>
  );
};
