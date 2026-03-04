import { FunctionComponent } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { styled, Text, Divider, IconButton } from '@seedui-react/seedui';
import { FigmaIcon, GithubIcon } from 'lucide-react';
import { componentDocs, type AnatomyPart } from '../data/components';
import { PropsTable } from '../components/PropsTable';
import { CodeBlock } from '../components/CodeBlock';
import { ComponentPlayground } from '../components/ComponentPlayground';
import { ComponentDemo } from '../components/ComponentDemo';
import { TableOfContents } from '../components/TableOfContents';
import { ComponentSchema } from '../components/ComponentSchema';
import { PageNavigation } from '../components/PageNavigation';

const PageLayout = styled('div')(() => ({
  display: 'flex',
  alignItems: 'flex-start',
}));

const MainContent = styled('div')(() => ({
  flex: 1,
  minWidth: 0,
}));

const Section = styled('section')(() => ({
  marginBottom: 40,
}));

const SectionTitle = styled(Text)(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    fontWeight: 600,
    color: isLight ? theme.colors.neutral[900] : theme.colors.neutral[100],
    fontSize: 18,
    letterSpacing: '0.01em',
    marginBottom: 12,
  };
});

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
    padding: '10px 0',
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
    padding: `${theme.spacing[200]}px 0`,
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

const tocItems = [
  { id: 'section-overview', label: 'Overview' },
  { id: 'section-import', label: 'Import' },
  { id: 'section-usage', label: 'Usage' },
  { id: 'section-anatomy', label: 'Anatomy' },
  { id: 'section-props', label: 'Props' },
];

export const ComponentPage: FunctionComponent = () => {
  const { name } = useParams<{ name: string }>();
  const doc = componentDocs.find((d) => d.name === name);

  if (!doc) {
    return <Navigate to="/" replace />;
  }

  const anatomy = doc.anatomy ?? [];

  return (
    <PageLayout>
      <MainContent>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <Text variant="h3">{doc.name}</Text>
            <Text variant="p" style={{ marginTop: 8, opacity: 0.7 }}>
              {doc.description}
            </Text>
          </div>
          <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
            <IconButton variant="transparent" color="neutral" size="sm">
              <FigmaIcon size={16} strokeWidth={1.8} />
            </IconButton>
            <IconButton variant="transparent" color="neutral" size="sm">
              <GithubIcon size={16} strokeWidth={1.8} />
            </IconButton>
          </div>
        </div>

        <Divider spacing={28} />

        <Section id="section-overview">
          <SectionTitle>Overview</SectionTitle>
          <ComponentDemo><doc.example /></ComponentDemo>
          <Text variant="p" style={{ lineHeight: 1.7, opacity: 0.8, marginTop: 20 }}>
            {doc.overview}
          </Text>
        </Section>

        <Section id="section-import">
          <SectionTitle>Import</SectionTitle>
          <CodeBlock code={`import { ${doc.name} } from '@seedui-react/seedui';`} />
        </Section>

        <Section id="section-usage">
          <SectionTitle>Usage</SectionTitle>
          {doc.usageExamples ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
              {doc.usageExamples.map((ex, i) => (
                <div key={i}>
                  <Text variant="p" style={{ marginBottom: 6, fontSize: 15, fontWeight: 600 }}>{ex.title}</Text>
                  <Text variant="p" style={{ opacity: 0.7, marginBottom: 12, lineHeight: 1.6 }}>
                    {ex.description}
                  </Text>
                  <ComponentPlayground code={ex.code} />
                </div>
              ))}
            </div>
          ) : (
            <ComponentPlayground code={doc.code} />
          )}
        </Section>

        <Section id="section-anatomy">
          <SectionTitle>Anatomy</SectionTitle>
          <Text variant="p" style={{ opacity: 0.7, lineHeight: 1.6, marginBottom: 20 }}>
            The diagram below shows the internal structure of the component. Each part can be customized
            either through the <code>htmlAttributes</code> prop or by targeting its CSS class.
          </Text>
          <ComponentSchema name={doc.name} />
          {anatomy.length > 0 && (
            <AnatomyTable>
              <thead>
                <tr>
                  <AnatomyTh>Part</AnatomyTh>
                  <AnatomyTh>htmlAttributes key</AnatomyTh>
                  <AnatomyTh>CSS class</AnatomyTh>
                </tr>
              </thead>
              <tbody>
                {anatomy.map((part: AnatomyPart) => (
                  <tr key={part.name}>
                    <AnatomyTd style={{ fontWeight: 500 }}>{part.name}</AnatomyTd>
                    <AnatomyTd><MonoCode>{part.htmlAttribute}</MonoCode></AnatomyTd>
                    <AnatomyTd><MonoCode>{part.cssClass}</MonoCode></AnatomyTd>
                  </tr>
                ))}
              </tbody>
            </AnatomyTable>
          )}
        </Section>

        <Section id="section-props">
          <SectionTitle>Props</SectionTitle>
          <PropsTable props={doc.props} />
        </Section>

        <PageNavigation />
      </MainContent>

      <TableOfContents items={tocItems} />
    </PageLayout>
  );
};
