import {
  ForwardedRef,
  forwardRef,
  HTMLAttributes,
  ReactNode,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';

import { Text, TextPropsAndAttributes } from '../Text';
import { SeedContextType, Theme } from '../../types';
import { InternalProps, StyledComponentsPrefix, StyledProps } from '../../types/internal';
import { joinClasses } from '../../utils/classes';
import { applyCustomStyles } from '../../utils/custom-styles';
import { getDefaultProps } from '../../utils/props';
import { SeedContext } from '../ThemeProvider/context';

export type TooltipDirection = 'top' | 'right' | 'bottom' | 'left';

export interface TooltipProps {
  text: string;
  direction?: TooltipDirection;
  elementProps?: {
    root?: HTMLAttributes<HTMLDivElement>;
    trigger?: HTMLAttributes<HTMLDivElement>;
    tooltip?: HTMLAttributes<HTMLSpanElement>;
  };
  forwardProps?: {
    text?: TextPropsAndAttributes;
  };
  children: ReactNode;
}

type TooltipSpanProps = StyledComponentsPrefix<Required<TooltipProps> & { tooltipWidth: number; tooltipTop?: number }>;

const defaultProps: TooltipProps = {
  text: '',
  direction: 'top',
  elementProps: {
    root: {},
    trigger: {},
    tooltip: {},
  },
  forwardProps: {
    text: {},
  },
  children: <></>,
};

const computeTooltipMarginX = (theme: Theme): number => theme.spacing(2);
const computeTooltipMarginY = (theme: Theme): number => theme.spacing(1);

const TooltipSpan = styled.span<TooltipSpanProps>((props) => {
  const theme = props.theme;
  const isLight = theme.mode === 'light';

  return {
    backgroundColor: isLight ? theme.colors.neutral[900] : theme.colors.neutral[600],
    color: theme.colors.neutral.white,
    position: 'absolute',
    visibility: 'hidden',
    width: 'max-content',
    maxWidth: 200,
    textAlign: 'center',
    borderRadius: props.theme.borderRadius(4),
    padding: `${props.theme.spacing(1)}px ${props.theme.spacing(1.5)}px`,
    zIndex: 9999,
    opacity: 0,
    transition: 'all 0.2s',
  };
});

const TopTooltip = styled(TooltipSpan)<TooltipSpanProps>(({ theme, $tooltipWidth }: StyledProps<TooltipSpanProps>) => ({
  bottom: '100%',
  left: `calc(50% - ${$tooltipWidth / 2}px)`,
  marginBottom: computeTooltipMarginY(theme),
}));

const BottomTooltip = styled(TooltipSpan)<TooltipSpanProps>(
  ({ theme, $tooltipWidth }: StyledProps<TooltipSpanProps>) => ({
    top: '100%',
    left: `calc(50% - ${$tooltipWidth / 2}px)`,
    marginTop: computeTooltipMarginY(theme),
  }),
);

const LeftTooltip = styled(TooltipSpan)<TooltipSpanProps>(
  ({ theme, $tooltipWidth, $tooltipTop }: StyledProps<TooltipSpanProps>) => ({
    marginRight: computeTooltipMarginX(theme),
    right: '100%',
    top: $tooltipTop,
    marginLeft: -$tooltipWidth / 2,
  }),
);

const RightTooltip = styled(TooltipSpan)<TooltipSpanProps>(
  ({ theme, $tooltipWidth, $tooltipTop }: StyledProps<TooltipSpanProps>) => ({
    top: $tooltipTop,
    right: -($tooltipWidth + computeTooltipMarginX(theme)),
  }),
);

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
    lineHeight: 1.5,
  },
}));

const mapDirectionToTooltip: Record<TooltipDirection, typeof TooltipSpan> = {
  top: applyCustomStyles(TopTooltip),
  right: applyCustomStyles(RightTooltip),
  bottom: applyCustomStyles(BottomTooltip),
  left: applyCustomStyles(LeftTooltip),
};

export const Tooltip = forwardRef<HTMLDivElement, TooltipProps & InternalProps>(
  (props, forwardedRef: ForwardedRef<HTMLDivElement>) => {
    const { customizations } = useContext<SeedContextType>(SeedContext);
    const {
      text,
      direction,
      elementProps: {
        root: rootHTMLAttributes,
        trigger: triggerHTMLAttributes,
        tooltip: tooltipHTMLAttributes,
      },
      className,
      forwardProps: { text: textProps },
      children,
    } = getDefaultProps<TooltipProps & InternalProps>({
      providedProps: props,
      globalDefaultProps: customizations?.components?.tooltip?.defaultProps,
      defaultProps,
    });

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

    const TooltipComponent = mapDirectionToTooltip[direction];

    return (
      <MainDiv ref={forwardedRef} className={joinClasses('tooltip-root', rootHTMLAttributes?.className)} {...rootHTMLAttributes}>
        <ChildrenWrapper ref={childrenContainerRef} className={joinClasses('tooltip-trigger', triggerHTMLAttributes?.className)} {...triggerHTMLAttributes}>
          {children}
        </ChildrenWrapper>
        <TooltipComponent
          ref={tooltipRef}
          $tooltipWidth={tooltipWidth}
          $tooltipTop={tooltipTop}
          $direction={direction}
          $customizations={customizations.components?.tooltip}
          className={joinClasses('tooltip-content', className, tooltipHTMLAttributes?.className)}
          {...tooltipHTMLAttributes}
        >
          <TooltipText variant="caption" {...textProps}>
            {text}
          </TooltipText>
        </TooltipComponent>
      </MainDiv>
    );
  },
);

Tooltip.displayName = 'Tooltip';
