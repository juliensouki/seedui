import { ChangeEvent, FunctionComponent, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { IconButton, SearchBar } from '@juliensouki/seedui';
import styled from '@juliensouki/seedui/sc';
import { GithubIcon, FigmaIcon, ChevronDown } from 'lucide-react';
import { ComponentCategory } from '../../docs/components';
import { allPages, NavPage, ThemeCategory } from './navigation';
import { MobileMenuContext } from './MobileMenuContext';
import { BASE_GITHUB_URL } from '../../constants';


const Nav = styled.nav<{ $mobileOpen: boolean }>(({ theme, $mobileOpen }) => {
  const isLight = theme.mode === 'light';
  return {
    width: 260,
    flexShrink: 0,
    borderRight: `1px solid ${isLight ? theme.colors.neutral[200] : theme.colors.neutral[300]}`,
    backgroundColor: isLight ? theme.colors.neutral.white : theme.colors.neutral[100],
    overflowY: 'auto' as const,
    padding: `${theme.spacing(2)}px 0`,
    [theme.breakpoints.down('md')]: {
      display: 'flex',
      flexDirection: 'column' as const,
      overflow: 'hidden',
      width: '100%',
      padding: 0,
      paddingTop: theme.spacing(1.5),
      position: 'fixed' as const,
      top: theme.spacing(7),
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

const MobileSearch = styled.div(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    display: 'none',
    [theme.breakpoints.down('md')]: {
      display: 'block',
      padding: `0 ${theme.spacing(1.5)}px ${theme.spacing(1.5)}px`,
      borderBottom: `1px solid ${isLight ? theme.colors.neutral[200] : theme.colors.neutral[300]}`,
      marginBottom: theme.spacing(1),
    },
  };
});

const SearchResultList = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column' as const,
  marginTop: theme.spacing(1),
}));

const SearchResultItem = styled.button(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    display: 'block',
    width: '100%',
    padding: `${theme.spacing(1)}px ${theme.spacing(1.25)}px`,
    border: 'none',
    background: 'none',
    textAlign: 'left' as const,
    fontFamily: 'inherit',
    fontSize: theme.typography.p.fontSize,
    cursor: 'pointer',
    borderRadius: theme.borderRadius(3),
    color: isLight ? theme.colors.neutral[900] : theme.colors.neutral[900],
    '&:hover': {
      backgroundColor: isLight ? theme.colors.neutral[100] : theme.colors.neutral[200],
    },
  };
});

const NavContent = styled.div(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    flex: 1,
    overflowY: 'auto' as const,
    padding: `${theme.spacing(1)}px 0`,
  },
}));

const MobileFooter = styled.div(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    display: 'none',
    [theme.breakpoints.down('md')]: {
      display: 'flex',
      alignItems: 'center',
      gap: theme.spacing(0.5),
      padding: `${theme.spacing(1.5)}px ${theme.spacing(2.5)}px`,
      flexShrink: 0,
      borderTop: `1px solid ${isLight ? theme.colors.neutral[200] : theme.colors.neutral[300]}`,
    },
  };
});

const NavSectionLabel = styled.div(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    padding: `0 ${theme.spacing(2.5)}px`,
    marginBottom: theme.spacing(0.75),
    fontSize: theme.typography.caption.fontSize,
    fontWeight: 600,
    color: isLight ? theme.colors.neutral[500] : theme.colors.neutral[700],
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
    fontFamily: 'inherit',
  };
});

const CategoryChevron = styled.span<{ $open: boolean }>(({ $open }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  transition: 'transform 0.2s ease',
  transform: $open ? 'rotate(-180deg)' : 'rotate(0deg)',
  color: 'inherit',
  flexShrink: 0,
}));

const SectionLinks = styled.div<{ $open: boolean }>(({ $open }) => ({
  display: 'grid',
  gridTemplateRows: $open ? '1fr' : '0fr',
  transition: 'grid-template-rows 0.2s ease',
  '& > div': {
    overflow: 'hidden',
  },
}));

const LinkList = styled.div(({ theme }) => ({
  margin: `0 ${theme.spacing(2.5)}px 0 ${theme.spacing(3.5)}px`,
  display: 'flex',
  flexDirection: 'column' as const,
  gap: theme.spacing(0.125),
}));

const StyledLink = styled.a<{ $active: boolean }>(({ theme, $active }) => {
  const isLight = theme.mode === 'light';
  return {
    display: 'block',
    padding: `${theme.spacing(0.5)}px ${theme.spacing(1.25)}px`,
    borderRadius: theme.borderRadius(3),
    fontSize: theme.typography.p.fontSize,
    lineHeight: theme.typography.p.lineHeight,
    fontFamily: 'inherit',
    color: $active
      ? (isLight ? theme.colors.primary[600] : theme.colors.neutral.white)
      : (isLight ? theme.colors.neutral[900] : theme.colors.neutral.white),
    textDecoration: 'none',
    transition: 'background 0.15s, color 0.15s',
    backgroundColor: $active
      ? (isLight ? theme.colors.primary[100] : theme.colors.primary[300])
      : 'transparent',
    fontWeight: $active ? 500 : 400,
    '&:hover': {
      backgroundColor: $active
        ? (isLight ? theme.colors.primary[100] : theme.colors.primary[300])
        : (isLight ? theme.colors.neutral[100] : theme.colors.neutral[200]),
    },
  };
});

const CategoryGroup = styled.div(({ theme }) => ({
  margin: `${theme.spacing(0.125)}px ${theme.spacing(2.5)}px 0 ${theme.spacing(3.5)}px`,
}));

const CategoryHeader = styled.button(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: `${theme.spacing(0.5)}px ${theme.spacing(1.25)}px`,
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    borderRadius: theme.borderRadius(3),
    fontSize: theme.typography.p.fontSize,
    lineHeight: theme.typography.p.lineHeight,
    fontWeight: 400,
    color: isLight ? theme.colors.neutral[900] : theme.colors.neutral.white,
    fontFamily: 'inherit',
    textAlign: 'left' as const,
    '&:hover': {
      backgroundColor: isLight ? theme.colors.neutral[100] : theme.colors.neutral[200],
    },
  };
});

const CategoryLinks = styled.div(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    marginLeft: theme.spacing(0.75),
    paddingLeft: theme.spacing(0.75),
    borderLeft: `1px solid ${isLight ? theme.colors.neutral[200] : theme.colors.neutral[300]}`,
    display: 'flex',
    flexDirection: 'column' as const,
    gap: theme.spacing(0.25),
  };
});

const CategoryLink = styled.a<{ $active: boolean }>(({ theme, $active }) => {
  const isLight = theme.mode === 'light';
  return {
    display: 'block',
    padding: `${theme.spacing(0.5)}px ${theme.spacing(1.25)}px`,
    borderRadius: theme.borderRadius(2),
    fontSize: theme.typography.p.fontSize,
    lineHeight: theme.typography.p.lineHeight,
    fontFamily: 'inherit',
    color: $active
      ? (isLight ? theme.colors.primary[600] : theme.colors.neutral.white)
      : (isLight ? theme.colors.neutral[900] : theme.colors.neutral.white),
    textDecoration: 'none',
    transition: 'background 0.15s, color 0.15s',
    backgroundColor: $active
      ? (isLight ? theme.colors.primary[100] : theme.colors.primary[300])
      : 'transparent',
    fontWeight: $active ? 500 : 400,
    '&:hover': {
      backgroundColor: $active
        ? (isLight ? theme.colors.primary[100] : theme.colors.primary[300])
        : (isLight ? theme.colors.neutral[100] : theme.colors.neutral[200]),
    },
  };
});

interface SidebarProps {
  currentPath: string;
  gettingStartedPages: NavPage[];
  themeGroups: { category: ThemeCategory; pages: NavPage[] }[];
  componentGroups: { category: ComponentCategory; names: string[] }[];
}

export const Sidebar: FunctionComponent<SidebarProps> = ({
  currentPath,
  gettingStartedPages,
  themeGroups,
  componentGroups,
}) => {
  const [mobileSearch, setMobileSearch] = useState('');

  // Compute which category keys need to be open for a given path
  const getKeysForPath = useCallback((path: string): string[] => {
    const keys: string[] = [];

    for (const group of themeGroups) {
      if (group.pages.some((p) => p.path === path)) {
        keys.push(`theme-${group.category}`);
        return keys;
      }
    }

    const componentName = path.startsWith('/components/') ? path.replace('/components/', '') : '';
    for (const group of componentGroups) {
      if (group.names.includes(componentName)) {
        keys.push(`cat-${group.category}`);
        return keys;
      }
    }

    return keys;
  }, [themeGroups, componentGroups]);

  const [openState, setOpenState] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    for (const key of getKeysForPath(currentPath)) {
      initial[key] = true;
    }
    return initial;
  });

  useEffect(() => {
    const needed = getKeysForPath(currentPath);
    setOpenState((prev) => {
      const allOpen = needed.every((k) => prev[k]);
      if (allOpen) return prev;
      const next = { ...prev };
      for (const key of needed) {
        next[key] = true;
      }
      return next;
    });
  }, [currentPath, getKeysForPath]);

  const { isOpen: mobileOpen, close: closeMobile } = useContext(MobileMenuContext);

  const mobileSearchResults = useMemo(() => {
    const q = mobileSearch.toLowerCase().trim();
    if (!q) return [];
    return allPages.filter((p) => p.name.toLowerCase().includes(q)).slice(0, 8);
  }, [mobileSearch]);

  const handleMobileSearchSelect = (path: string) => {
    window.location.href = path;
    setMobileSearch('');
    closeMobile();
  };

  useEffect(() => {
    if (!mobileOpen) setMobileSearch('');
  }, [mobileOpen]);

  const isOpen = (key: string) => !!openState[key];

  const toggle = (key: string) =>
    setOpenState((prev) => ({ ...prev, [key]: !prev[key] }));

  // Strip trailing slash for comparison (except root)
  const normPath = currentPath === '/' ? '/' : currentPath.replace(/\/$/, '');

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
            <NavSectionLabel>Overview</NavSectionLabel>
            <LinkList>
              {gettingStartedPages.map((page) => (
                <StyledLink key={page.path} href={page.path} $active={normPath === page.path}>
                  {page.name}
                </StyledLink>
              ))}
            </LinkList>
          </div>
        )}

        {themeGroups.length > 0 && (
          <div style={{ marginTop: 20 }}>
            <NavSectionLabel>Theme</NavSectionLabel>
            {themeGroups.map((group) => (
              <CategoryGroup key={group.category}>
                <CategoryHeader onClick={() => toggle(`theme-${group.category}`)}>
                  {group.category}
                  <CategoryChevron $open={isOpen(`theme-${group.category}`)}>
                    <ChevronDown size={16} />
                  </CategoryChevron>
                </CategoryHeader>
                <SectionLinks $open={isOpen(`theme-${group.category}`)}>
                  <div>
                    <CategoryLinks>
                      {group.pages.map((page) => (
                        <CategoryLink key={page.path} href={page.path} $active={normPath === page.path}>
                          {page.name}
                        </CategoryLink>
                      ))}
                    </CategoryLinks>
                  </div>
                </SectionLinks>
              </CategoryGroup>
            ))}
          </div>
        )}

        {componentGroups.length > 0 && (
          <div style={{ marginTop: 20 }}>
            <NavSectionLabel>Components</NavSectionLabel>
            {componentGroups.map((group) => (
              <CategoryGroup key={group.category}>
                <CategoryHeader onClick={() => toggle(`cat-${group.category}`)}>
                  {group.category}
                  <CategoryChevron $open={isOpen(`cat-${group.category}`)}>
                    <ChevronDown size={16} />
                  </CategoryChevron>
                </CategoryHeader>
                <SectionLinks $open={isOpen(`cat-${group.category}`)}>
                  <div>
                    <CategoryLinks>
                      {group.names.map((name) => (
                        <CategoryLink key={name} href={`/components/${name}`} $active={normPath === `/components/${name}`}>
                          {name}
                        </CategoryLink>
                      ))}
                    </CategoryLinks>
                  </div>
                </SectionLinks>
              </CategoryGroup>
            ))}
          </div>
        )}
      </NavContent>
      <MobileFooter>
        <IconButton
          variant="transparent"
          color="neutral"
          size="sm"
          onClick={() => window.open(BASE_GITHUB_URL, '_blank', 'noopener,noreferrer')}
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
