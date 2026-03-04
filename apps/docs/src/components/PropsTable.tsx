import { FunctionComponent } from 'react';
import { styled } from '@seedui-react/seedui';
import { PropDef } from '../data/components';

const Table = styled('table')(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    width: '100%',
    borderCollapse: 'collapse' as const,
    fontSize: 14,
    fontFamily: 'inherit',
    color: isLight ? theme.colors.neutral[800] : theme.colors.neutral[200],
  };
});

const Th = styled('th')(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    textAlign: 'left' as const,
    padding: '10px 0px',
    fontWeight: 600,
    fontSize: 12,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.04em',
    color: theme.colors.neutral[500],
    borderBottom: `1px solid ${isLight ? theme.colors.neutral[200] : theme.colors.neutral[700]}`,
  };
});

const Td = styled('td')(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    padding: `${theme.spacing[200]}px 0`,
    borderBottom: `1px solid ${isLight ? theme.colors.neutral[100] : theme.colors.neutral[800]}`,
    verticalAlign: 'top' as const,
    lineHeight: 1.5,
  };
});

const PropName = styled('code')(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    fontFamily: "'SF Mono', 'Fira Code', 'Fira Mono', Menlo, Consolas, monospace",
    fontSize: 13,
    fontWeight: 500,
    color: isLight ? theme.colors.primary[600] : theme.colors.primary[400],
  };
});

const TypeCode = styled('code')(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    fontFamily: "'SF Mono', 'Fira Code', 'Fira Mono', Menlo, Consolas, monospace",
    fontSize: 12,
    color: isLight ? theme.colors.neutral[600] : theme.colors.neutral[400],
    backgroundColor: isLight ? theme.colors.neutral[100] : theme.colors.neutral[800],
    padding: '2px 6px',
    borderRadius: 4,
  };
});

const DefaultCode = styled('code')(({ theme }) => ({
  fontFamily: "'SF Mono', 'Fira Code', 'Fira Mono', Menlo, Consolas, monospace",
  fontSize: 12,
  color: theme.colors.neutral[500],
}));

interface PropsTableProps {
  props: PropDef[];
}

export const PropsTable: FunctionComponent<PropsTableProps> = ({ props }) => {
  return (
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
        {props.map((p) => (
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
  );
};
