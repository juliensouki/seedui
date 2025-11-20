import {
  ForwardedRef,
  forwardRef,
  HTMLAttributes,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
  MouseEvent,
  KeyboardEvent,
} from 'react';
import { createPortal } from 'react-dom';
import styled, { useTheme } from 'styled-components';

import { SeedContextType, Theme } from '../../types';
import { InternalProps, StyledComponentsPrefix } from '../../types/internal';
import { joinClasses } from '../../utils/classes';
import { applyCustomStyles } from '../../utils/custom-styles';
import { getDefaultProps } from '../../utils/props';
import { SeedContext } from '../ThemeProvider/context';

export type PopoverDirection = 'top' | 'right' | 'bottom' | 'left';

export interface PopoverProps {
  isOpen: boolean;
  onOpen?: () => void;
  onClose: () => void;
  direction?: PopoverDirection;
  spacing?: number;
  children: ReactNode;
  content: ReactNode;
  closeOnOutsideClick?: boolean;
  closeOnEscape?: boolean;
  htmlAttributes?: {
    rootDiv?: HTMLAttributes<HTMLDivElement>;
    triggerDiv?: HTMLAttributes<HTMLDivElement>;
    popoverDiv?: HTMLAttributes<HTMLDivElement>;
  };
}

type PopoverContainerProps = StyledComponentsPrefix<{}>;

const defaultProps: PopoverProps = {
  isOpen: false,
  onOpen: undefined,
  onClose: () => {},
  direction: 'bottom',
  spacing: undefined,
  children: <></>,
  content: <></>,
  closeOnOutsideClick: true,
  closeOnEscape: true,
  htmlAttributes: {
    rootDiv: {},
    triggerDiv: {},
    popoverDiv: {},
  },
};

const PopoverContainer = applyCustomStyles(
  styled.div<PopoverContainerProps>((props) => {
    const theme = props.theme;
    const isLight = theme.mode === 'light';

    return {
      position: 'fixed',
      backgroundColor: isLight ? theme.colors.neutral.white : theme.colors.neutral[900],
      borderRadius: theme.borderRadius[100],
      boxShadow: theme.boxShadow[3],
      padding: theme.spacing[150],
      zIndex: 9999,
      minWidth: 100,
      maxWidth: 400,
      animation: 'popoverFadeIn 0.15s ease-out',
      '@keyframes popoverFadeIn': {
        from: {
          opacity: 0,
          transform: 'scale(0.95) translateY(-5px)',
        },
        to: {
          opacity: 1,
          transform: 'scale(1) translateY(0)',
        },
      },
    };
  }),
);

const TriggerWrapper = styled.div({
  display: 'inline-block',
  cursor: 'pointer',
});

const RootDiv = styled.div({
  position: 'relative',
  display: 'inline-block',
});

export const Popover = forwardRef<HTMLDivElement, PopoverProps & InternalProps>(
  (props, forwardedRef: ForwardedRef<HTMLDivElement>) => {
    const { customizations } = useContext<SeedContextType>(SeedContext);
    const {
      isOpen,
      onOpen,
      onClose,
      direction,
      spacing,
      children,
      content,
      closeOnOutsideClick,
      closeOnEscape,
      htmlAttributes: {
        rootDiv: rootDivHTMLAttributes,
        triggerDiv: triggerDivHTMLAttributes,
        popoverDiv: popoverDivHTMLAttributes,
      },
      className,
    } = getDefaultProps<PopoverProps & InternalProps>({
      providedProps: props,
      globalDefaultProps: customizations?.components?.popover?.defaultProps,
      defaultProps,
    });

    const [popoverPosition, setPopoverPosition] = useState<{ top: number; left: number } | null>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const popoverRef = useRef<HTMLDivElement>(null);
    const theme = useTheme() as Theme;

    useImperativeHandle(forwardedRef, () => triggerRef.current as HTMLDivElement);

    const computePopoverMargin = (): number => spacing ?? theme.spacing['100'];

    const calculatePosition = useCallback(() => {
      if (!triggerRef.current || !popoverRef.current || !isOpen) {
        setPopoverPosition(null);
        return;
      }

      const triggerRect = triggerRef.current.getBoundingClientRect();
      const popoverRect = popoverRef.current.getBoundingClientRect();
      const margin = computePopoverMargin();

      let top = 0;
      let left = 0;

      switch (direction) {
        case 'top':
          top = triggerRect.top - popoverRect.height - margin;
          left = triggerRect.left + triggerRect.width / 2 - popoverRect.width / 2;
          break;
        case 'bottom':
          top = triggerRect.bottom + margin;
          left = triggerRect.left + triggerRect.width / 2 - popoverRect.width / 2;
          break;
        case 'left':
          top = triggerRect.top + triggerRect.height / 2 - popoverRect.height / 2;
          left = triggerRect.left - popoverRect.width - margin;
          break;
        case 'right':
          top = triggerRect.top + triggerRect.height / 2 - popoverRect.height / 2;
          left = triggerRect.right + margin;
          break;
      }

      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      if (left < margin) left = margin;
      if (left + popoverRect.width > viewportWidth - margin) {
        left = viewportWidth - popoverRect.width - margin;
      }
      if (top < margin) top = margin;
      if (top + popoverRect.height > viewportHeight - margin) {
        top = viewportHeight - popoverRect.height - margin;
      }

      setPopoverPosition({ top, left });
    }, [isOpen, direction, spacing, theme.spacing]);

    useLayoutEffect(() => {
      if (!isOpen) {
        setPopoverPosition(null);
        return;
      }

      const rafId = requestAnimationFrame(() => {
        calculatePosition();
      });

      return () => {
        cancelAnimationFrame(rafId);
      };
    }, [isOpen, calculatePosition]);

    useEffect(() => {
      if (!isOpen) {
        setPopoverPosition(null);
        return;
      }

      calculatePosition();
      if (popoverRef.current) {
        const resizeObserver = new ResizeObserver(calculatePosition);
        resizeObserver.observe(popoverRef.current);
        return () => resizeObserver.disconnect();
      }
    }, [isOpen, calculatePosition, content]);

    useEffect(() => {
      if (!isOpen) return;

      window.addEventListener('scroll', calculatePosition, true);
      window.addEventListener('resize', calculatePosition);

      return () => {
        window.removeEventListener('scroll', calculatePosition, true);
        window.removeEventListener('resize', calculatePosition);
      };
    }, [isOpen, calculatePosition]);

    useEffect(() => {
      if (!isOpen || !closeOnEscape) return;

      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          onClose();
        }
      };

      document.addEventListener('keydown', handleEscape as any);
      return () => {
        document.removeEventListener('keydown', handleEscape as any);
      };
    }, [isOpen, closeOnEscape, onClose]);

    useEffect(() => {
      if (!isOpen || !closeOnOutsideClick) return;

      const handleClickOutside = (event: MouseEvent) => {
        if (
          popoverRef.current &&
          triggerRef.current &&
          !popoverRef.current.contains(event.target as Node) &&
          !triggerRef.current.contains(event.target as Node)
        ) {
          onClose();
        }
      };

      const timeoutId = setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside as any);
      }, 0);

      return () => {
        clearTimeout(timeoutId);
        document.removeEventListener('mousedown', handleClickOutside as any);
      };
    }, [isOpen, closeOnOutsideClick, onClose]);

    const handleTriggerClick = (event: MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
      if (isOpen) {
        onClose();
      } else if (onOpen) {
        onOpen();
      }
    };

    const popoverContent = isOpen ? (
      <PopoverContainer
        {...popoverDivHTMLAttributes}
        ref={popoverRef}
        $customizations={customizations.components?.popover}
        className={joinClasses(className, popoverDivHTMLAttributes?.className)}
        style={{
          top: popoverPosition ? `${popoverPosition.top}px` : '',
          left: popoverPosition ? `${popoverPosition.left}px` : '',
          visibility: popoverPosition ? 'visible' : 'hidden',
          ...popoverDivHTMLAttributes?.style,
        }}
        onClick={(e: MouseEvent<HTMLDivElement>) => e.stopPropagation()}
      >
        {content}
      </PopoverContainer>
    ) : null;

    return (
      <>
        <RootDiv ref={forwardedRef || triggerRef} {...rootDivHTMLAttributes}>
          <TriggerWrapper
            {...triggerDivHTMLAttributes}
            ref={triggerRef}
            onClick={handleTriggerClick}
            className={joinClasses(triggerDivHTMLAttributes?.className)}
          >
            {children}
          </TriggerWrapper>
        </RootDiv>
        {createPortal(popoverContent, document.body)}
      </>
    );
  },
);

Popover.displayName = 'Popover';
