import { ChangeEventHandler, ForwardedRef, forwardRef, HTMLAttributes } from 'react';
import styled from 'styled-components';

import { TextPropsAndAttributes } from '../Text';
import { ContainerWithLabel } from '../_internal/ContainerWithLabel';
import { InternalProps, StyledComponentsPrefix } from '../../types/internal';
import { joinClasses } from '../../utils/classes';
import { applyCustomStyles } from '../../utils/custom-styles';

export interface TextareaProps {
  value: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  width?: string | number;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  forwardProps?: {
    labelTextProps?: TextPropsAndAttributes;
  };
  htmlAttributes?: {
    rootDiv?: HTMLAttributes<HTMLDivElement>;
    textarea?: HTMLAttributes<HTMLTextAreaElement>;
  };
  isResizable?: boolean;
}

const TextareaElement = applyCustomStyles(
  styled.textarea<StyledComponentsPrefix<Required<TextareaProps>>>(({ theme, $isResizable }) => {
    const isLight = theme.mode === 'light';

    return {
      width: '100%',
      borderRadius: theme.borderRadius[100],
      border: `1px solid ${isLight ? theme.colors.neutral[300] : theme.colors.neutral[400]}`,
      boxSizing: 'border-box',

      backgroundColor: isLight ? theme.colors.neutral.white : theme.colors.neutral[700],
      color: isLight ? theme.colors.neutral.black : theme.colors.neutral.white,

      padding: `${theme.spacing[100]}px ${theme.spacing[150]}px`,

      fontFamily: theme.typography.p.fontFamily,
      fontSize: theme.typography.p.responsive.desktop.fontSize,

      resize: !$isResizable ? 'none' : undefined,

      '&::placeholder': {
        color: theme.colors.neutral[400],
      },

      '&:hover': {
        borderColor: isLight ? theme.colors.neutral[500] : theme.colors.neutral[200],
      },

      '&:focus': {
        outline: 'none',
        borderColor: theme.colors.primary.default,
      },

      '&:disabled': {
        backgroundColor: isLight ? theme.colors.neutral[100] : theme.colors.neutral[800],
        borderColor: isLight ? theme.colors.neutral[200] : theme.colors.neutral[600],

        '&::placeholder': {
          color: isLight ? theme.colors.neutral[300] : theme.colors.neutral[500],
        },
      },
    };
  }),
  'textarea',
);

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps & InternalProps>(
  (
    {
      value,
      onChange,
      placeholder,
      width = 200,
      label,
      disabled,
      isResizable = true,
      forwardProps = {},
      className,
      htmlAttributes = {},
    },
    forwardedRef: ForwardedRef<HTMLTextAreaElement>,
  ) => {
    return (
      <ContainerWithLabel label={label} forwardProps={forwardProps} htmlAttributes={htmlAttributes} width={width}>
        <TextareaElement
          {...htmlAttributes.textarea}
          ref={forwardedRef}
          disabled={disabled}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={joinClasses(className, className, htmlAttributes?.textarea?.className)}
          $isResizable={isResizable}
        />
      </ContainerWithLabel>
    );
  },
);

Textarea.displayName = 'Textarea';
