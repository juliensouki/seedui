import { Divider, Text } from '@juliensouki/seedui';
import { ComponentDoc } from '../../../types';

function DividerExample() {
  return (
    <div style={{ maxWidth: 320 }}>
      <Text variant="p">Above</Text>
      <Divider />
      <Text variant="p">Below</Text>
    </div>
  );
}

export const dividerDoc: ComponentDoc = {
  name: 'Divider',
  category: 'Layout',
  description: 'Line that separates content sections horizontally or vertically.',
  overview: 'A thin line to visually divide content. Supports horizontal and vertical orientations with adjustable spacing.',
  props: [
    { name: 'vertical', type: 'boolean', default: 'false', description: 'Render as a vertical line.' },
    { name: 'width', type: 'number | string', default: '—', description: 'Width (horizontal only).' },
    { name: 'height', type: 'number | string', default: '—', description: 'Height (vertical only).' },
    { name: 'spacing', type: 'number', default: '15', description: 'Margin around the divider.' },
    { name: 'childrenSpacing', type: 'number', default: '12', description: 'Spacing between text label and line.' },
  ],
  example: DividerExample,
  code: `<Divider />
<Divider vertical height={40} />`,
  anatomy: [
    { name: 'Root', htmlAttribute: 'root', cssClass: 'divider-root' },
    { name: 'Line', htmlAttribute: 'line', cssClass: 'divider-line' },
    { name: 'Children', htmlAttribute: 'children', cssClass: 'divider-children' },
  ],
  usageExamples: [
    {
      code: `<Text variant="p">Section one</Text>
<Divider spacing={20} />
<Text variant="p">Section two</Text>`,
    },
    {
      layout: { display: 'flex', alignItems: 'center', gap: 12 },
      code: `<Text variant="p">Left</Text>
<Divider vertical height={24} />
<Text variant="p">Right</Text>`,
    },
    {
      layout: { maxWidth: 320 },
      code: `<Text variant="p">Section one</Text>
<Divider><Text variant="p">or</Text></Divider>
<Text variant="p">Section two</Text>`,
    },
    {
      code: `<Text variant="p">spacing=8</Text>
<Divider spacing={8} />
<Text variant="p">spacing=20 (default)</Text>
<Divider spacing={20} />
<Text variant="p">spacing=40</Text>
<Divider spacing={40} />
<Text variant="p">End</Text>`,
    },
  ],
};
