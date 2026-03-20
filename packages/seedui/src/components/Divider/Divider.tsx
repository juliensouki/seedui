import { ForwardedRef, forwardRef, HTMLAttributes, useContext } from 'react';
import styled from 'styled-components';

import { SeedContextType } from '../../types';
import { SeedContext } from '../ThemeProvider/context';
import { applyCustomStyles } from '../../utils/custom-styles';
import { StyledComponentsPrefix } from '../../types/internal';

export interface DividerProps {
  /** Displays a vertical separator */
  vertical?: boolean;
  /** Choose the width of the separator. Can only be used if the separator is horizontal. */
  width?: number | string;
  /** Choose the height of the separator. Can only be used if the separator is vertical. */
  height?: number | string;
  /** If vertical is true, it will set a margin left and right with this value. Otherwise it will set a margin top and bottom. Defaults to 15px. */
  spacing?: number;
  /** Spacing between the text and the separators. Defaults to 12px. */
  childrenSpacing?: number;
}

const NoTextDivider = applyCustomStyles(
  styled.div<StyledComponentsPrefix<{
    vertical: boolean;
    width?: number | string;
    height?: number | string;
    spacing: number;
  }>>(({ theme, $vertical, $width, $height, $spacing }) => ({
    backgroundColor: theme.mode === 'light' ? theme.colors.neutral[300] : theme.colors.neutral[400],
    width: $vertical ? 1 : $width || '100%',
    height: $vertical ? $height || '100%' : 1,
    margin: $vertical ? `0 ${$spacing}px` : `${$spacing}px 0`,
  })),
);

const DividerContainer = applyCustomStyles(
  styled.div<StyledComponentsPrefix<{
    vertical: boolean;
    width?: number | string;
    height?: number | string;
    spacing: number;
  }>>(({ $vertical, $width, $height, $spacing }) => ({
    display: 'flex',
    flexDirection: $vertical ? 'column' : 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: $vertical ? 'fit-content' : $width || '100%',
    height: $vertical ? $height || '100%' : 'auto',
    margin: $vertical ? `0 ${$spacing}px` : `${$spacing}px 0`,
  })),
);

const Line = styled.div<{ vertical: boolean }>(({ theme, vertical }) => ({
  backgroundColor: theme.mode === 'light' ? theme.colors.neutral[300] : theme.colors.neutral[400],
  ...(vertical
    ? {
      width: 1,
      height: '100%',
    }
    : {
      width: '100%',
      height: 1,
    }),
}));

const ChildrenContainer = styled.div<{
  vertical: boolean;
  childrenSpacing: number;
}>(({ vertical, childrenSpacing }) => ({
  margin: vertical ? `${childrenSpacing}px 0` : `0 ${childrenSpacing}px`,
  '& > p': {
    whiteSpace: 'nowrap',
  },
}));

/** Displays a separator. Can be either horizontal (default) or vertical. Can also have text in the middle. */
export const Divider = forwardRef<HTMLDivElement, DividerProps & HTMLAttributes<HTMLDivElement>>(
  (
    { vertical = false, children, width, height, spacing = 15, childrenSpacing = 12, ...divProps },
    forwardedRef: ForwardedRef<HTMLDivElement>,
  ) => {
    const { customizations } = useContext<SeedContextType>(SeedContext);

    if (!children) {
      return (
        <NoTextDivider
          ref={forwardedRef}
          $vertical={vertical}
          $width={width}
          $height={height}
          $spacing={spacing}
          $customizations={customizations.components?.divider}
          data-testid="divider-no-children"
          {...divProps}
        />
      );
    }

    return (
      <DividerContainer
        ref={forwardedRef}
        $vertical={vertical}
        $width={width}
        $height={height}
        $spacing={spacing}
        $customizations={customizations.components?.divider}
        data-testid="divider-with-children-main-container"
        {...divProps}
      >
        <Line vertical={vertical} data-testid="left-divider" />
        <ChildrenContainer vertical={vertical} childrenSpacing={childrenSpacing}>
          {children}
        </ChildrenContainer>
        <Line vertical={vertical} data-testid="right-divider" />
      </DividerContainer>
    );
  },
);

Divider.displayName = 'Divider';
