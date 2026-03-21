import { ChangeEvent, useState } from 'react';
import { Input } from '@seedui-react/seedui';
import { ComponentDoc } from '../../../types';

function InputExample() {
  const [value, setValue] = useState('');
  return (
    <Input
      value={value}
      onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
      label="Username"
      placeholder="Enter your username"
      width={300}
    />
  );
}

export const inputDoc: ComponentDoc = {
  name: 'Input',
  category: 'Inputs',
  description: 'Field for entering short text like names, emails, or passwords.',
  overview: 'A single-line text field with support for labels, icons, and validation. For multi-line content, use Textarea instead.',
  props: [
    { name: 'value', type: 'string', default: '—', description: 'Controlled input value. Required.' },
    { name: 'label', type: 'string', default: '—', description: 'Label text above the input.' },
    { name: 'placeholder', type: 'string', default: '—', description: 'Placeholder text.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the input.' },
    { name: 'type', type: "'email' | 'number' | 'password' | 'tel' | 'text' | 'url'", default: "'text'", description: 'HTML input type.' },
    { name: 'width', type: 'string | number', default: '—', description: 'Input width.' },
    { name: 'inputIcon', type: '{ icon: ReactNode; placement?: "left" | "right" }', default: '—', description: 'Icon to display inside the input.' },
    { name: 'inputValidation', type: '(value: string) => boolean', default: '—', description: 'Validation function returning true if valid.' },
    { name: 'onChange', type: 'ChangeEventHandler', default: '—', description: 'Change handler.' },
  ],
  example: InputExample,
  code: `const [value, setValue] = useState('');

<Input
  value={value}
  onChange={(e) => setValue(e.target.value)}
  label="Username"
  placeholder="Enter your username"
/>`,
  anatomy: [
    { name: 'Root', htmlAttribute: 'root', cssClass: 'input-root' },
    { name: 'Container', htmlAttribute: 'container', cssClass: 'input-container' },
    { name: 'Input', htmlAttribute: 'input', cssClass: 'input-field' },
    { name: 'Icon container', htmlAttribute: 'iconContainer', cssClass: 'input-icon-container' },
    { name: 'Validation icon', htmlAttribute: 'validationIcon', cssClass: 'input-validation-icon' },
  ],
  usageExamples: [
    {
      title: 'Basic input',
      description: 'A controlled text input with a label and placeholder. This is the most common usage pattern.',
      code: `const [value, setValue] = useState('');

<Input
  value={value}
  onChange={(e) => setValue(e.target.value)}
  label="Email"
  placeholder="you@example.com"
  width={300}
/>`,
    },
    {
      title: 'Password input',
      description: 'Set type to "password" to mask the input. The browser handles toggling visibility natively.',
      code: `const [value, setValue] = useState('');

<Input
  value={value}
  onChange={(e) => setValue(e.target.value)}
  label="Password"
  placeholder="Enter your password"
  type="password"
  width={300}
/>`,
    },
    {
      title: 'With validation',
      description: 'Pass a validation function to provide real-time visual feedback. The function receives the current value and should return true if valid.',
      code: `const [value, setValue] = useState('');

<Input
  value={value}
  onChange={(e) => setValue(e.target.value)}
  label="Email"
  placeholder="you@example.com"
  inputValidation={(v) => /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(v)}
  width={300}
/>`,
    },
    {
      title: 'Disabled',
      description: 'A disabled input is visually muted and does not accept user interaction.',
      code: `<Input
  value="Read only value"
  onChange={() => {}}
  label="Disabled field"
  disabled
  width={300}
/>`,
    },
  ],
};
