import { useState } from 'react';
import { TagSelector } from '@seedui-react/seedui';
import { ComponentDoc } from '../../../types';

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
  description: 'An input for managing a dynamic list of tags, useful for categories, filters, or metadata.',
  overview: 'An input for creating a list of tags. Type a value and press Enter to add it. Each tag can be removed individually. Supports a maximum tag limit.',
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
    { name: 'Root', htmlAttribute: 'root', cssClass: 'tag-selector-root' },
    { name: 'Input container', htmlAttribute: 'inputContainer', cssClass: 'tag-selector-input-container' },
    { name: 'Input', htmlAttribute: 'input', cssClass: 'tag-selector-input' },
    { name: 'Button', htmlAttribute: 'button', cssClass: 'tag-selector-button' },
    { name: 'Tags container', htmlAttribute: 'tagsContainer', cssClass: 'tag-selector-tags-container' },
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
