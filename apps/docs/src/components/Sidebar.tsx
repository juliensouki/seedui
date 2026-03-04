import { FunctionComponent, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { styled } from '@seedui-react/seedui';
import { ComponentCategory } from '../data/components';
import { NavPage } from '../data/navigation';

const Nav = styled('nav')(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    width: 220,
    flexShrink: 0,
    borderRight: `1px solid ${isLight ? theme.colors.neutral[200] : theme.colors.neutral[700]}`,
    backgroundColor: isLight ? theme.colors.neutral.white : theme.colors.neutral[900],
    overflowY: 'auto' as const,
    padding: '16px 0',
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
    color: theme.colors.neutral[500],
    fontSize: 12,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
    fontWeight: 600,
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

const StyledLink = styled(NavLink)(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    display: 'block',
    padding: '7px 20px',
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
    letterSpacing: '0.03em',
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
  };
});

const CategoryLink = styled(NavLink)(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    display: 'block',
    padding: '5px 8px',
    borderRadius: 4,
    fontSize: 13,
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
  tokenPages: NavPage[];
  componentGroups: { category: ComponentCategory; names: string[] }[];
}

export const Sidebar: FunctionComponent<SidebarProps> = ({
  gettingStartedPages,
  tokenPages,
  componentGroups,
}) => {
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({
    tokens: true,
  });

  const toggle = (key: string) =>
    setCollapsed((prev) => ({ ...prev, [key]: !prev[key] }));

  const isOpen = (key: string) => !collapsed[key];

  return (
    <Nav>
      {gettingStartedPages.length > 0 && (
        <div>
          <SectionHeader onClick={() => toggle('getting-started')}>
            Getting Started
            <Chevron $open={isOpen('getting-started')}>&#8250;</Chevron>
          </SectionHeader>
          <SectionLinks $open={isOpen('getting-started')}>
            <div>
              {gettingStartedPages.map((page) => (
                <StyledLink key={page.path} to={page.path} end={page.path === '/'}>
                  {page.name}
                </StyledLink>
              ))}
            </div>
          </SectionLinks>
        </div>
      )}

      {tokenPages.length > 0 && (
        <div style={{ marginTop: 16 }}>
          <SectionHeader onClick={() => toggle('tokens')}>
            Design Tokens
            <Chevron $open={isOpen('tokens')}>&#8250;</Chevron>
          </SectionHeader>
          <SectionLinks $open={isOpen('tokens')}>
            <div>
              {tokenPages.map((page) => (
                <StyledLink key={page.path} to={page.path}>
                  {page.name}
                </StyledLink>
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
    </Nav>
  );
};
