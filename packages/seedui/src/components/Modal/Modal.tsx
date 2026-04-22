import { ForwardedRef, forwardRef, HTMLAttributes, ReactNode, useContext, useEffect, useRef, MouseEvent } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

import { SeedContextType } from '../../types';
import { InternalProps, StyledComponentsPrefix } from '../../types/internal';
import { joinClasses } from '../../utils/classes';
import { applyCustomStyles } from '../../utils/custom-styles';
import { getDefaultProps } from '../../utils/props';
import { SeedContext } from '../ThemeProvider/context';
import { Text } from '../Text';
import { IconButton } from '../Button';
import { XIcon } from 'lucide-react';

/** A dialog overlay that focuses attention on a specific task or message. */
export interface ModalProps {
  /** Controls whether the modal is visible. */
  isOpen: boolean;
  /** Called when the modal should close (close button, overlay click, or Escape key). */
  onClose: () => void;
  /** Optional title displayed in the modal header. */
  title?: string;
  /** Content rendered inside the modal body. */
  children?: ReactNode;
  /** Whether to show the X close button in the header. Defaults to true. */
  showCloseButton?: boolean;
  /** Whether clicking the backdrop closes the modal. Defaults to true. */
  closeOnOverlayClick?: boolean;
  /** Whether pressing Escape closes the modal. Defaults to true. */
  closeOnEscape?: boolean;
  /** Modal width — number (px) or string. Defaults to 500px. */
  width?: string | number;
  /** Inner padding of the modal body — a number (px) or any valid CSS padding string. Defaults to 16px. */
  padding?: number | string;
  /** Access underlying DOM elements (overlay, container, header, content, closeButton). */
  elementProps?: {
    overlay?: HTMLAttributes<HTMLDivElement>;
    container?: HTMLAttributes<HTMLDivElement>;
    header?: HTMLAttributes<HTMLDivElement>;
    content?: HTMLAttributes<HTMLDivElement>;
    closeButton?: HTMLAttributes<HTMLButtonElement>;
  };
}

const defaultProps: ModalProps = {
  isOpen: false,
  onClose: () => {},
  showCloseButton: true,
  closeOnOverlayClick: true,
  closeOnEscape: true,
  width: 500,
  padding: 16,
  elementProps: {
    overlay: {},
    container: {},
    header: {},
    content: {},
    closeButton: {},
  },
};

const Overlay = applyCustomStyles(
  styled.div<StyledComponentsPrefix<{ isOpen: boolean }>>(({ $isOpen }) => ({
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: $isOpen ? 'flex' : 'none',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10000,
    animation: $isOpen ? 'fadeIn 0.2s ease-in-out' : 'none',

    '@keyframes fadeIn': {
      from: {
        opacity: 0,
      },
      to: {
        opacity: 1,
      },
    },
  })),
);

const ModalContainer = applyCustomStyles(
  styled.div<StyledComponentsPrefix<{ width: string | number; isOpen: boolean }>>(({ theme, $width, $isOpen }) => {
    const isLight = theme.mode === 'light';

    return {
      position: 'relative',
      width: typeof $width === 'number' ? `${$width}px` : $width,
      maxWidth: '90vw',
      maxHeight: '90vh',
      backgroundColor: isLight ? theme.colors.neutral[100] : theme.colors.neutral[200],
      borderRadius: theme.borderRadius(3),
      boxShadow: theme.boxShadow[3],
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      animation: $isOpen ? 'slideIn 0.2s ease-in-out' : 'none',
      transform: $isOpen ? 'scale(1)' : 'scale(0.95)',

      '@keyframes slideIn': {
        from: {
          opacity: 0,
          transform: 'scale(0.95) translateY(-10px)',
        },
        to: {
          opacity: 1,
          transform: 'scale(1) translateY(0)',
        },
      },
    };
  }),
);

const ModalHeader = styled.div<StyledComponentsPrefix<Record<string, never>>>(({ theme }) => {
  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: `${theme.spacing(2)}px`,
  };
});

const resolvePadding = (padding: number | string): string =>
  typeof padding === 'number' ? `${padding}px` : padding;

const ModalContent = styled.div<StyledComponentsPrefix<{ padding: number | string }>>(({ $padding }) => ({
  padding: resolvePadding($padding),
  overflowY: 'auto',
  flex: 1,
}));

/** A dialog overlay that focuses user attention on a task, confirmation, or message. */
export const Modal = forwardRef<HTMLDivElement, ModalProps & InternalProps>(
  (props, forwardedRef: ForwardedRef<HTMLDivElement>) => {
    const { customizations } = useContext<SeedContextType>(SeedContext);
    const {
      isOpen,
      onClose,
      title,
      children,
      showCloseButton,
      closeOnOverlayClick,
      closeOnEscape,
      width,
      padding,
      elementProps: {
        overlay: overlayHTMLAttributes,
        container: containerHTMLAttributes,
        header: headerHTMLAttributes,
        content: contentHTMLAttributes,
        closeButton: closeButtonHTMLAttributes,
      },
      className,
    } = getDefaultProps<ModalProps & InternalProps>({
      providedProps: props,
      globalDefaultProps: customizations?.components?.modal?.defaultProps,
      defaultProps,
    });

    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (!isOpen || !closeOnEscape) return;

      const handleEscape = (event: KeyboardEvent) => {
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
      if (isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }

      return () => {
        document.body.style.overflow = '';
      };
    }, [isOpen]);

    const handleOverlayClick = (event: MouseEvent<HTMLDivElement>) => {
      if (closeOnOverlayClick && event.target === event.currentTarget) {
        onClose();
      }
    };

    if (!isOpen) return null;

    const modalContent = (
      <Overlay
        {...overlayHTMLAttributes}
        $isOpen={isOpen}
        $customizations={customizations.components?.modal}
        onClick={handleOverlayClick}
        className={joinClasses('modal-overlay', className, overlayHTMLAttributes?.className)}
      >
        <ModalContainer
          {...containerHTMLAttributes}
          ref={forwardedRef || modalRef}
          $width={width}
          $isOpen={isOpen}
          className={joinClasses('modal-container', className, containerHTMLAttributes?.className)}
          onClick={(e: MouseEvent<HTMLDivElement>) => e.stopPropagation()}
        >
          {(title || showCloseButton) && (
            <ModalHeader
              {...headerHTMLAttributes}
              className={joinClasses('modal-header', headerHTMLAttributes?.className)}
            >
              {title && (
                <Text variant="h6" style={{ margin: 0 }}>
                  {title}
                </Text>
              )}
              {showCloseButton && (
                <IconButton
                  {...closeButtonHTMLAttributes}
                  onClick={onClose}
                  variant="transparent"
                  color="neutral"
                  size="sm"
                  aria-label="Close modal"
                  className={joinClasses('modal-close-button', closeButtonHTMLAttributes?.className)}
                >
                  <XIcon size={18} />
                </IconButton>
              )}
            </ModalHeader>
          )}
          <ModalContent
            {...contentHTMLAttributes}
            $padding={padding}
            className={joinClasses('modal-content', contentHTMLAttributes?.className)}
          >
            {children}
          </ModalContent>
        </ModalContainer>
      </Overlay>
    );

    return createPortal(modalContent, document.body);
  },
);

Modal.displayName = 'Modal';
