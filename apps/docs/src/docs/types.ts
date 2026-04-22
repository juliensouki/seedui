import { CSSProperties, FunctionComponent } from 'react';

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
  code: string;
  layout?: CSSProperties;
}

export interface ComponentDoc {
  name: string;
  category: ComponentCategory;
  description: string;
  overview: string;
  props: PropDef[];
  example: FunctionComponent;
  code: string;
  layout?: CSSProperties;
  usageExamples?: UsageExample[];
  anatomy?: AnatomyPart[];
}
