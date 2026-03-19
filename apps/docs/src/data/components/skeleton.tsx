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
  description: 'Animated placeholder that previews content while it loads.',
  overview: 'Shows a shimmering placeholder in place of content that hasn\'t loaded yet. Comes in text, circular, rectangular, and rounded variants with pulse or wave animations.',
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
  anatomy: [],
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
