import { Text, Tooltip } from '@seedui-react/seedui';
import { ComponentDoc } from './types';

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
  description: 'A small floating label that appears on hover.',
  overview: 'Tooltip displays a short text label when the user hovers over or focuses an element. Use it to provide additional context for icon buttons, truncated text, or any control where a brief explanation improves clarity. Tooltips appear after a short delay and disappear when the pointer leaves the target. For richer content like forms or lists, use Popover instead. The direction prop controls which side of the trigger the tooltip appears on.',
  props: [
    { name: 'text', type: 'string', default: '—', description: 'Tooltip text content. Required.' },
    { name: 'direction', type: "'top' | 'right' | 'bottom' | 'left'", default: "'top'", description: 'Position relative to the child.' },
    { name: 'children', type: 'ReactNode', default: '—', description: 'Element that triggers the tooltip. Required.' },
  ],
  example: TooltipExample,
  code: `<Tooltip text="Hello!" direction="right">
  <Text>Hover me</Text>
</Tooltip>`,
  anatomy: [
    { name: 'Root', htmlAttribute: 'rootDiv', cssClass: '—' },
    { name: 'Children wrapper', htmlAttribute: 'childrenWrapperDiv', cssClass: '—' },
    { name: 'Tooltip', htmlAttribute: 'tooltipSpan', cssClass: '—' },
  ],
  usageExamples: [
    {
      title: 'Directions',
      description: 'Control which side of the trigger the tooltip appears on. Choose the direction that avoids overlapping other content.',
      code: `<div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', padding: 40 }}>
  <Tooltip text="Top tooltip" direction="top">
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
  </Tooltip>
</div>`,
    },
    {
      title: 'On icon buttons',
      description: 'Tooltips are especially useful on icon buttons where the action may not be immediately obvious from the icon alone.',
      code: `<div style={{ display: 'flex', gap: 8 }}>
  <Tooltip text="Edit" direction="bottom">
    <IconButton variant="transparent" color="neutral">
      <GemIcon strokeWidth={1.8} />
    </IconButton>
  </Tooltip>
  <Tooltip text="Settings" direction="bottom">
    <IconButton variant="transparent" color="neutral">
      <GemIcon strokeWidth={1.8} />
    </IconButton>
  </Tooltip>
</div>`,
    },
  ],
};
