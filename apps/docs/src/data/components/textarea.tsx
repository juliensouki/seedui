import { ChangeEvent, useState } from 'react';
import { Textarea } from '@seedui-react/seedui';
import { ComponentDoc } from './types';

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
  description: 'A multi-line text input with optional label and resize control.',
  overview: 'Textarea is a multi-line text field for longer-form content such as messages, descriptions, comments, or notes. It shares the same label and styling conventions as Input for a consistent form experience. The isResizable prop controls whether users can drag to resize the field. Use Textarea when the expected input is more than a single line — for short values like names or emails, use Input instead.',
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
    { name: 'Root', htmlAttribute: 'rootDiv', cssClass: '—' },
    { name: 'Textarea', htmlAttribute: 'textarea', cssClass: '—' },
  ],
  usageExamples: [
    {
      title: 'Basic textarea',
      description: 'A controlled multi-line input with a label and placeholder. Ideal for comments, descriptions, or any longer-form text.',
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
      title: 'Resizable',
      description: 'Set isResizable to let users drag the corner to resize the textarea to fit their content.',
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
      title: 'Disabled',
      description: 'A disabled textarea is visually muted and prevents any interaction.',
      code: `<Textarea
  value="This content cannot be edited."
  onChange={() => {}}
  label="Read-only"
  disabled
  width={300}
/>`,
    },
  ],
};
