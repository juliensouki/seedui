import { Children, ForwardedRef, forwardRef, HTMLAttributes, ReactElement, useContext } from 'react';
import styled from 'styled-components';

import { SeedContextType, Sizes } from '../../types';
import { InternalProps } from '../../types/internal';
import { joinClasses } from '../../utils/classes';
import { applyCustomStyles } from '../../utils/custom-styles';
import { getDefaultProps } from '../../utils/props';
import { SeedContext } from '../ThemeProvider/context';
import { Avatar, AvatarProps } from '../Avatar';

export type AvatarStackSize = Extract<Sizes, 'sm' | 'md' | 'lg'>;
export type AvatarStackDirection = 'left' | 'right';

export interface AvatarStackProps {
  max?: number;
  size?: AvatarStackSize;
  direction?: AvatarStackDirection;
  children: ReactElement<AvatarProps> | ReactElement<AvatarProps>[];
  elementProps?: {
    rootDiv?: HTMLAttributes<HTMLDivElement>;
  };
}

const sizeMap: Record<AvatarStackSize, number> = {
  sm: 32,
  md: 40,
  lg: 48,
};

const overlapMap: Record<AvatarStackSize, number> = {
  sm: -10,
  md: -12,
  lg: -14,
};

const defaultProps: AvatarStackProps = {
  size: 'md',
  direction: 'left',
  children: [] as unknown as ReactElement<AvatarProps>,
  elementProps: {
    rootDiv: {},
  },
};

const StackRoot = applyCustomStyles(
  styled.div({
    display: 'inline-flex',
    alignItems: 'center',
  }),
);

const StackItem = styled.div<{ $overlap: number; $zIndex: number }>((props) => ({
  marginLeft: props.$overlap,
  border: `2px solid ${props.theme.colors.neutral.white}`,
  borderRadius: props.theme.borderRadius('full'),
  lineHeight: 0,
  zIndex: props.$zIndex,

  '&:first-child': {
    marginLeft: 0,
  },
}));

const OverflowAvatar = styled.div<{ $size: number }>((props) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: props.$size,
  height: props.$size,
  borderRadius: props.theme.borderRadius('full'),
  backgroundColor: props.theme.colors.neutral[300],
  color: props.theme.colors.neutral[700],
  fontSize: props.$size * 0.35,
  fontWeight: 600,
  userSelect: 'none',
  flexShrink: 0,
  boxSizing: 'border-box',
}));

export const AvatarStack = forwardRef<HTMLDivElement, AvatarStackProps & InternalProps>(
  (props, forwardedRef: ForwardedRef<HTMLDivElement>) => {
    const { customizations } = useContext<SeedContextType>(SeedContext);
    const {
      max,
      size,
      direction,
      children,
      elementProps: { rootDiv: rootDivHTMLAttributes } = {},
      className,
    } = getDefaultProps<AvatarStackProps & InternalProps>({
      providedProps: props,
      globalDefaultProps: customizations?.components?.avatarStack?.defaultProps,
      defaultProps,
    });

    const childArray = Children.toArray(children) as ReactElement<AvatarProps>[];
    const visibleAvatars = max && max < childArray.length ? childArray.slice(0, max) : childArray;
    const overflowCount = max && max < childArray.length ? childArray.length - max : 0;
    const overlap = overlapMap[size];
    const totalItems = visibleAvatars.length + (overflowCount > 0 ? 1 : 0);
    const isLeft = direction === 'left';

    return (
      <StackRoot
        ref={forwardedRef}
        className={joinClasses(className, rootDivHTMLAttributes?.className)}
        $customizations={customizations.components?.avatarStack}
        {...rootDivHTMLAttributes}
      >
        {visibleAvatars.map((child, index) => (
          <StackItem key={index} $overlap={overlap} $zIndex={isLeft ? totalItems - index : index + 1}>
            <Avatar {...child.props} size={size} />
          </StackItem>
        ))}
        {overflowCount > 0 && (
          <StackItem $overlap={overlap} $zIndex={isLeft ? 0 : totalItems}>
            <OverflowAvatar $size={sizeMap[size]}>+{overflowCount}</OverflowAvatar>
          </StackItem>
        )}
      </StackRoot>
    );
  },
);

AvatarStack.displayName = 'AvatarStack';
