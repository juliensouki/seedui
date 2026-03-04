import { Stepper } from '@seedui-react/seedui';
import { ComponentDoc } from './types';

function StepperExample() {
  return <Stepper steps={['Account', 'Profile', 'Review']} activeStep={1} />;
}

export const stepperDoc: ComponentDoc = {
  name: 'Stepper',
  category: 'Data Display',
  description: 'A step indicator for multi-step flows.',
  overview: 'Stepper visualizes progress through a multi-step process. Use it for wizards, onboarding flows, checkout processes, or any sequence where users need to see where they are and what comes next. It displays each step as a labeled node connected by a track line, with the active step highlighted. Pair it with your own step content and navigation logic to build complete multi-step experiences.',
  props: [
    { name: 'steps', type: 'string[]', default: '—', description: 'Array of step labels. Required.' },
    { name: 'activeStep', type: 'number', default: '—', description: 'Zero-based index of the active step. Required.' },
  ],
  example: StepperExample,
  code: `<Stepper
  steps={['Account', 'Profile', 'Review']}
  activeStep={1}
/>`,
  anatomy: [
    { name: 'Container', htmlAttribute: '—', cssClass: '—' },
    { name: 'Step wrapper', htmlAttribute: '—', cssClass: '—' },
    { name: 'Step circle', htmlAttribute: '—', cssClass: '—' },
    { name: 'Step label', htmlAttribute: '—', cssClass: '—' },
  ],
  usageExamples: [
    {
      title: 'Step progression',
      description: 'Set activeStep to highlight the current step. Steps before it appear as completed, and steps after appear as upcoming.',
      code: `<div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
  <Stepper steps={['Account', 'Profile', 'Review']} activeStep={0} />
  <Stepper steps={['Account', 'Profile', 'Review']} activeStep={1} />
  <Stepper steps={['Account', 'Profile', 'Review']} activeStep={2} />
</div>`,
    },
    {
      title: 'Longer flows',
      description: 'Stepper works with any number of steps. It scales horizontally to fit the available space.',
      code: `<Stepper
  steps={['Cart', 'Shipping', 'Payment', 'Review', 'Confirmation']}
  activeStep={2}
/>`,
    },
  ],
};
