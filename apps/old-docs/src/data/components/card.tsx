import { Card, Text } from '@seedui-react/seedui';
import { ComponentDoc } from './types';

function CardExample() {
  return (
    <Card elementProps={{ rootDiv: { style: { padding: '16px 20px', maxWidth: 320 } } }}>
      <Text variant="h6">Card Title</Text>
      <Text variant="p" style={{ marginTop: 8 }}>This is some card content.</Text>
    </Card>
  );
}

export const cardDoc: ComponentDoc = {
  name: 'Card',
  category: 'Layout',
  description: 'Surface container that groups related content together.',
  overview: 'A wrapper that visually separates content sections. Available in default (elevated) and outlined (bordered) variants.',
  props: [
    { name: 'children', type: 'ReactNode', default: '—', description: 'Card content.' },
    { name: 'variant', type: "'default' | 'outlined'", default: "'default'", description: 'Visual style of the card.' },
  ],
  example: CardExample,
  code: `<Card variant="default">
  <Text variant="h6">Title</Text>
  <Text variant="p">Content goes here.</Text>
</Card>`,
  anatomy: [],
  usageExamples: [
    {
      title: 'Default variant',
      description: 'The default card has a subtle background and shadow, giving it a slightly elevated look that works well for dashboard widgets and content panels.',
      code: `<Card>
  <Text variant="h6">Dashboard Widget</Text>
  <Text variant="p" style={{ marginTop: 8 }}>
    This card uses the default variant with a soft elevation.
  </Text>
</Card>`,
    },
    {
      title: 'Outlined variant',
      description: 'The outlined variant uses a border instead of a shadow for a flatter appearance. It works well when you want clear boundaries without depth.',
      code: `<Card variant="outlined">
  <Text variant="h6">Settings Panel</Text>
  <Text variant="p" style={{ marginTop: 8 }}>
    This card uses the outlined variant with a border.
  </Text>
</Card>`,
    },
  ],
};
