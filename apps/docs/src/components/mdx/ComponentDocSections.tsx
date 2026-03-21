import { FunctionComponent, useEffect, useState } from 'react';
import { Text } from '@seedui-react/seedui';
import styled from '@seedui-react/seedui/sc';
import { ComponentPlayground } from '../content/ComponentPlayground';
import { PropsTable } from '../content/PropsTable';
import { ComponentSchema } from '../content/ComponentSchema';
import { SectionHeading } from './MDXComponents';
import type { PropDef, AnatomyPart } from '../../docs/types';

const AnatomyTable = styled('table')(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    width: '100%',
    borderCollapse: 'collapse' as const,
    fontSize: theme.typography.p.fontSize,
    fontFamily: 'inherit',
    marginTop: theme.spacing(2.5),
    color: isLight ? theme.colors.neutral[800] : theme.colors.neutral[800],
  };
});

const AnatomyTh = styled('th')(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    textAlign: 'left' as const,
    padding: `${theme.spacing(1.25)}px ${theme.spacing(2)}px ${theme.spacing(1.25)}px 0`,
    fontWeight: 600,
    fontSize: theme.typography.caption.fontSize,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.04em',
    color: isLight ? theme.colors.neutral[500] : theme.colors.neutral[800],
    borderBottom: `1px solid ${isLight ? theme.colors.neutral[200] : theme.colors.neutral[300]}`,
  };
});

const AnatomyTd = styled('td')(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    padding: `${theme.spacing(2)}px ${theme.spacing(2)}px ${theme.spacing(2)}px 0`,
    borderBottom: `1px solid ${isLight ? theme.colors.neutral[100] : theme.colors.neutral[200]}`,
    verticalAlign: 'top' as const,
    lineHeight: 1.5,
  };
});

const MonoCode = styled('code')(({ theme }) => {
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

export const OverviewDemo: FunctionComponent<{ example: FunctionComponent; previewBg?: 'contrast' | string }> = ({ example: Example, previewBg }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  return (
    <div style={{ marginBottom: 20 }}>
      <ComponentPlayground preview={mounted ? <Example /> : null} previewBg={previewBg} />
    </div>
  );
};

export const ImportSection: FunctionComponent<{ name: string }> = ({ name }) => (
  <section id="section-import">
    <SectionHeading id="section-import" style={{ marginBottom: 12 }}>Import</SectionHeading>
    <ComponentPlayground code={`import { ${name} } from '@seedui-react/seedui';`} readOnly />
  </section>
);

export const AnatomySection: FunctionComponent<{ name: string; anatomy?: AnatomyPart[] }> = ({ name, anatomy = [] }) => {
  return (
    <section id="section-anatomy">
      <SectionHeading id="section-anatomy" style={{ marginBottom: 12 }}>Anatomy</SectionHeading>
      <Text variant="p" style={{ marginBottom: 20 }}>
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
};

export const PropsSection: FunctionComponent<{ props: PropDef[] }> = ({ props }) => (
  <section id="section-props">
    <SectionHeading id="section-props" style={{ marginBottom: 12 }}>Props</SectionHeading>
    <PropsTable props={props} />
  </section>
);
