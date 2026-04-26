import { Text, Tooltip } from '@juliensouki/seedui';
import { ComponentDoc } from '../../../types';

function TooltipExample() {
  return (
    <Tooltip text="Hello from tooltip!" direction="right">
      <Text variant="p" style={{ cursor: 'default' }}>Hover over me</Text>
    </Tooltip>
  );
}

export const tooltipDoc: ComponentDoc = {
  name: 'Tooltip',
  category: 'Overlays',
  description: 'Short text label that appears on hover to explain an element.',
  overview: 'Shows a brief text hint when hovering or focusing an element. For richer content, use Popover instead.',
  props: [
    { name: 'text', type: 'string', default: '—', description: 'Tooltip text content. Required.' },
    { name: 'direction', type: "'top' | 'right' | 'bottom' | 'left'", default: "'top'", description: 'Position relative to the child.' },
    { name: 'children', type: 'ReactNode', default: '—', description: 'Element that triggers the tooltip. Required.' },
    { name: 'padding', type: 'number | string', default: "'8px 12px'", description: 'Inner padding in px (number) or any valid CSS padding string.' },
  ],
  example: TooltipExample,
  code: `<Tooltip text="Hello!" direction="right">
  <Text>Hover me</Text>
</Tooltip>`,
  anatomy: [
    { name: 'Root', htmlAttribute: 'root', cssClass: 'tooltip-root' },
    { name: 'Trigger', htmlAttribute: 'trigger', cssClass: 'tooltip-trigger' },
    { name: 'Tooltip', htmlAttribute: 'tooltip', cssClass: 'tooltip-content' },
  ],
  usageExamples: [
    {
      layout: { display: 'flex', gap: 24, flexWrap: 'wrap', padding: 40 },
      code: `<Tooltip text="Top tooltip" direction="top">
  <Button variant="transparent" color="neutral">Top</Button>
</Tooltip>
<Tooltip text="Right tooltip" direction="right">
  <Button variant="transparent" color="neutral">Right</Button>
</Tooltip>
<Tooltip text="Bottom tooltip" direction="bottom">
  <Button variant="transparent" color="neutral">Bottom</Button>
</Tooltip>
<Tooltip text="Left tooltip" direction="left">
  <Button variant="transparent" color="neutral">Left</Button>
</Tooltip>`,
    },
    {
      layout: { display: 'flex', gap: 8, paddingTop: 40 },
      code: `<Tooltip text="Edit" direction="top">
  <IconButton variant="transparent" color="neutral">
    <PencilIcon strokeWidth={1.8} />
  </IconButton>
</Tooltip>
<Tooltip text="Settings" direction="top">
  <IconButton variant="transparent" color="neutral">
    <SettingsIcon strokeWidth={1.8} />
  </IconButton>
</Tooltip>`,
    },
  ],
  figmaUrl:
    'https://www.figma.com/design/KqnKUVKSX3GaltZs4ONXtx/Seedui---React-Library--Community-?node-id=137-79',
};
