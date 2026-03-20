import { Children, ForwardedRef, forwardRef, HTMLAttributes, ReactElement, useContext } from 'react';
import styled from 'styled-components';

import { SeedContextType, Sizes } from '../../types';
import { InternalProps } from '../../types/internal';
import { joinClasses } from '../../utils/classes';
import { applyCustomStyles } from '../../utils/custom-styles';
import { getDefaultProps } from '../../utils/props';
import { SeedContext } from '../ThemeProvider/context';
import { Avatar, AvatarProps } from '../Avatar';

export type AvatarStackSize = Extract<Sizes, 'sm' | 'md' | 'lg'> | number;
export type AvatarStackDirection = 'left' | 'right';

/** Groups multiple Avatar components with an overlapping layout and optional overflow count. */
export interface AvatarStackProps {
  /** Maximum visible avatars before showing a "+N" overflow indicator. */
  max?: number;
  /** Uniform size for all avatars in the stack: 'sm', 'md', 'lg', or a custom number. */
  size?: AvatarStackSize;
  /** Overlap direction — 'left' (default) stacks right-to-left, 'right' stacks left-to-right. */
  direction?: AvatarStackDirection;
  /** One or more Avatar components to display in the stack. */
  children: ReactElement<AvatarProps> | ReactElement<AvatarProps>[];
  /** Access the underlying DOM elements for custom attributes or event handlers. */
  elementProps?: {
    root?: HTMLAttributes<HTMLDivElement>;
    overflow?: HTMLAttributes<HTMLDivElement>;
  };
}

const sizeMap: Record<string, number> = {
  sm: 32,
  md: 40,
  lg: 48,
};

const overlapMap: Record<string, number> = {
  sm: -10,
  md: -12,
  lg: -14,
};

const resolveStackSize = (size: AvatarStackSize): number => (typeof size === 'number' ? size : sizeMap[size]);

const resolveOverlap = (size: AvatarStackSize): number =>
  typeof size === 'number' ? Math.round(size * -0.3) : overlapMap[size];

const defaultProps: AvatarStackProps = {
  size: 'md',
  direction: 'left',
  children: [] as unknown as ReactElement<AvatarProps>,
  elementProps: {
    root: {},
    overflow: {},
  },
};

const StackRoot = applyCustomStyles(
  styled.div({
    display: 'inline-flex',
    alignItems: 'center',
  }),
);

const StackItem = styled.div<{ $overlap: number; $zIndex: number }>((props) => {
  const isLight = props.theme.mode === 'light';
  return {
    marginLeft: props.$overlap,
    border: `2px solid ${isLight ? props.theme.colors.neutral.white : props.theme.colors.neutral[200]}`,
    borderRadius: props.theme.borderRadius('full'),
    lineHeight: 0,
    zIndex: props.$zIndex,

    '&:first-child': {
      marginLeft: 0,
    },
  };
});

const OverflowAvatar = styled.div<{ $size: number }>((props) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: props.$size,
  height: props.$size,
  borderRadius: props.theme.borderRadius('full'),
  backgroundColor: props.theme.mode === 'light' ? props.theme.colors.neutral[300] : props.theme.colors.neutral[700],
  color: props.theme.mode === 'light' ? props.theme.colors.neutral[700] : props.theme.colors.neutral[300],
  fontSize: props.$size * 0.35,
  fontWeight: 600,
  userSelect: 'none',
  flexShrink: 0,
  boxSizing: 'border-box',
}));

/** Groups multiple Avatar components with an overlapping layout and optional "+N" overflow indicator. */
export const AvatarStack = forwardRef<HTMLDivElement, AvatarStackProps & InternalProps>(
  (props, forwardedRef: ForwardedRef<HTMLDivElement>) => {
    const { customizations } = useContext<SeedContextType>(SeedContext);
    const {
      max,
      size,
      direction,
      children,
      elementProps: { root: rootHTMLAttributes, overflow: overflowHTMLAttributes } = {},
      className,
    } = getDefaultProps<AvatarStackProps & InternalProps>({
      providedProps: props,
      globalDefaultProps: customizations?.components?.avatarStack?.defaultProps,
      defaultProps,
    });

    const childArray = Children.toArray(children) as ReactElement<AvatarProps>[];
    const visibleAvatars = max && max < childArray.length ? childArray.slice(0, max) : childArray;
    const overflowCount = max && max < childArray.length ? childArray.length - max : 0;
    const overlap = resolveOverlap(size);
    const totalItems = visibleAvatars.length + (overflowCount > 0 ? 1 : 0);
    const isLeft = direction === 'left';

    return (
      <StackRoot
        ref={forwardedRef}
        className={joinClasses('avatar-stack-root', className, rootHTMLAttributes?.className)}
        $customizations={customizations.components?.avatarStack}
        {...rootHTMLAttributes}
      >
        {visibleAvatars.map((child, index) => (
          <StackItem key={index} $overlap={overlap} $zIndex={isLeft ? totalItems - index : index + 1} className="avatar-stack-item">
            <Avatar {...child.props} size={size} />
          </StackItem>
        ))}
        {overflowCount > 0 && (
          <StackItem $overlap={overlap} $zIndex={isLeft ? 0 : totalItems} className="avatar-stack-item">
            <OverflowAvatar {...overflowHTMLAttributes} $size={resolveStackSize(size)} className={joinClasses('avatar-stack-overflow', overflowHTMLAttributes?.className)}>+{overflowCount}</OverflowAvatar>
          </StackItem>
        )}
      </StackRoot>
    );
  },
);

AvatarStack.displayName = 'AvatarStack';
