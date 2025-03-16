import {
  ForwardedRef,
  forwardRef,
  HTMLAttributes,
  ReactNode,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';

import { Text } from '../Text';
import { Theme } from '../../types';

export type TooltipDirection = 'top' | 'right' | 'bottom' | 'left';

export interface TooltipProps {
  divProps?: HTMLAttributes<HTMLDivElement>;
  text: string;
  direction?: TooltipDirection;
  children: ReactNode;
}

type TooltipSpanProps = Required<TooltipProps> & { tooltipWidth: number };

// Necessary to avoid no-unsafe-member-access and no-unsafe-argument linting errors. TooltipSpanProps should be enough, but it's not.
// Props type is "any" when extending styles on an existing component using styled function.
type StyledProps = { theme: Theme; tooltipWidth: number };

const computeTooltipMarginX = (theme: Theme): number => theme.spacing['200'];
const computeTooltipMarginY = (theme: Theme): number => theme.spacing['100'];

const TooltipSpan = styled.span<TooltipSpanProps>((props) => {
  const theme = props.theme;
  const isLight = theme.mode === 'light';

  return {
    backgroundColor: isLight ? theme.colors.neutral[900] : theme.colors.neutral[400],
    color: theme.colors.neutral.white,
    position: 'absolute',
    visibility: 'hidden',
    width: 'max-content',
    maxWidth: 200,
    textAlign: 'center',
    borderRadius: props.theme.borderRadius[100],
    padding: `${props.theme.spacing[100]}px ${props.theme.spacing[150]}px`,
    zIndex: 1,
    opacity: 0,
    transition: 'all 0.2s',
  };
});

const TopTooltip = styled(TooltipSpan)<TooltipSpanProps>((props: StyledProps) => ({
  bottom: '100%',
  left: `calc(50% - ${props.tooltipWidth / 2}px)`,
  marginBottom: computeTooltipMarginY(props.theme),
}));

const BottomTooltip = styled(TooltipSpan)<TooltipSpanProps>((props: StyledProps) => ({
  top: '100%',
  left: `calc(50% - ${props.tooltipWidth / 2}px)`,
  marginTop: computeTooltipMarginY(props.theme),
}));

const LeftTooltip = styled(TooltipSpan)<TooltipSpanProps>((props: StyledProps) => ({
  marginRight: computeTooltipMarginX(props.theme),
  right: '100%',
  marginLeft: -props.tooltipWidth / 2,
}));

const RightTooltip = styled(TooltipSpan)<TooltipSpanProps>((props: StyledProps) => ({
  right: -(props.tooltipWidth + computeTooltipMarginX(props.theme)),
}));

const ChildrenWrapper = styled.div({
  [`&:hover + ${TooltipSpan}`]: {
    visibility: 'visible',
    opacity: 1,
    transform: 'scale(1.05)',
  },
});

const MainDiv = styled.div(() => ({
  position: 'relative',
  display: 'inline-block',
}));

const TooltipText = styled(Text)(() => ({
  wordBreak: 'break-word',

  '&&&': {
    color: 'inherit ',
    fontSize: 12,
    lineHeight: 1.5,
  },
}));

export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  ({ divProps, text, direction = 'top', children }, forwardedRef: ForwardedRef<HTMLDivElement>) => {
    const [tooltipTop, setTooltipTop] = useState<number | undefined>(undefined);
    const [tooltipWidth, setTooltipWidth] = useState<number | undefined>(undefined);

    const childrenContainerRef = useRef<HTMLDivElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(forwardedRef, () => tooltipRef.current as HTMLDivElement);

    useEffect(() => {
      const handleTooltipPlacement = () => {
        if (childrenContainerRef.current && tooltipRef.current) {
          const childrenContainerRect = childrenContainerRef.current.getBoundingClientRect();
          const tooltipRect = tooltipRef.current.getBoundingClientRect();

          if (direction === 'left' || direction === 'right') {
            setTooltipTop(childrenContainerRect.height / 2 - tooltipRect.height / 2);
          } else {
            setTooltipTop(undefined);
          }

          setTooltipWidth(tooltipRect.width);
        }
      };

      if (tooltipRef.current) {
        new ResizeObserver(handleTooltipPlacement).observe(tooltipRef.current);
      }
      if (childrenContainerRef.current) {
        new ResizeObserver(handleTooltipPlacement).observe(childrenContainerRef.current);
      }
    }, [tooltipRef, childrenContainerRef, direction, text]);

    const TooltipComponent =
      direction === 'top'
        ? TopTooltip
        : direction === 'bottom'
        ? BottomTooltip
        : direction === 'left'
        ? LeftTooltip
        : RightTooltip;

    return (
      <MainDiv {...divProps} ref={forwardedRef}>
        <ChildrenWrapper ref={childrenContainerRef}>{children}</ChildrenWrapper>
        <TooltipComponent ref={tooltipRef} tooltipWidth={tooltipWidth} style={{ top: tooltipTop }}>
          <TooltipText>{text}</TooltipText>
        </TooltipComponent>
      </MainDiv>
    );
  },
);

Tooltip.displayName = 'Tooltip';
