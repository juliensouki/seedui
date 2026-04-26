import { Text } from '@juliensouki/seedui';
import { ComponentDoc } from '../../../types';

function TextExample() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Text variant="h1">Heading 1</Text>
      <Text variant="h2">Heading 2</Text>
      <Text variant="h3">Heading 3</Text>
      <Text variant="p">Paragraph text</Text>
      <Text variant="caption">Caption text</Text>
      <Text variant="small">Small text</Text>
    </div>
  );
}

export const textDoc: ComponentDoc = {
  name: 'Text',
  category: 'Data Display',
  description: 'Renders text with consistent styling across headings, paragraphs, and captions.',
  overview: 'The base component for all text content. Each variant maps to a semantic HTML element (h1–h6, p, span) with predefined styles.',
  props: [
    { name: 'variant', type: "'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'caption' | 'small'", default: "'p'", description: 'Typography variant.' },
    { name: 'bottomSpacing', type: 'boolean', default: 'false', description: 'Add margin below the text.' },
    { name: 'children', type: 'ReactNode', default: '—', description: 'Text content.' },
  ],
  example: TextExample,
  code: `<Text variant="h1">Heading 1</Text>
<Text variant="p">Paragraph text</Text>
<Text variant="caption">Caption text</Text>`,
  anatomy: [],
  usageExamples: [
    {
      layout: { display: 'flex', flexDirection: 'column', gap: 4 },
      code: `<Text variant="h1">Heading 1</Text>
<Text variant="h2">Heading 2</Text>
<Text variant="h3">Heading 3</Text>
<Text variant="h4">Heading 4</Text>
<Text variant="h5">Heading 5</Text>
<Text variant="h6">Heading 6</Text>`,
    },
    {
      layout: { display: 'flex', flexDirection: 'column', gap: 8 },
      code: `<Text variant="p">This is paragraph text for body content.</Text>
<Text variant="caption">This is caption text for labels and metadata.</Text>
<Text variant="small">This is small text for fine print.</Text>`,
    },
    {
      code: `<Text variant="h4" bottomSpacing>Section Title</Text>
<Text variant="p">Paragraph that follows the heading with automatic spacing applied.</Text>`,
    },
  ],
};
