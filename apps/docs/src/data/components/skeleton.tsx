import { Skeleton } from '@seedui-react/seedui';
import { ComponentDoc } from './types';

function SkeletonExample() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: 240 }}>
      <Skeleton variant="text" />
      <Skeleton variant="text" />
      <Skeleton variant="text" width="60%" />
    </div>
  );
}

export const skeletonDoc: ComponentDoc = {
  name: 'Skeleton',
  category: 'Data Display',
  description: 'A placeholder component that indicates content is loading.',
  overview:
    'Skeleton displays a placeholder preview of content before the actual data has loaded. It reduces perceived load time by giving users a visual hint of what to expect. Use it in place of spinners when the layout of the upcoming content is known — for example, text blocks, avatars, or card layouts. Skeletons support pulse and wave animations, and come in text, circular, rectangular, and rounded variants.',
  props: [
    {
      name: 'variant',
      type: "'text' | 'circular' | 'rectangular' | 'rounded'",
      default: "'text'",
      description: 'The shape of the skeleton.',
    },
    {
      name: 'width',
      type: 'string | number',
      default: "'100%'",
      description: 'Width of the skeleton. Numbers are treated as pixels.',
    },
    {
      name: 'height',
      type: 'string | number',
      default: 'Varies by variant',
      description: 'Height of the skeleton. Numbers are treated as pixels.',
    },
    {
      name: 'animation',
      type: "'pulse' | 'wave' | 'none'",
      default: "'pulse'",
      description: 'The animation style applied to the skeleton.',
    },
  ],
  example: SkeletonExample,
  code: `<div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: 240 }}>
  <Skeleton variant="text" />
  <Skeleton variant="text" />
  <Skeleton variant="text" width="60%" />
</div>`,
  anatomy: [{ name: 'Root', htmlAttribute: 'rootDiv', cssClass: '—' }],
  usageExamples: [
    {
      title: 'Text placeholder',
      description:
        'Use the text variant to represent lines of text content. Vary the width to mimic natural paragraph shapes.',
      code: `<div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: 240 }}>
  <Skeleton variant="text" />
  <Skeleton variant="text" />
  <Skeleton variant="text" width="60%" />
</div>`,
    },
    {
      title: 'Circular avatar placeholder',
      description:
        'Use the circular variant for avatar or icon placeholders. Set width and height to match the target element size.',
      code: `<Skeleton variant="circular" width={48} height={48} />`,
    },
    {
      title: 'Rectangular content block',
      description:
        'Use the rectangular variant for image or media placeholders where sharp corners are appropriate.',
      code: `<Skeleton variant="rectangular" width={240} height={140} />`,
    },
    {
      title: 'Rounded card placeholder',
      description:
        'Use the rounded variant for card-like placeholders with soft corners.',
      code: `<Skeleton variant="rounded" width={240} height={140} />`,
    },
    {
      title: 'Wave animation',
      description:
        'Switch to the wave animation for a shimmer effect that sweeps across the skeleton.',
      code: `<Skeleton variant="rectangular" width={240} height={140} animation="wave" />`,
    },
  ],
};
