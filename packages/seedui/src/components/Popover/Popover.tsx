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

export type PopoverVerticalAlignment = 'top' | 'bottom' | 'center';
export type PopoverHorizontalAlignment = 'left' | 'right' | 'center';

export interface PopoverProps {
  isOpen: boolean;
  onOpen?: () => void;
  onClose: () => void;
  verticalAlignment?: PopoverVerticalAlignment;
  horizontalAlignment?: PopoverHorizontalAlignment;
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
  verticalAlignment: 'bottom',
  horizontalAlignment: 'center',
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
      borderRadius: theme.borderRadius(4),
      boxShadow: theme.boxShadow[1],
      boxSizing: 'border-box',
      zIndex: 9999,
      minWidth: 100,
      maxWidth: 400,
      transition: 'opacity 0.15s ease-out',
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
      verticalAlignment,
      horizontalAlignment,
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

    const triggerRef = useRef<HTMLDivElement>(null);
    const popoverRef = useRef<HTMLDivElement>(null);
    const theme = useTheme() as Theme;

    useImperativeHandle(forwardedRef, () => triggerRef.current as HTMLDivElement);

    const computePopoverMargin = (): number => spacing ?? theme.spacing(1);

    const calculateAndApplyPosition = useCallback(() => {
      if (!triggerRef.current || !popoverRef.current) {
        return;
      }

      const triggerRect = triggerRef.current.getBoundingClientRect();
      const margin = computePopoverMargin();

      let top = 0;
      let left = 0;
      let translateX = '0';
      let translateY = '0';

      // Priority: vertical placement (top/bottom) takes precedence over horizontal (left/right)
      const isAboveOrBelow = verticalAlignment === 'top' || verticalAlignment === 'bottom';

      // Calculate vertical position
      if (isAboveOrBelow) {
        switch (verticalAlignment) {
          case 'top':
            top = triggerRect.top - margin;
            translateY = '-100%';
            break;
          case 'bottom':
            top = triggerRect.bottom + margin;
            translateY = '0';
            break;
        }
      } else {
        top = triggerRect.top + triggerRect.height / 2;
        translateY = '-50%';
      }

      // Calculate horizontal position
      if (isAboveOrBelow) {
        switch (horizontalAlignment) {
          case 'left':
            left = triggerRect.left;
            translateX = '0';
            break;
          case 'right':
            left = triggerRect.right;
            translateX = '-100%';
            break;
          case 'center':
            left = triggerRect.left + triggerRect.width / 2;
            translateX = '-50%';
            break;
        }
      } else {
        switch (horizontalAlignment) {
          case 'left':
            left = triggerRect.left - margin;
            translateX = '-100%';
            break;
          case 'right':
            left = triggerRect.right + margin;
            translateX = '0';
            break;
          case 'center':
            left = triggerRect.left + triggerRect.width / 2;
            translateX = '-50%';
            break;
        }
      }

      // Apply position directly to DOM (no state update = no re-render = no flicker)
      popoverRef.current.style.top = `${top}px`;
      popoverRef.current.style.left = `${left}px`;
      popoverRef.current.style.transform = `translate(${translateX}, ${translateY})`;
      popoverRef.current.style.visibility = 'visible';
      popoverRef.current.style.opacity = '1';
    }, [verticalAlignment, horizontalAlignment, spacing, theme.spacing]);

    useLayoutEffect(() => {
      if (!isOpen) {
        return;
      }

      calculateAndApplyPosition();
    }, [isOpen, calculateAndApplyPosition]);

    useEffect(() => {
      if (!isOpen || !popoverRef.current) {
        return;
      }

      const resizeObserver = new ResizeObserver(calculateAndApplyPosition);
      resizeObserver.observe(popoverRef.current);
      return () => resizeObserver.disconnect();
    }, [isOpen, calculateAndApplyPosition, content]);

    useEffect(() => {
      if (!isOpen) return;

      window.addEventListener('scroll', calculateAndApplyPosition, true);
      window.addEventListener('resize', calculateAndApplyPosition);

      return () => {
        window.removeEventListener('scroll', calculateAndApplyPosition, true);
        window.removeEventListener('resize', calculateAndApplyPosition);
      };
    }, [isOpen, calculateAndApplyPosition]);

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
          visibility: 'hidden',
          opacity: 0,
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
