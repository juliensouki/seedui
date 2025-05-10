import { BoxShadow } from '../../types';
import { boxShadow as lightBoxShadow } from './light';
import { boxShadow as darkBoxShadow } from './dark';

export const boxShadow: { light: BoxShadow; dark: BoxShadow } = {
  light: lightBoxShadow,
  dark: darkBoxShadow,
};
