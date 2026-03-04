import { useState } from 'react';
import { TagSelector } from '@seedui-react/seedui';
import { ComponentDoc } from './types';

function TagSelectorExample() {
  const [tags, setTags] = useState<string[]>(['React', 'TypeScript']);
  return (
    <TagSelector
      tags={tags}
      onAddTag={(tag) => setTags([...tags, tag])}
      onRemoveTag={(tag) => setTags(tags.filter((t) => t !== tag))}
      placeholder="Add a tag..."
      width={300}
    />
  );
}

export const tagSelectorDoc: ComponentDoc = {
  name: 'TagSelector',
  category: 'Inputs',
  description: 'An input for adding and removing tags.',
  overview: 'TagSelector is an input that lets users build a list of tags by typing and pressing Enter. Use it for tagging systems, skill selectors, keyword inputs, or any field where users need to enter multiple free-form values. Each tag appears as a removable chip, and the maxTags prop can enforce an upper limit. It combines the functionality of Input and Tag into a single, cohesive control.',
  props: [
    { name: 'tags', type: 'string[]', default: '—', description: 'Current list of tags. Required.' },
    { name: 'onAddTag', type: '(tag: string) => void', default: '—', description: 'Called when a tag is added.' },
    { name: 'onRemoveTag', type: '(tag: string) => void', default: '—', description: 'Called when a tag is removed.' },
    { name: 'placeholder', type: 'string', default: '—', description: 'Input placeholder text.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the input.' },
    { name: 'width', type: 'string | number', default: '—', description: 'Component width.' },
    { name: 'maxTags', type: 'number', default: '—', description: 'Maximum number of tags allowed.' },
    { name: 'label', type: 'string', default: '—', description: 'Label text above the input.' },
    { name: 'buttonLabel', type: 'string', default: '—', description: 'Text on the add button.' },
  ],
  example: TagSelectorExample,
  code: `const [tags, setTags] = useState(['React']);

<TagSelector
  tags={tags}
  onAddTag={(tag) => setTags([...tags, tag])}
  onRemoveTag={(tag) => setTags(tags.filter(t => t !== tag))}
  placeholder="Add a tag..."
/>`,
  anatomy: [
    { name: 'Root', htmlAttribute: 'rootDiv', cssClass: '—' },
    { name: 'Input container', htmlAttribute: '—', cssClass: '—' },
    { name: 'Tags container', htmlAttribute: '—', cssClass: '—' },
  ],
  usageExamples: [
    {
      title: 'Basic tag selector',
      description: 'Type a value and press Enter to add a tag. Click the remove button on any tag to delete it.',
      code: `const [tags, setTags] = useState(['React', 'TypeScript']);

<TagSelector
  tags={tags}
  onAddTag={(tag) => setTags([...tags, tag])}
  onRemoveTag={(tag) => setTags(tags.filter(t => t !== tag))}
  placeholder="Add a skill..."
  width={300}
/>`,
    },
    {
      title: 'With label',
      description: 'Add a label to provide context about what kind of tags the user should enter.',
      code: `const [tags, setTags] = useState([]);

<TagSelector
  tags={tags}
  onAddTag={(tag) => setTags([...tags, tag])}
  onRemoveTag={(tag) => setTags(tags.filter(t => t !== tag))}
  label="Skills"
  placeholder="Add a skill..."
  width={300}
/>`,
    },
    {
      title: 'Max tags limit',
      description: 'Use maxTags to cap the number of tags a user can add. The input disables once the limit is reached.',
      code: `const [tags, setTags] = useState(['Design']);

<TagSelector
  tags={tags}
  onAddTag={(tag) => setTags([...tags, tag])}
  onRemoveTag={(tag) => setTags(tags.filter(t => t !== tag))}
  placeholder="Max 3 tags..."
  maxTags={3}
  width={300}
/>`,
    },
  ],
};
