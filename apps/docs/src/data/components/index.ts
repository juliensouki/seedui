export { type PropDef, type AnatomyPart, type ComponentCategory, type ComponentDoc, categoryOrder } from './types';

import { ComponentDoc } from './types';
import { buttonDoc } from './button';
import { iconButtonDoc } from './icon-button';
import { cardDoc } from './card';
import { dividerDoc } from './divider';
import { inputDoc } from './input';
import { modalDoc } from './modal';
import { popoverDoc } from './popover';
import { searchBarDoc } from './search-bar';
import { selectDoc } from './select';
import { stepperDoc } from './stepper';
import { tagDoc } from './tag';
import { tagSelectorDoc } from './tag-selector';
import { textDoc } from './text';
import { textareaDoc } from './textarea';
import { toggleDoc } from './toggle';
import { tooltipDoc } from './tooltip';

export const componentDocs: ComponentDoc[] = [
  buttonDoc,
  iconButtonDoc,
  cardDoc,
  dividerDoc,
  inputDoc,
  modalDoc,
  popoverDoc,
  searchBarDoc,
  selectDoc,
  stepperDoc,
  tagDoc,
  tagSelectorDoc,
  textDoc,
  textareaDoc,
  toggleDoc,
  tooltipDoc,
];
