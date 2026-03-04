import { ChangeEvent, useState } from 'react';
import { SearchBar } from '@seedui-react/seedui';
import { ComponentDoc } from './types';

function SearchBarExample() {
  const [value, setValue] = useState('');
  return (
    <SearchBar
      value={value}
      onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
      placeholder="Search something..."
      width={300}
    />
  );
}

export const searchBarDoc: ComponentDoc = {
  name: 'SearchBar',
  category: 'Inputs',
  description: 'An input with a search button for filtering and querying.',
  overview: 'SearchBar is a purpose-built input for search and filtering workflows. It combines a text field with a dedicated search button, signaling to users that the field is specifically for querying content. Use it for filtering lists, searching databases, or any find-as-you-type experience. The onSearch callback fires when the user clicks the button or presses Enter, while onChange fires on every keystroke for real-time filtering.',
  props: [
    { name: 'value', type: 'string', default: '—', description: 'Controlled input value. Required.' },
    { name: 'placeholder', type: 'string', default: '—', description: 'Placeholder text.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the search bar.' },
    { name: 'width', type: 'string | number', default: '—', description: 'Component width.' },
    { name: 'buttonLabel', type: 'string', default: '—', description: 'Text on the search button.' },
    { name: 'onChange', type: 'ChangeEventHandler', default: '—', description: 'Input change handler.' },
    { name: 'onSearch', type: '() => void', default: '—', description: 'Called when search is triggered.' },
    { name: 'inputValidation', type: '(value: string) => boolean', default: '—', description: 'Validation function.' },
  ],
  example: SearchBarExample,
  code: `const [value, setValue] = useState('');

<SearchBar
  value={value}
  onChange={(e) => setValue(e.target.value)}
  placeholder="Search..."
/>`,
  anatomy: [
    { name: 'Container', htmlAttribute: '—', cssClass: '—' },
    { name: 'Search icon', htmlAttribute: '—', cssClass: '—' },
    { name: 'Search input', htmlAttribute: '—', cssClass: '—' },
    { name: 'Search button', htmlAttribute: '—', cssClass: '—' },
  ],
  usageExamples: [
    {
      title: 'Basic search',
      description: 'A controlled search bar with a placeholder. The onChange fires on every keystroke for real-time filtering.',
      code: `const [value, setValue] = useState('');

<SearchBar
  value={value}
  onChange={(e) => setValue(e.target.value)}
  placeholder="Search items..."
  width={300}
/>`,
    },
    {
      title: 'Custom button label',
      description: 'Change the search button text with the buttonLabel prop to match your context.',
      code: `const [value, setValue] = useState('');

<SearchBar
  value={value}
  onChange={(e) => setValue(e.target.value)}
  placeholder="Find users..."
  buttonLabel="Find"
  width={300}
/>`,
    },
    {
      title: 'Disabled',
      description: 'A disabled search bar prevents interaction. Use it when search is temporarily unavailable.',
      code: `<SearchBar
  value=""
  onChange={() => {}}
  placeholder="Search disabled"
  disabled
  width={300}
/>`,
    },
  ],
};
