import styled from 'styled-components';

import { IconButtonBase, IconButtonProps } from '../IconButtonBase';
import { StyledProps } from '../../../types';

export const IconButtonNeutralFilled = styled(IconButtonBase)((props: StyledProps<IconButtonProps>) => {
  const theme = props.theme;
  const isLight = theme.mode === 'light';

  return {
    backgroundColor: isLight ? theme.colors.neutral[300] : theme.colors.neutral[500],

    '&:hover': {
      backgroundColor: isLight ? theme.colors.neutral[200] : theme.colors.neutral[400],
    },

    '&:active': {
      backgroundColor: isLight ? theme.colors.neutral[500] : theme.colors.neutral[700],
    },

    '& svg': {
      color: isLight ? theme.colors.neutral.black : theme.colors.neutral.white,
    },
  };
});
