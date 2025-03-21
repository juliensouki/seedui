import { ChangeEventHandler, ForwardedRef, forwardRef, HTMLAttributes, ReactNode } from 'react';
import styled from 'styled-components';

import { Text, TextPropsAndAttributes } from '../Text';
import { StyledProps } from '../../types';

export type InputIconPlacement = 'left' | 'right';

export interface InputProps {
  value: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  inputIcon?: {
    icon: ReactNode;
    placement?: InputIconPlacement;
  };
  onChange: ChangeEventHandler<HTMLInputElement>;
  forwardProps?: {
    labelTextProps?: TextPropsAndAttributes;
  };
  htmlAttributes?: {
    rootDiv?: HTMLAttributes<HTMLDivElement>;
    inputContainerDiv?: HTMLAttributes<HTMLDivElement>;
    input?: HTMLAttributes<HTMLInputElement>;
    iconContainerDiv?: HTMLAttributes<HTMLDivElement>;
  };
}

const IconContainer = styled.div<{ placement: InputIconPlacement }>(({ theme, placement }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.colors.neutral[300],
  borderTopRightRadius: placement === 'left' ? 0 : 'inherit',
  borderBottomRightRadius: placement === 'left' ? 0 : 'inherit',
  borderTopLeftRadius: placement === 'right' ? 0 : 'inherit',
  borderBottomLeftRadius: placement === 'right' ? 0 : 'inherit',

  padding: `0px ${theme.spacing[100]}px`,

  '& svg': {
    width: 18,
    height: 18,
  },
}));

const InputElement = styled.input<Required<InputProps & { iconPlacement: InputIconPlacement }>>((props) => {
  return {
    padding: '8px 12px',
    fontFamily: props.theme.typography.p.fontFamily,
    fontSize: 14,
    border: `1px solid ${props.theme.colors.neutral[300]}`,
    backgroundColor: props.theme.colors.neutral.white,
    width: '100%',
    borderTopRightRadius: props.iconPlacement === 'right' ? 0 : 'inherit',
    borderBottomRightRadius: props.iconPlacement === 'right' ? 0 : 'inherit',
    borderTopLeftRadius: props.iconPlacement === 'left' ? 0 : 'inherit',
    borderBottomLeftRadius: props.iconPlacement === 'left' ? 0 : 'inherit',

    '&::placeholder': {
      color: props.theme.colors.neutral[300],
    },

    '&:hover': {
      borderColor: props.theme.colors.neutral[500],

      [`& + ${IconContainer}`]: {
        backgroundColor: props.theme.colors.neutral[500],
      },
    },

    '&:focus': {
      outline: 'none',
      borderColor: props.theme.colors.primary.default,
      [`& + ${IconContainer}`]: {
        backgroundColor: props.theme.colors.primary.default,

        '& > svg': {
          color: props.theme.colors.neutral.white,
        },
      },
    },

    '&:disabled': {
      backgroundColor: props.theme.colors.neutral[100],
      borderColor: props.theme.colors.neutral[200],
    },
  };
});

const RootDiv = styled.div(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
}));

const InputContainer = styled.div<StyledProps<{ iconPlacement: InputIconPlacement }>>(({ theme, iconPlacement }) => ({
  display: 'flex',
  flexDirection: iconPlacement === 'right' ? 'row' : 'row-reverse',
  width: 200,
  borderRadius: theme.borderRadius[100],
}));

export const Input = forwardRef<HTMLDivElement, InputProps>(
  (
    {
      value,
      onChange,
      placeholder,
      label,
      disabled,
      inputIcon: { icon, placement: iconPlacement } = { icon: null, placement: 'left' },
      forwardProps = {},
      htmlAttributes = {},
    }: InputProps,
    forwardedRef: ForwardedRef<HTMLDivElement>,
  ) => {
    return (
      <RootDiv {...htmlAttributes.rootDiv}>
        {label && (
          <Text {...forwardProps?.labelTextProps} variant="caption">
            Label
          </Text>
        )}
        <InputContainer {...htmlAttributes.inputContainerDiv} iconPlacement={iconPlacement}>
          <InputElement
            {...htmlAttributes.input}
            ref={forwardedRef}
            disabled={disabled}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            iconPlacement={icon ? iconPlacement : undefined}
          />
          {icon && (
            <IconContainer {...htmlAttributes.iconContainerDiv} placement={iconPlacement}>
              {icon}
            </IconContainer>
          )}
        </InputContainer>
      </RootDiv>
    );
  },
);

Input.displayName = 'Input';
