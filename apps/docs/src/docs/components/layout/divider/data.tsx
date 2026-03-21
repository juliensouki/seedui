import { Divider, Text } from '@seedui-react/seedui';
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
      title: 'Horizontal divider',
      description: 'A horizontal divider separates stacked content. Use the spacing prop to control the vertical margin around it.',
      code: `<div>
  <Text variant="p">Section one</Text>
  <Divider spacing={20} />
  <Text variant="p">Section two</Text>
</div>`,
    },
    {
      title: 'Vertical divider',
      description: 'A vertical divider separates side-by-side content inside a flex layout. Set a height to match the surrounding elements.',
      code: `<div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
  <Text variant="p">Left</Text>
  <Divider vertical height={24} />
  <Text variant="p">Right</Text>
</div>`,
    },
    {
      title: 'With text',
      description: 'Pass children to display a label between the two lines.',
      code: `<div style={{ maxWidth: 320 }}>
  <Text variant="p">Section one</Text>
  <Divider><Text variant="p">or</Text></Divider>
  <Text variant="p">Section two</Text>
</div>`,
    },
    {
      title: 'Custom spacing',
      description: 'Adjust the spacing prop to increase or decrease the breathing room around the divider.',
      code: `<div>
  <Text variant="p">spacing=8</Text>
  <Divider spacing={8} />
  <Text variant="p">spacing=20 (default)</Text>
  <Divider spacing={20} />
  <Text variant="p">spacing=40</Text>
  <Divider spacing={40} />
  <Text variant="p">End</Text>
</div>`,
    },
  ],
};
