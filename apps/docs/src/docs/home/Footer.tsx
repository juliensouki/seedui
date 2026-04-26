import { FunctionComponent } from 'react';
import { Text, Divider } from '@juliensouki/seedui';
import { useTheme } from '@juliensouki/seedui/sc';
import { BASE_GITHUB_URL } from '../../constants';

export const Footer: FunctionComponent = () => {
  const theme = useTheme();
  const isLight = theme.mode === 'light';
  return (
    <>
      <Divider spacing={0} style={{ marginBottom: 16 }} />
      <Text
        variant="caption"
        style={{
          textAlign: 'center',
          color: isLight ? theme.colors.neutral[500] : undefined,
          paddingBottom: 24,
        }}
      >
        Built by{' '}
        <a
          href="https://github.com/juliensouki"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'inherit', textDecoration: 'underline' }}
        >
          Julien Souki-Léon
        </a>
        {' · MIT License · '}
        <a
          href={BASE_GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'inherit', textDecoration: 'underline' }}
        >
          GitHub
        </a>
      </Text>
    </>
  );
};
