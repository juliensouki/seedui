import { ChangeEvent, useState } from 'react';
import { SearchBar } from '@seedui-react/seedui';
import { ComponentDoc } from '../../../types';

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
  description: 'Text field with a search button for filtering or querying content.',
  overview: 'Combines a text field with a search button. Fires onSearch on button click or Enter, and onChange on every keystroke.',
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
    { name: 'Root', htmlAttribute: 'root', cssClass: 'search-bar-root' },
    { name: 'Icon', htmlAttribute: 'icon', cssClass: 'search-bar-icon' },
    { name: 'Input', htmlAttribute: 'input', cssClass: 'search-bar-input' },
    { name: 'Button', htmlAttribute: 'button', cssClass: 'search-bar-button' },
  ],
  usageExamples: [
    {
      code: `const [value, setValue] = useState('');

<SearchBar
  value={value}
  onChange={(e) => setValue(e.target.value)}
  placeholder="Search items..."
  width={300}
/>`,
    },
    {
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
