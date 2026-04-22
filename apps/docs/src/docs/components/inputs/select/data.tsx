import { useState } from 'react';
import { Select } from '@seedui-react/seedui';
import { ComponentDoc } from '../../../types';

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
  description: 'Dropdown for picking a single value from a list of options.',
  overview: 'A dropdown for selecting one value from a list. Options can include icons. For free-form text, use Input instead.',
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
    { name: 'Root', htmlAttribute: 'root', cssClass: 'select-root' },
    { name: 'Container', htmlAttribute: 'container', cssClass: 'select-container' },
    { name: 'Arrow', htmlAttribute: 'arrow', cssClass: 'select-arrow' },
    { name: 'Menu', htmlAttribute: 'menu', cssClass: 'select-menu' },
    { name: 'Menu item', htmlAttribute: 'menuItem', cssClass: 'select-menu-item' },
    { name: 'Menu item icon', htmlAttribute: 'menuItemIcon', cssClass: 'select-menu-item-icon' },
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
