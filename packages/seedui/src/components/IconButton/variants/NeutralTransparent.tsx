import styled from 'styled-components';

import { IconButtonBase, IconButtonProps } from '../IconButtonBase';
import { StyledProps } from '../../../types';

export const IconButtonNeutralTransparent = styled(IconButtonBase)((props: StyledProps<IconButtonProps>) => {
  const theme = props.theme;
  const isLight = theme.mode === 'light';

  return {
    backgroundColor: 'transparent',

    '&:hover': {
      backgroundColor: isLight ? theme.colors.neutral[200] : theme.colors.neutral[700],
    },

    '&:active': {
      backgroundColor: isLight ? theme.colors.neutral[300] : theme.colors.neutral[500],
    },

    '& svg': {
      color: isLight ? theme.colors.neutral.black : theme.colors.neutral.white,
    },
  };
});
