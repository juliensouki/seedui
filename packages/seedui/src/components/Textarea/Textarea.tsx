import { ChangeEventHandler, ForwardedRef, forwardRef, HTMLAttributes, useContext } from 'react';
import styled from 'styled-components';

import { TextPropsAndAttributes } from '../Text';
import { ContainerWithLabel } from '../_internal/ContainerWithLabel';
import { InternalProps, StyledComponentsPrefix } from '../../types/internal';
import { joinClasses } from '../../utils/classes';
import { applyCustomStyles } from '../../utils/custom-styles';
import { getDefaultProps } from '../../utils/props';
import { SeedContextType } from '../../types';
import { SeedContext } from '../ThemeProvider/context';

/** A multi-line text input with optional label. */
export interface TextareaProps {
  /** Current textarea value (controlled). */
  value: string;
  /** Label text displayed above the textarea. */
  label?: string;
  /** Placeholder text shown when empty. */
  placeholder?: string;
  /** Disables the textarea. */
  disabled?: boolean;
  /** Component width — number (px) or string. */
  width?: string | number;
  /** Change handler called when the user types. */
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
  /** Pass props to internal sub-components like the label text. */
  forwardProps?: {
    labelTextProps?: TextPropsAndAttributes;
  };
  /** Access underlying DOM elements (root, input textarea). */
  elementProps?: {
    root?: HTMLAttributes<HTMLDivElement>;
    input?: HTMLAttributes<HTMLTextAreaElement>;
  };
  /** Whether the user can resize the textarea. Defaults to true. */
  isResizable?: boolean;
}

const defaultProps: TextareaProps = {
  value: '',
  width: 200,
  disabled: false,
  isResizable: true,
  forwardProps: {
    labelTextProps: {},
  },
  elementProps: {
    root: {},
    input: {},
  },
};

const TextareaElement = applyCustomStyles(
  styled.textarea<StyledComponentsPrefix<Required<TextareaProps>>>(({ theme, $isResizable }) => {
    const isLight = theme.mode === 'light';

    return {
      width: '100%',
      borderRadius: theme.borderRadius(4),
      border: `1px solid ${isLight ? theme.colors.neutral[300] : theme.colors.neutral[600]}`,
      boxSizing: 'border-box',

      backgroundColor: isLight ? theme.colors.neutral.white : theme.colors.neutral[300],
      color: isLight ? theme.colors.neutral.black : theme.colors.neutral.white,

      padding: `${theme.spacing(1)}px ${theme.spacing(1.5)}px`,

      fontFamily: theme.typography.p.fontFamily,
      fontSize: theme.typography.p.fontSize,

      resize: !$isResizable ? 'none' : undefined,

      '&::placeholder': {
        color: isLight ? theme.colors.neutral[400] : theme.colors.neutral[600],
      },

      '&:hover': {
        borderColor: isLight ? theme.colors.neutral[500] : theme.colors.neutral[800],
      },

      '&:focus': {
        outline: `2px solid ${theme.colors.primary[300]}`,
        outlineOffset: 1,
        borderColor: theme.colors.primary.default,
      },

      '&:disabled': {
        backgroundColor: isLight ? theme.colors.neutral[100] : theme.colors.neutral[200],
        borderColor: isLight ? theme.colors.neutral[200] : theme.colors.neutral[400],
        color: isLight ? theme.colors.neutral[400] : theme.colors.neutral[500],

        '&::placeholder': {
          color: isLight ? theme.colors.neutral[300] : theme.colors.neutral[500],
        },
      },
    };
  }),
);

/** A multi-line text input with optional label and configurable resize behavior. */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps & InternalProps>(
  (props, forwardedRef: ForwardedRef<HTMLTextAreaElement>) => {
    const { customizations } = useContext<SeedContextType>(SeedContext);
    const {
      value,
      onChange,
      placeholder,
      width = 200,
      label,
      disabled,
      isResizable = true,
      forwardProps,
      className,
      elementProps,
    } = getDefaultProps<TextareaProps & InternalProps>({
      providedProps: props,
      globalDefaultProps: customizations?.components?.textarea?.defaultProps,
      defaultProps,
    });

    return (
      <ContainerWithLabel label={label} forwardProps={forwardProps} elementProps={elementProps} width={width} className="textarea-root">
        <TextareaElement
          {...elementProps.input}
          ref={forwardedRef}
          disabled={disabled}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={joinClasses('textarea-input', className, elementProps?.input?.className)}
          $customizations={customizations.components?.textarea}
          $isResizable={isResizable}
        />
      </ContainerWithLabel>
    );
  },
);

Textarea.displayName = 'Textarea';
