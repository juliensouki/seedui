import { Tag } from '@juliensouki/seedui';
import { ComponentDoc } from '../../../types';

function TagExample() {
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <Tag color="primary">Primary</Tag>
      <Tag color="success">Success</Tag>
      <Tag color="info">Info</Tag>
      <Tag color="warning">Warning</Tag>
      <Tag color="error">Error</Tag>
    </div>
  );
}

export const tagDoc: ComponentDoc = {
  name: 'Tag',
  category: 'Data Display',
  description: 'Compact label for showing categories, statuses, or keywords.',
  overview: 'A small colored badge for metadata like categories or statuses. Colors map to semantic meanings. Can be made removable for filter chips or selected values.',
  props: [
    { name: 'children', type: 'string', default: '—', description: 'Tag text content. Required.' },
    { name: 'color', type: "'primary' | 'neutral' | 'success' | 'info' | 'warning' | 'error'", default: "'primary'", description: 'Tag color scheme.' },
    { name: 'size', type: "'sm' | 'md'", default: "'md'", description: 'Tag size.' },
    { name: 'removable', type: 'boolean', default: 'false', description: 'Show a remove button.' },
    { name: 'onRemove', type: '() => void', default: '—', description: 'Called when remove is clicked.' },
  ],
  example: TagExample,
  code: `<Tag color="success">Success</Tag>
<Tag color="error" removable onRemove={() => {}}>
  Removable
</Tag>`,
  anatomy: [
    { name: 'Root', htmlAttribute: 'root', cssClass: 'tag-root' },
    { name: 'Remove button', htmlAttribute: 'removeButton', cssClass: 'tag-remove-button' },
  ],
  usageExamples: [
    {
      layout: { display: 'flex', gap: 8, flexWrap: 'wrap' },
      code: `<Tag color="primary">Primary</Tag>
<Tag color="neutral">Neutral</Tag>
<Tag color="success">Success</Tag>
<Tag color="info">Info</Tag>
<Tag color="warning">Warning</Tag>
<Tag color="error">Error</Tag>`,
    },
    {
      layout: { display: 'flex', gap: 8, alignItems: 'center' },
      code: `<Tag size="sm" color="primary">Small</Tag>
<Tag size="md" color="primary">Medium</Tag>`,
    },
    {
      layout: { display: 'flex', gap: 8, flexWrap: 'wrap' },
      code: `<Tag color="primary" removable onRemove={() => {}}>React</Tag>
<Tag color="info" removable onRemove={() => {}}>TypeScript</Tag>
<Tag color="success" removable onRemove={() => {}}>Node.js</Tag>`,
    },
  ],
  figmaUrl:
    'https://www.figma.com/design/KqnKUVKSX3GaltZs4ONXtx/Seedui---React-Library--Community-?node-id=132-227',
};
