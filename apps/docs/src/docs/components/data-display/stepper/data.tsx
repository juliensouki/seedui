import { Stepper } from '@juliensouki/seedui';
import { ComponentDoc } from '../../../types';

function StepperExample() {
  return <Stepper steps={['Account', 'Profile', 'Review']} activeStep={1} />;
}

export const stepperDoc: ComponentDoc = {
  name: 'Stepper',
  category: 'Data Display',
  description: 'Visual indicator showing progress through a sequence of steps.',
  overview: 'Displays a row of labeled steps with the current one highlighted. Steps before the active one appear as completed.',
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
    { name: 'Root', htmlAttribute: 'root', cssClass: 'stepper-root' },
    { name: 'Step', htmlAttribute: 'step', cssClass: 'stepper-step' },
    { name: 'Step circle', htmlAttribute: 'stepCircle', cssClass: 'stepper-step-circle' },
    { name: 'Step label', htmlAttribute: 'stepLabel', cssClass: 'stepper-step-label' },
  ],
  usageExamples: [
    {
      layout: { display: 'flex', flexDirection: 'column', gap: 24 },
      code: `<Stepper steps={['Account', 'Profile', 'Review']} activeStep={0} />
<Stepper steps={['Account', 'Profile', 'Review']} activeStep={1} />
<Stepper steps={['Account', 'Profile', 'Review']} activeStep={2} />`,
    },
    {
      code: `<Stepper
  steps={['Cart', 'Shipping', 'Payment', 'Review', 'Confirmation']}
  activeStep={2}
/>`,
    },
  ],
  figmaUrl:
    'https://www.figma.com/design/KqnKUVKSX3GaltZs4ONXtx/Seedui---React-Library--Community-?node-id=1524-631',
};
