import { boxShadow } from '../../tokens/box-shadow';
import { BoxShadow, CustomBoxShadow, Mode } from '../../types';

export interface BoxShadowService {
  generateCustomBoxShadow: (custom: CustomBoxShadow, mode?: Mode) => BoxShadow;
}

export const boxShadowServiceFactory = (): BoxShadowService => {
  return {
    generateCustomBoxShadow: (custom, mode = 'light') => ({
      ...boxShadow[mode],
      ...custom[mode],
    }),
  };
};
