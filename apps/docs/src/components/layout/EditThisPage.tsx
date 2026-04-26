import { FunctionComponent } from 'react';
import { Text, Divider, Button } from '@juliensouki/seedui';
import styled from '@juliensouki/seedui/sc';
import { PencilIcon } from 'lucide-react';
import { componentDocs } from '../../docs/components';
import { BASE_GITHUB_URL } from '../../constants';

const EDIT_URL_BASE = `${BASE_GITHUB_URL}/edit/main/apps/docs/src/docs`;

const staticPathMap: Record<string, string> = {
  '/getting-started/installation': 'getting-started/installation/installation.mdx',
  '/getting-started/quick-start': 'getting-started/quick-start/quick-start.mdx',
  '/theming/theme-provider': 'theme/theme-provider/theme-provider.mdx',
  '/theming/customization': 'theme/customization/customization.mdx',
  '/theming/dark-mode': 'theme/dark-mode/dark-mode.mdx',
  '/theming/component-styles': 'theme/component-styles/component-styles.mdx',
  '/theming/default-props': 'theme/default-props/default-props.mdx',
  '/tokens/colors': 'theme/colors/colors.tsx',
  '/tokens/typography': 'theme/typography/typography.tsx',
  '/tokens/spacing': 'theme/spacing/spacing.tsx',
  '/tokens/border-radius': 'theme/border-radius/border-radius.tsx',
  '/tokens/box-shadow': 'theme/box-shadow/box-shadow.tsx',
  '/tokens/breakpoints': 'theme/breakpoints/breakpoints.tsx',
};

function resolveSourcePath(path: string): string | null {
  const p = path === '/' ? '/' : path.replace(/\/$/, '');

  if (staticPathMap[p]) return staticPathMap[p];

  if (p.startsWith('/components/')) {
    const name = p.replace('/components/', '');
    const doc = componentDocs.find((d) => d.name === name);
    if (!doc) return null;
    const categorySlug = doc.category.toLowerCase().replace(/ /g, '-');
    const nameKebab = name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    return `components/${categorySlug}/${nameKebab}/${nameKebab}.mdx`;
  }

  return null;
}

const Wrapper = styled.div(({ theme }) => ({
  marginTop: theme.spacing(6),
}));

const Content = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  padding: `${theme.spacing(2)}px 0 ${theme.spacing(2)}px`,
}));

const Heading = styled(Text)(({ theme }) => ({
  marginBottom: theme.spacing(1.5),
}));

const Body = styled(Text)(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    color: isLight ? theme.colors.neutral[600] : theme.colors.neutral[900],
    marginBottom: theme.spacing(3),
    maxWidth: 520,
  };
});

interface EditThisPageProps {
  currentPath?: string;
}

export const EditThisPage: FunctionComponent<EditThisPageProps> = ({ currentPath }) => {
  const path = currentPath || (typeof window !== 'undefined' ? window.location.pathname : '');
  const relPath = resolveSourcePath(path);
  if (!relPath) return null;

  const url = `${EDIT_URL_BASE}/${relPath}`;
  return (
    <Wrapper>
      <Divider />
      <Content>
        <Heading variant="h6" as="h3">
          Help improve this page
        </Heading>
        <Body variant="p">
          Found a typo, something unclear, or a missing detail? You can edit this page directly on GitHub and open a
          pull request. Contributions of any size are welcome.
        </Body>
        <Button
          variant="filled"
          color="primary"
          size="md"
          onClick={() => window.open(url, '_blank', 'noopener,noreferrer')}
        >
          <PencilIcon size={14} style={{ marginRight: 6 }} />
          Edit this page on GitHub
        </Button>
      </Content>
    </Wrapper>
  );
};
