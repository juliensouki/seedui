import styled from 'styled-components';

import { IconButtonBase, IconButtonProps } from '../IconButtonBase';
import { StyledProps } from '../../../types';

export const IconButtonPrimaryFilled = styled(IconButtonBase)((props: StyledProps<IconButtonProps>) => {
  const theme = props.theme;
  const isLight = theme.mode === 'light';

  return {
    backgroundColor: theme.colors.primary.default,

    '&:hover': {
      backgroundColor: isLight ? theme.colors.primary[500] : theme.colors.primary[400],
    },

    '&:active': {
      backgroundColor: theme.colors.primary[800],
    },

    '& svg': {
      color: theme.colors.neutral.white,
    },
  };
});
