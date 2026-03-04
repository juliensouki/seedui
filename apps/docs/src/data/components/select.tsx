import { useState } from 'react';
import { Select } from '@seedui-react/seedui';
import { ComponentDoc } from './types';

function SelectExample() {
  const [value, setValue] = useState<string | null>(null);
  return (
    <Select
      options={[
        { value: 'apple', label: 'Apple' },
        { value: 'banana', label: 'Banana' },
        { value: 'cherry', label: 'Cherry' },
      ]}
      value={value}
      onChange={setValue}
      placeholder="Pick a fruit"
      width={300}
    />
  );
}

export const selectDoc: ComponentDoc = {
  name: 'Select',
  category: 'Inputs',
  description: 'A dropdown select component with search filtering.',
  overview: 'Select is a dropdown component for choosing a single value from a predefined list of options. It includes built-in search filtering, making it suitable for both short lists and longer option sets. Use it for form fields where the user must pick from a known set of values — such as country selectors, category pickers, or role assignments. Each option can include an optional icon for richer visual context. For free-form text entry, use Input instead.',
  props: [
    { name: 'options', type: 'SelectOption[]', default: '—', description: 'Array of { value, label, icon? }. Required.' },
    { name: 'onChange', type: '(value: string | null) => void', default: '—', description: 'Called when selection changes. Required.' },
    { name: 'value', type: 'string | null', default: 'null', description: 'Currently selected value.' },
    { name: 'placeholder', type: 'string', default: '—', description: 'Placeholder when nothing selected.' },
    { name: 'label', type: '{ text: string }', default: '—', description: 'Label configuration.' },
    { name: 'width', type: 'string | number', default: '—', description: 'Component width.' },
    { name: 'menuHeight', type: 'string | number', default: '—', description: 'Max height of the dropdown menu.' },
    { name: 'noOptionMessage', type: 'string', default: '—', description: 'Message when no options match search.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the select.' },
  ],
  anatomy: [
    { name: 'Root', htmlAttribute: 'rootContainerProps', cssClass: '.select-root' },
    { name: 'Select container', htmlAttribute: 'selectContainerProps', cssClass: '.select-container' },
    { name: 'Input', htmlAttribute: 'inputProps', cssClass: '—' },
    { name: 'Arrow', htmlAttribute: '—', cssClass: '.select-arrow-container' },
    { name: 'Menu', htmlAttribute: '—', cssClass: '.select-menu-container' },
  ],
  example: SelectExample,
  code: `const [value, setValue] = useState(null);

<Select
  options={[
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
  ]}
  value={value}
  onChange={setValue}
  placeholder="Pick a fruit"
/>`,
  usageExamples: [
    {
      title: 'Basic select',
      description: 'A controlled dropdown with a list of options. The built-in search lets users filter long lists by typing.',
      code: `const [value, setValue] = useState(null);

<Select
  options={[
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'cherry', label: 'Cherry' },
    { value: 'mango', label: 'Mango' },
  ]}
  value={value}
  onChange={setValue}
  placeholder="Pick a fruit"
  width={300}
/>`,
    },
    {
      title: 'With label',
      description: 'Add a label above the select to give context about what the user is choosing.',
      code: `const [value, setValue] = useState(null);

<Select
  options={[
    { value: 'admin', label: 'Admin' },
    { value: 'editor', label: 'Editor' },
    { value: 'viewer', label: 'Viewer' },
  ]}
  value={value}
  onChange={setValue}
  placeholder="Choose a role"
  label={{ text: 'Role' }}
  width={300}
/>`,
    },
    {
      title: 'With icons',
      description: 'Each option can include an icon element for richer visual context. Pass any React element as the icon prop.',
      code: `const [value, setValue] = useState(null);

<Select
  options={[
    { value: 'card', label: 'Credit Card', icon: <CreditCardIcon size={16} /> },
    { value: 'bank', label: 'Bank Transfer', icon: <LandmarkIcon size={16} /> },
    { value: 'wallet', label: 'Digital Wallet', icon: <WalletIcon size={16} /> },
    { value: 'phone', label: 'Mobile Pay', icon: <SmartphoneIcon size={16} /> },
  ]}
  value={value}
  onChange={setValue}
  placeholder="Payment method"
  width={300}
/>`,
    },
    {
      title: 'Disabled',
      description: 'A disabled select is non-interactive and visually muted.',
      code: `<Select
  options={[{ value: 'locked', label: 'Locked Option' }]}
  value="locked"
  onChange={() => {}}
  disabled
  width={300}
/>`,
    },
  ],
};
