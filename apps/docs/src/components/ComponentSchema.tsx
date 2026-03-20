import { FunctionComponent } from 'react';

import AvatarSchema from '../docs/components/data-display/avatar/anatomy';
import AvatarStackSchema from '../docs/components/data-display/avatar-stack/anatomy';
import ButtonSchema from '../docs/components/buttons/button/anatomy';
import IconButtonSchema from '../docs/components/buttons/icon-button/anatomy';
import CardSchema from '../docs/components/layout/card/anatomy';
import DividerSchema from '../docs/components/layout/divider/anatomy';
import SearchBarSchema from '../docs/components/inputs/search-bar/anatomy';
import InputSchema from '../docs/components/inputs/input/anatomy';
import ModalSchema from '../docs/components/overlays/modal/anatomy';
import PopoverSchema from '../docs/components/overlays/popover/anatomy';
import ProgressBarSchema from '../docs/components/data-display/progress-bar/anatomy';
import SelectSchema from '../docs/components/inputs/select/anatomy';
import SkeletonSchema from '../docs/components/data-display/skeleton/anatomy';
import StepperSchema from '../docs/components/data-display/stepper/anatomy';
import TagSchema from '../docs/components/data-display/tag/anatomy';
import TagSelectorSchema from '../docs/components/inputs/tag-selector/anatomy';
import TextSchema from '../docs/components/data-display/text/anatomy';
import TextareaSchema from '../docs/components/inputs/textarea/anatomy';
import ToggleSchema from '../docs/components/inputs/toggle/anatomy';
import TooltipSchema from '../docs/components/overlays/tooltip/anatomy';

const schemas: Record<string, FunctionComponent> = {
  Avatar: AvatarSchema,
  AvatarStack: AvatarStackSchema,
  Button: ButtonSchema,
  IconButton: IconButtonSchema,
  Card: CardSchema,
  Divider: DividerSchema,
  SearchBar: SearchBarSchema,
  Input: InputSchema,
  Modal: ModalSchema,
  Popover: PopoverSchema,
  ProgressBar: ProgressBarSchema,
  Select: SelectSchema,
  Skeleton: SkeletonSchema,
  Stepper: StepperSchema,
  Tag: TagSchema,
  TagSelector: TagSelectorSchema,
  Text: TextSchema,
  Textarea: TextareaSchema,
  Toggle: ToggleSchema,
  Tooltip: TooltipSchema,
};

interface ComponentSchemaProps {
  name: string;
}

export const ComponentSchema: FunctionComponent<ComponentSchemaProps> = ({ name }) => {
  const Schema = schemas[name];
  if (!Schema) return null;
  return <Schema />;
};
