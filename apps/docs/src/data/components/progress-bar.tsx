import { ProgressBar } from '@seedui-react/seedui';
import { ComponentDoc } from './types';

function ProgressBarExample() {
  return (
    <div style={{ width: 320 }}>
      <ProgressBar value={60} />
    </div>
  );
}

export const progressBarDoc: ComponentDoc = {
  name: 'ProgressBar',
  category: 'Data Display',
  description: 'A horizontal bar that indicates the completion progress of a task or process.',
  overview:
    'ProgressBar displays a filled bar within a track to communicate progress toward a goal. Use it for file uploads, form completion, onboarding steps, or any workflow where the user benefits from knowing how far along a process is. It supports semantic colors and a customizable height.',
  props: [
    {
      name: 'value',
      type: 'number',
      default: '0',
      description: 'The current progress value, from 0 to 100.',
    },
    {
      name: 'height',
      type: 'string | number',
      default: '8',
      description: 'The height of the progress bar. Numbers are treated as pixels.',
    },
    {
      name: 'color',
      type: "'primary' | 'neutral' | 'success' | 'info' | 'warning' | 'error'",
      default: "'primary'",
      description: 'The color of the filled portion.',
    },
    {
      name: 'disableAnimation',
      type: 'boolean',
      default: 'false',
      description: 'Disables the shimmer animation on the progress bar fill.',
    },
  ],
  example: ProgressBarExample,
  code: `<ProgressBar value={60} />`,
  anatomy: [
    { name: 'Root / Track', htmlAttribute: 'rootDiv', cssClass: '—' },
    { name: 'Bar (fill)', htmlAttribute: 'barDiv', cssClass: '—' },
  ],
  usageExamples: [
    {
      title: 'Basic progress',
      description: 'Show simple progress toward completion.',
      code: `<ProgressBar value={45} />`,
    },
    {
      title: 'Custom heights',
      description: 'Adjust the height to fit the visual weight needed.',
      code: `<div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 280 }}>
  <ProgressBar value={60} height={8} />
  <ProgressBar value={60} height={12} />
</div>`,
    },
    {
      title: 'Semantic colors',
      description: 'Use color to communicate status — success for completion, warning for limits, error for failures.',
      code: `<div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 280 }}>
  <ProgressBar value={100} color="success" />
  <ProgressBar value={75} color="warning" />
  <ProgressBar value={30} color="error" />
  <ProgressBar value={50} color="info" />
</div>`,
    },
    {
      title: 'Without animation',
      description: 'Disable the shimmer effect for a static fill.',
      code: `<ProgressBar value={60} disableAnimation />`,
    },
    {
      title: 'Interactive progress',
      description: 'Combine with state to create a dynamic progress indicator.',
      code: `const [progress, setProgress] = useState(30);
<div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 280 }}>
  <ProgressBar value={progress} color={progress === 100 ? 'success' : 'primary'} />
  <div style={{ display: 'flex', gap: 8 }}>
    <Button size="sm" onClick={() => setProgress(p => Math.max(0, p - 10))}>−10</Button>
    <Button size="sm" onClick={() => setProgress(p => Math.min(100, p + 10))}>+10</Button>
  </div>
</div>`,
    },
  ],
};
