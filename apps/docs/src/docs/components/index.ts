export { type PropDef, type AnatomyPart, type ComponentCategory, type ComponentDoc, categoryOrder } from '../types';

import { ComponentDoc } from '../types';
import { avatarDoc } from './data-display/avatar/data';
import { avatarStackDoc } from './data-display/avatar-stack/data';
import { buttonDoc } from './buttons/button/data';
import { iconButtonDoc } from './buttons/icon-button/data';
import { cardDoc } from './layout/card/data';
import { dividerDoc } from './layout/divider/data';
import { inputDoc } from './inputs/input/data';
import { modalDoc } from './overlays/modal/data';
import { popoverDoc } from './overlays/popover/data';
import { progressBarDoc } from './data-display/progress-bar/data';
import { searchBarDoc } from './inputs/search-bar/data';
import { selectDoc } from './inputs/select/data';
import { skeletonDoc } from './data-display/skeleton/data';
import { stepperDoc } from './data-display/stepper/data';
import { tagDoc } from './data-display/tag/data';
import { tagSelectorDoc } from './inputs/tag-selector/data';
import { textDoc } from './data-display/text/data';
import { textareaDoc } from './inputs/textarea/data';
import { toggleDoc } from './inputs/toggle/data';
import { tooltipDoc } from './overlays/tooltip/data';

export const componentDocs: ComponentDoc[] = [
  avatarDoc,
  avatarStackDoc,
  buttonDoc,
  iconButtonDoc,
  cardDoc,
  dividerDoc,
  inputDoc,
  modalDoc,
  popoverDoc,
  progressBarDoc,
  searchBarDoc,
  selectDoc,
  skeletonDoc,
  stepperDoc,
  tagDoc,
  tagSelectorDoc,
  textDoc,
  textareaDoc,
  toggleDoc,
  tooltipDoc,
];
