import { ProgressBar } from '@seedui-react/seedui';
import { ComponentDoc } from '../../../types';

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
  description: 'Horizontal bar that shows how far along a task or process is.',
  overview: 'A filled bar inside a track that communicates progress. Supports semantic colors and adjustable height.',
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
    { name: 'Track', htmlAttribute: 'root', cssClass: 'progress-bar-track' },
    { name: 'Fill', htmlAttribute: 'fill', cssClass: 'progress-bar-fill' },
  ],
  usageExamples: [
    {
      code: `<ProgressBar value={45} />`,
    },
    {
      code: `<div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 280 }}>
  <ProgressBar value={60} height={8} />
  <ProgressBar value={60} height={12} />
</div>`,
    },
    {
      code: `<div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 280 }}>
  <ProgressBar value={100} color="success" />
  <ProgressBar value={75} color="warning" />
  <ProgressBar value={30} color="error" />
  <ProgressBar value={50} color="info" />
</div>`,
    },
    {
      code: `<ProgressBar value={60} disableAnimation />`,
    },
    {
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
