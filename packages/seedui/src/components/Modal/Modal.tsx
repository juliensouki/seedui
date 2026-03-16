import {
  ForwardedRef,
  forwardRef,
  HTMLAttributes,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  MouseEvent,
} from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

import { SeedContextType } from '../../types';
import { InternalProps, StyledComponentsPrefix } from '../../types/internal';
import { joinClasses } from '../../utils/classes';
import { applyCustomStyles } from '../../utils/custom-styles';
import { getDefaultProps } from '../../utils/props';
import { SeedContext } from '../ThemeProvider/context';
import { Text } from '../Text';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: ReactNode;
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  width?: string | number;
  elementProps?: {
    overlayDiv?: HTMLAttributes<HTMLDivElement>;
    modalDiv?: HTMLAttributes<HTMLDivElement>;
    headerDiv?: HTMLAttributes<HTMLDivElement>;
    contentDiv?: HTMLAttributes<HTMLDivElement>;
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
  elementProps: {
    overlayDiv: {},
    modalDiv: {},
    headerDiv: {},
    contentDiv: {},
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
      backgroundColor: isLight ? theme.colors.neutral.white : theme.colors.neutral[900],
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

const ModalContent = styled.div<StyledComponentsPrefix<Record<string, never>>>(({ theme }) => ({
  padding: `${theme.spacing(2)}px`,
  overflowY: 'auto',
  flex: 1,
}));

const CloseButton = styled.button<StyledComponentsPrefix<Record<string, never>>>(({ theme }) => {
  const isLight = theme.mode === 'light';

  return {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: theme.spacing(0.5),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.borderRadius(2),
    color: isLight ? theme.colors.neutral[600] : theme.colors.neutral[400],
    transition: 'background-color 0.15s ease-in-out, color 0.15s ease-in-out',

    '&:hover': {
      backgroundColor: isLight ? theme.colors.neutral[100] : theme.colors.neutral[800],
      color: isLight ? theme.colors.neutral[900] : theme.colors.neutral.white,
    },

    '&:focus': {
      outline: `2px solid ${theme.colors.primary[300]}`,
      outlineOffset: 2,
    },

    '& svg': {
      width: 20,
      height: 20,
    },
  };
});

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
      elementProps: {
        overlayDiv: overlayDivHTMLAttributes,
        modalDiv: modalDivHTMLAttributes,
        headerDiv: headerDivHTMLAttributes,
        contentDiv: contentDivHTMLAttributes,
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
        {...overlayDivHTMLAttributes}
        $isOpen={isOpen}
        $customizations={customizations.components?.modal}
        onClick={handleOverlayClick}
        className={joinClasses(className, overlayDivHTMLAttributes?.className)}
      >
        <ModalContainer
          {...modalDivHTMLAttributes}
          ref={forwardedRef || modalRef}
          $width={width}
          $isOpen={isOpen}
          className={joinClasses(className, modalDivHTMLAttributes?.className)}
          onClick={(e: MouseEvent<HTMLDivElement>) => e.stopPropagation()}
        >
          {(title || showCloseButton) && (
            <ModalHeader
              {...headerDivHTMLAttributes}
              className={joinClasses(headerDivHTMLAttributes?.className)}
            >
              {title && (
                <Text variant="h6" style={{ margin: 0 }}>
                  {title}
                </Text>
              )}
              {showCloseButton && (
                <CloseButton
                  {...closeButtonHTMLAttributes}
                  onClick={onClose}
                  type="button"
                  aria-label="Close modal"
                  className={joinClasses(closeButtonHTMLAttributes?.className)}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </CloseButton>
              )}
            </ModalHeader>
          )}
          <ModalContent
            {...contentDivHTMLAttributes}
            className={joinClasses(contentDivHTMLAttributes?.className)}
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
