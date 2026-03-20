import { FunctionComponent } from 'react';
import styled from '@seedui-react/seedui/sc';
import { PropDef } from '../../docs/components';

const Table = styled('table')(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    width: '100%',
    borderCollapse: 'collapse' as const,
    fontSize: theme.typography.p.fontSize,
    fontFamily: 'inherit',
    color: isLight ? theme.colors.neutral[800] : theme.colors.neutral[800],
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  };
});

const Th = styled('th')(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    textAlign: 'left' as const,
    padding: `${theme.spacing(1.25)}px 0`,
    fontWeight: 600,
    fontSize: theme.typography.caption.fontSize,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.04em',
    color: isLight ? theme.colors.neutral[500] : theme.colors.neutral[800],
    borderBottom: `1px solid ${isLight ? theme.colors.neutral[200] : theme.colors.neutral[300]}`,
  };
});

const Td = styled('td')(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    padding: `${theme.spacing(2)}px 0`,
    borderBottom: `1px solid ${isLight ? theme.colors.neutral[100] : theme.colors.neutral[200]}`,
    verticalAlign: 'top' as const,
    lineHeight: 1.5,
  };
});

const PropName = styled('code')(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    fontFamily: "'SF Mono', 'Fira Code', 'Fira Mono', Menlo, Consolas, monospace",
    fontSize: theme.typography.caption.fontSize,
    fontWeight: 500,
    color: isLight ? theme.colors.primary[600] : theme.colors.primary.default,
  };
});

const TypeCode = styled('code')(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    fontFamily: "'SF Mono', 'Fira Code', 'Fira Mono', Menlo, Consolas, monospace",
    fontSize: theme.typography.caption.fontSize,
    color: isLight ? theme.colors.neutral[600] : theme.colors.neutral[800],
    backgroundColor: isLight ? theme.colors.neutral[100] : theme.colors.neutral[200],
    padding: `${theme.spacing(0.25)}px ${theme.spacing(0.75)}px`,
    borderRadius: theme.borderRadius(2),
  };
});

const DefaultCode = styled('code')(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    fontFamily: "'SF Mono', 'Fira Code', 'Fira Mono', Menlo, Consolas, monospace",
    fontSize: theme.typography.caption.fontSize,
    color: isLight ? theme.colors.neutral[500] : theme.colors.neutral[800],
  };
});

/* Mobile card layout */
const CardList = styled('div')(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.down('md')]: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: theme.spacing(1.5),
  },
}));

const Card = styled('div')(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    padding: theme.spacing(1.75),
    borderRadius: theme.borderRadius(3),
    border: `1px solid ${isLight ? theme.colors.neutral[200] : theme.colors.neutral[300]}`,
    fontSize: theme.typography.p.fontSize,
    lineHeight: 1.5,
    color: isLight ? theme.colors.neutral[800] : theme.colors.neutral[800],
  };
});

const CardHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap' as const,
  gap: theme.spacing(1),
  marginBottom: theme.spacing(0.75),
}));

const CardLabel = styled('span')(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    fontSize: theme.typography.small.fontSize,
    fontWeight: 600,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.04em',
    color: isLight ? theme.colors.neutral[400] : theme.colors.neutral[800],
  };
});

const CardDescription = styled('div')(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    color: isLight ? theme.colors.neutral[500] : theme.colors.neutral[800],
    fontSize: theme.typography.caption.fontSize,
    marginTop: theme.spacing(0.5),
  };
});

interface PropsTableProps {
  props: PropDef[];
}

export const PropsTable: FunctionComponent<PropsTableProps> = ({ props: items }) => {
  return (
    <>
      <Table>
        <thead>
          <tr>
            <Th>Name</Th>
            <Th>Type</Th>
            <Th>Default</Th>
            <Th>Description</Th>
          </tr>
        </thead>
        <tbody>
          {items.map((p) => (
            <tr key={p.name}>
              <Td>
                <PropName>{p.name}</PropName>
              </Td>
              <Td>
                <TypeCode>{p.type}</TypeCode>
              </Td>
              <Td>
                <DefaultCode>{p.default}</DefaultCode>
              </Td>
              <Td>{p.description}</Td>
            </tr>
          ))}
        </tbody>
      </Table>
      <CardList>
        {items.map((p) => (
          <Card key={p.name}>
            <CardHeader>
              <PropName>{p.name}</PropName>
              <TypeCode>{p.type}</TypeCode>
            </CardHeader>
            {p.default && (
              <div>
                <CardLabel>Default: </CardLabel>
                <DefaultCode>{p.default}</DefaultCode>
              </div>
            )}
            {p.description && (
              <CardDescription>{p.description}</CardDescription>
            )}
          </Card>
        ))}
      </CardList>
    </>
  );
};
