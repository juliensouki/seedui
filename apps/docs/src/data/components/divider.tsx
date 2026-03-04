import { Divider, Text } from '@seedui-react/seedui';
import { ComponentDoc } from './types';

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
  description: 'A horizontal or vertical separator line.',
  overview: 'Divider creates a visual separation between content sections. Use it to break up long pages, separate list items, or distinguish groups of related controls. It supports both horizontal and vertical orientations — horizontal dividers work well between stacked sections, while vertical dividers are useful inside flex layouts like toolbars or side-by-side panels. The spacing prop lets you control how much breathing room surrounds the line.',
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
    { name: 'Root', htmlAttribute: '—', cssClass: '—' },
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
      title: 'Custom spacing',
      description: 'Adjust the spacing prop to increase or decrease the breathing room around the divider.',
      code: `<div>
  <Text variant="p">Tight spacing</Text>
  <Divider spacing={8} />
  <Text variant="p">Wide spacing below</Text>
  <Divider spacing={40} />
  <Text variant="p">After wide spacing</Text>
</div>`,
    },
  ],
};
