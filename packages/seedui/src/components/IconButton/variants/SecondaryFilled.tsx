import styled from 'styled-components';

import { IconButtonBase, IconButtonProps } from '../IconButtonBase';
import { StyledProps } from '../../../types';

export const IconButtonSecondaryFilled = styled(IconButtonBase)((props: StyledProps<IconButtonProps>) => {
  const theme = props.theme;
  const isLight = theme.mode === 'light';

  return {
    backgroundColor: theme.colors.secondary.default,

    '&:hover': {
      backgroundColor: isLight ? theme.colors.secondary[500] : theme.colors.secondary[400],
    },

    '&:active': {
      backgroundColor: theme.colors.secondary[800],
    },

    '& svg': {
      color: theme.colors.neutral.white,
    },
  };
});
