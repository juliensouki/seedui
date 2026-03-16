import { FunctionComponent } from 'react';
import { styled, Text } from '@seedui-react/seedui';
import { CodeBlock } from '../CodeBlock';
import { PropsTable } from '../PropsTable';
import { ComponentSchema } from '../ComponentSchema';
import { ComponentDemo } from '../ComponentDemo';
import type { PropDef, AnatomyPart } from '../../data/components/types';

const AnatomyTable = styled('table')(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    width: '100%',
    borderCollapse: 'collapse' as const,
    fontSize: 14,
    fontFamily: 'inherit',
    marginTop: 20,
    color: isLight ? theme.colors.neutral[800] : theme.colors.neutral[200],
  };
});

const AnatomyTh = styled('th')(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    textAlign: 'left' as const,
    padding: '10px 16px 10px 0',
    fontWeight: 600,
    fontSize: 12,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.04em',
    color: theme.colors.neutral[500],
    borderBottom: `1px solid ${isLight ? theme.colors.neutral[200] : theme.colors.neutral[700]}`,
  };
});

const AnatomyTd = styled('td')(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    padding: `${theme.spacing(2)}px 16px ${theme.spacing(2)}px 0`,
    borderBottom: `1px solid ${isLight ? theme.colors.neutral[100] : theme.colors.neutral[800]}`,
    verticalAlign: 'top' as const,
    lineHeight: 1.5,
  };
});

const MonoCode = styled('code')(({ theme }) => {
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

export const OverviewDemo: FunctionComponent<{ example: FunctionComponent }> = ({ example: Example }) => (
  <div style={{ marginBottom: 20 }}>
    <ComponentDemo><Example /></ComponentDemo>
  </div>
);

export const ImportSection: FunctionComponent<{ name: string }> = ({ name }) => (
  <section id="section-import">
    <Text variant="h4" as="h2" style={{ marginBottom: 12 }}>Import</Text>
    <CodeBlock code={`import { ${name} } from '@seedui-react/seedui';`} />
  </section>
);

export const AnatomySection: FunctionComponent<{ name: string; anatomy?: AnatomyPart[] }> = ({ name, anatomy = [] }) => (
  <section id="section-anatomy">
    <Text variant="h4" as="h2" style={{ marginBottom: 12 }}>Anatomy</Text>
    <Text variant="p" style={{ opacity: 0.7, lineHeight: 1.6, marginBottom: 20 }}>
      The diagram below shows the internal structure of the component. Each part can be customized
      either through the <code>elementProps</code> prop or by targeting its CSS class.
    </Text>
    <ComponentSchema name={name} />
    {anatomy.length > 0 && (
      <AnatomyTable>
        <thead>
          <tr>
            <AnatomyTh>Part</AnatomyTh>
            <AnatomyTh>elementProps key</AnatomyTh>
            <AnatomyTh>CSS class</AnatomyTh>
          </tr>
        </thead>
        <tbody>
          {anatomy.map((part) => (
            <tr key={part.name}>
              <AnatomyTd style={{ fontWeight: 500 }}>{part.name}</AnatomyTd>
              <AnatomyTd><MonoCode>{part.htmlAttribute}</MonoCode></AnatomyTd>
              <AnatomyTd><MonoCode>{part.cssClass}</MonoCode></AnatomyTd>
            </tr>
          ))}
        </tbody>
      </AnatomyTable>
    )}
  </section>
);

export const PropsSection: FunctionComponent<{ props: PropDef[] }> = ({ props }) => (
  <section id="section-props">
    <Text variant="h4" as="h2" style={{ marginBottom: 12 }}>Props</Text>
    <PropsTable props={props} />
  </section>
);
