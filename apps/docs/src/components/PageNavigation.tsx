import { FunctionComponent } from 'react';
import { styled, Text, Divider } from '@seedui-react/seedui';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { allPages } from '../data/navigation';

const Wrapper = styled('div')(() => ({
  marginTop: 48,
}));

const Nav = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '16px 0',
}));

const NavLink = styled('a')(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    textDecoration: 'none',
    color: isLight ? theme.colors.primary[600] : theme.colors.primary.default,
    fontSize: 14,
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
    gap: 2,
    fontSize: 11,
    color: isLight ? theme.colors.neutral[400] : theme.colors.neutral[800],
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    fontWeight: 600,
  };
});

const Side = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
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
            <Label><ChevronLeftIcon size={12} /> Previous</Label>
            <NavLink href={prev.path}>
              {prev.name}
            </NavLink>
          </Side>
        ) : (
          <div />
        )}
        {next ? (
          <Side style={{ alignItems: 'flex-end' }}>
            <Label>Next <ChevronRightIcon size={12} /></Label>
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
