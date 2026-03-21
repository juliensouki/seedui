import { FunctionComponent } from 'react';
import { Text, Divider } from '@seedui-react/seedui';
import styled from '@seedui-react/seedui/sc';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { allPages } from './navigation';

const Wrapper = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(6),
}));

const Nav = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: `${theme.spacing(2)}px 0`,
}));

const NavLink = styled('a')(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(0.75),
    textDecoration: 'none',
    color: isLight ? theme.colors.primary[600] : theme.colors.primary.default,
    fontSize: theme.typography.p.fontSize,
    fontWeight: 500,
    transition: 'color 0.15s',
    '&:hover': {
      color: isLight ? theme.colors.primary[700] : theme.colors.primary[700],
    },
  };
});

const Label = styled(Text)(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(0.25),
    color: isLight ? theme.colors.neutral[400] : theme.colors.neutral[800],
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  };
});

const Side = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(0.25),
}));

interface PageNavigationProps {
  currentPath?: string;
}

export const PageNavigation: FunctionComponent<PageNavigationProps> = ({ currentPath }) => {
  const path = currentPath || (typeof window !== 'undefined' ? window.location.pathname : '/');
  const normPath = path === '/' ? '/' : path.replace(/\/$/, '');
  const index = allPages.findIndex((p) => p.path === normPath);

  if (index === -1) return null;

  const prev = index > 0 ? allPages[index - 1] : null;
  const next = index < allPages.length - 1 ? allPages[index + 1] : null;

  if (!prev && !next) return null;

  return (
    <Wrapper>
      <Divider />
      <Nav>
        {prev ? (
          <Side>
            <Label variant="small"><ChevronLeftIcon size={12} /> Previous</Label>
            <NavLink href={prev.path}>
              {prev.name}
            </NavLink>
          </Side>
        ) : (
          <div />
        )}
        {next ? (
          <Side style={{ alignItems: 'flex-end' }}>
            <Label variant="small">Next <ChevronRightIcon size={12} /></Label>
            <NavLink href={next.path}>
              {next.name}
            </NavLink>
          </Side>
        ) : (
          <div />
        )}
      </Nav>
    </Wrapper>
  );
};
