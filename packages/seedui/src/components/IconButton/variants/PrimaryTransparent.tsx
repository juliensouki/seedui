import styled from 'styled-components';

import { IconButtonBase, IconButtonProps } from '../IconButtonBase';
import { StyledProps } from '../../../types';

export const IconButtonPrimaryTransparent = styled(IconButtonBase)((props: StyledProps<IconButtonProps>) => {
  const theme = props.theme;
  const isLight = theme.mode === 'light';

  return {
    backgroundColor: 'transparent',

    '&:hover': {
      backgroundColor: isLight ? theme.colors.primary[200] : theme.colors.primary[900],
    },

    '&:active': {
      backgroundColor: isLight ? theme.colors.primary[300] : theme.colors.primary[700],
    },

    '& svg': {
      color: theme.colors.primary.default,
    },
  };
});
