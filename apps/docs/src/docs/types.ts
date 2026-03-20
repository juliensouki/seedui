import { FunctionComponent } from 'react';

export interface PropDef {
  name: string;
  type: string;
  default: string;
  description: string;
}

export type ComponentCategory = 'Buttons' | 'Inputs' | 'Data Display' | 'Layout' | 'Overlays';

export const categoryOrder: ComponentCategory[] = [
  'Buttons',
  'Inputs',
  'Data Display',
  'Layout',
  'Overlays',
];

export interface AnatomyPart {
  name: string;
  htmlAttribute: string;
  cssClass: string;
}

export interface UsageExample {
  title: string;
  description: string;
  code: string;
}

export interface ComponentDoc {
  name: string;
  category: ComponentCategory;
  description: string;
  overview: string;
  props: PropDef[];
  example: FunctionComponent;
  code: string;
  usageExamples?: UsageExample[];
  anatomy?: AnatomyPart[];
}
