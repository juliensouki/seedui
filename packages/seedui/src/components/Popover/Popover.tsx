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

/** A floating panel anchored to a trigger element, used for menus, tooltips, or contextual content. */
export interface PopoverProps {
  /** Controls whether the popover panel is visible. */
  isOpen: boolean;
  /** Called when the popover opens. */
  onOpen?: () => void;
  /** Called when the popover should close. */
  onClose: () => void;
  /** Vertical position relative to the trigger: 'top', 'bottom', or 'center'. */
  verticalAlignment?: PopoverVerticalAlignment;
  /** Horizontal position relative to the trigger: 'left', 'right', or 'center'. */
  horizontalAlignment?: PopoverHorizontalAlignment;
  /** Gap in pixels between the trigger and the panel. */
  spacing?: number;
  /** The trigger element that the popover anchors to. */
  children: ReactNode;
  /** Content rendered inside the floating panel. */
  content: ReactNode;
  /** Whether clicking outside the popover closes it. Defaults to true. */
  closeOnOutsideClick?: boolean;
  /** Whether pressing Escape closes the popover. Defaults to true. */
  closeOnEscape?: boolean;
  /** Inner padding of the panel — a number (px) or any valid CSS padding string. Defaults to 12px. */
  padding?: number | string;
  /** Access underlying DOM elements (root, trigger, panel). */
  elementProps?: {
    root?: HTMLAttributes<HTMLDivElement>;
    trigger?: HTMLAttributes<HTMLDivElement>;
    panel?: HTMLAttributes<HTMLDivElement>;
  };
}

type PopoverContainerProps = StyledComponentsPrefix<{ padding: number | string }>;

const resolvePadding = (padding: number | string): string =>
  typeof padding === 'number' ? `${padding}px` : padding;

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
  padding: 12,
  elementProps: {
    root: {},
    trigger: {},
    panel: {},
  },
};

const PopoverContainer = applyCustomStyles(
  styled.div<PopoverContainerProps>((props) => {
    const theme = props.theme;
    const isLight = theme.mode === 'light';

    return {
      position: 'fixed',
      padding: resolvePadding(props.$padding),
      backgroundColor: isLight ? theme.colors.neutral.white : theme.colors.neutral[200],
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

/** A floating panel anchored to a trigger element for menus, dropdowns, or contextual content. */
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
      padding,
      elementProps: {
        root: rootHTMLAttributes,
        trigger: triggerHTMLAttributes,
        panel: panelHTMLAttributes,
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

    const calculateAndApplyPosition = useCallback(() => {
      if (!triggerRef.current || !popoverRef.current) {
        return;
      }

      const triggerRect = triggerRef.current.getBoundingClientRect();
      const margin = spacing ?? theme.spacing(1);

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
    }, [verticalAlignment, horizontalAlignment, spacing, theme]);

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

      const handleEscape = (event: globalThis.KeyboardEvent) => {
        if (event.key === 'Escape') {
          onClose();
        }
      };

      document.addEventListener('keydown', handleEscape);
      return () => {
        document.removeEventListener('keydown', handleEscape);
      };
    }, [isOpen, closeOnEscape, onClose]);

    useEffect(() => {
      if (!isOpen || !closeOnOutsideClick) return;

      const handleClickOutside = (event: globalThis.MouseEvent) => {
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
        document.addEventListener('mousedown', handleClickOutside);
      }, 0);

      return () => {
        clearTimeout(timeoutId);
        document.removeEventListener('mousedown', handleClickOutside);
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
        {...panelHTMLAttributes}
        ref={popoverRef}
        $padding={padding}
        $customizations={customizations.components?.popover}
        className={joinClasses('popover-panel', className, panelHTMLAttributes?.className)}
        style={{
          visibility: 'hidden',
          opacity: 0,
          ...panelHTMLAttributes?.style,
        }}
        onClick={(e: MouseEvent<HTMLDivElement>) => e.stopPropagation()}
      >
        {content}
      </PopoverContainer>
    ) : null;

    return (
      <>
        <RootDiv ref={forwardedRef || triggerRef} className={joinClasses('popover-root', rootHTMLAttributes?.className)} {...rootHTMLAttributes}>
          <TriggerWrapper
            {...triggerHTMLAttributes}
            ref={triggerRef}
            onClick={handleTriggerClick}
            className={joinClasses('popover-trigger', triggerHTMLAttributes?.className)}
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
