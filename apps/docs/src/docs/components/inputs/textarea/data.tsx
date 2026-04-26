import { ChangeEvent, useState } from 'react';
import { Textarea } from '@juliensouki/seedui';
import { ComponentDoc } from '../../../types';

function TextareaExample() {
  const [value, setValue] = useState('');
  return (
    <Textarea
      value={value}
      onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setValue(e.target.value)}
      label="Message"
      placeholder="Type your message..."
      width={300}
    />
  );
}

export const textareaDoc: ComponentDoc = {
  name: 'Textarea',
  category: 'Inputs',
  description: 'Multi-line field for entering longer text like messages, comments, or notes.',
  overview: 'A multi-line text field that shares the same styling as Input. Can be made resizable. For single-line values, use Input instead.',
  props: [
    { name: 'value', type: 'string', default: '—', description: 'Controlled value. Required.' },
    { name: 'label', type: 'string', default: '—', description: 'Label text.' },
    { name: 'placeholder', type: 'string', default: '—', description: 'Placeholder text.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the textarea.' },
    { name: 'width', type: 'string | number', default: '—', description: 'Component width.' },
    { name: 'isResizable', type: 'boolean', default: '—', description: 'Allow the user to resize.' },
    { name: 'onChange', type: 'ChangeEventHandler', default: '—', description: 'Change handler.' },
  ],
  example: TextareaExample,
  code: `const [value, setValue] = useState('');

<Textarea
  value={value}
  onChange={(e) => setValue(e.target.value)}
  label="Message"
  placeholder="Type here..."
/>`,
  anatomy: [
    { name: 'Root', htmlAttribute: 'root', cssClass: 'textarea-root' },
    { name: 'Input', htmlAttribute: 'input', cssClass: 'textarea-input' },
  ],
  usageExamples: [
    {
      code: `const [value, setValue] = useState('');

<Textarea
  value={value}
  onChange={(e) => setValue(e.target.value)}
  label="Bio"
  placeholder="Tell us about yourself..."
  width={300}
/>`,
    },
    {
      code: `const [value, setValue] = useState('');

<Textarea
  value={value}
  onChange={(e) => setValue(e.target.value)}
  label="Notes"
  placeholder="Add your notes..."
  isResizable
  width={300}
/>`,
    },
    {
      code: `<Textarea
  value="This content cannot be edited."
  onChange={() => {}}
  label="Read-only"
  disabled
  width={300}
/>`,
    },
  ],
  figmaUrl:
    'https://www.figma.com/design/KqnKUVKSX3GaltZs4ONXtx/Seedui---React-Library--Community-?node-id=236-968',
};
