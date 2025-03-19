import styled from 'styled-components';
import { IconButtonBase, IconButtonProps } from '../IconButtonBase';
import { StyledProps } from '../../../types';

export const IconButtonSecondaryTransparent = styled(IconButtonBase)((props: StyledProps<IconButtonProps>) => {
  const theme = props.theme;
  const isLight = theme.mode === 'light';

  return {
    backgroundColor: 'transparent',

    '&:hover': {
      backgroundColor: isLight ? theme.colors.secondary[200] : theme.colors.secondary[900],
    },

    '&:active': {
      backgroundColor: isLight ? theme.colors.secondary[300] : theme.colors.secondary[700],
    },

    '& svg': {
      color: theme.colors.secondary.default,
    },
  };
});
