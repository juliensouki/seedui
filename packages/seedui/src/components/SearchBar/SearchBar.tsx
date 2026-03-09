import { ChangeEventHandler, ForwardedRef, forwardRef, useContext, useState } from 'react';
import styled, { useTheme } from 'styled-components';

import { getDefaultProps } from '../../utils/props';
import { joinClasses } from '../../utils/classes';
import { SeedContext } from '../ThemeProvider/context';
import { SeedContextType } from '../../types';
import { Input } from '../Input';
import { StyledComponentsPrefix, InternalProps, StyledProps } from '../../types/internal';
import { Button } from '../Button';

export interface SearchBarProps {
  value: string;
  placeholder?: string;
  disabled?: boolean;
  inputValidation?: (value: string) => boolean;
  width?: string | number;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onSearch?: () => void;
  buttonLabel?: string;
  hideButton?: boolean;
  className?: string;
}

const defaultProps: SearchBarProps = {
  value: '',
  placeholder: 'Search...',
  disabled: false,
  inputValidation: undefined,
  width: 300,
  onChange: undefined,
  onSearch: undefined,
  buttonLabel: 'Search',
  hideButton: false,
};

const SearchBarContainer = styled.div<StyledComponentsPrefix<{ isFocused?: boolean; width?: string | number; hideButton?: boolean }>>(
  ({ theme, $isFocused, $width, $hideButton }) => {
    const isLight = theme.mode === 'light';
    return {
      display: 'flex',
      alignItems: 'center',
      width: $width,
      backgroundColor: isLight ? theme.colors.neutral.white : theme.colors.neutral[700],
      padding: $hideButton
        ? `${theme.spacing(1)}px ${theme.spacing(1.5)}px`
        : `${theme.spacing(0.5)}px`,
      borderRadius: theme.borderRadius(4),
      border: `1px solid ${isLight ? theme.colors.neutral[200] : theme.colors.neutral[500]}`,

      ...($isFocused && {
        outline: `2px solid ${theme.colors.primary[300]}`,
        outlineOffset: 1,
        borderColor: theme.colors.primary.default,
      }),
    };
  },
);

const SearchInput = styled(Input)({
  paddingLeft: 0,
  borderRadius: 'unset',
  border: 'unset',
  '&:focus': {
    outline: 'unset',
  },
});

const SearchButton = styled(Button)(({ theme }: StyledProps<SearchBarProps>) => ({
  height: 34,
  '&:focus': {
    outline: `1px solid ${theme.colors.primary[600]}`,
    offset: 0,
  },
}));

const IconWrapper = styled.div(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    pointerEvents: 'none',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    '& svg': {
      width: 18,
      height: 18,
      color: isLight ? theme.colors.neutral[400] : theme.colors.neutral[300],
    },
  };
});

export const SearchBar = forwardRef<HTMLInputElement, SearchBarProps & InternalProps>(
  (props, forwardedRef: ForwardedRef<HTMLInputElement>) => {
    const { customizations } = useContext<SeedContextType>(SeedContext);
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const { spacing } = useTheme();

    const { value, placeholder, disabled, inputValidation, width, onChange, onSearch, buttonLabel, hideButton, className } =
      getDefaultProps<SearchBarProps & InternalProps>({
        providedProps: props,
        globalDefaultProps: customizations?.components?.searchBar?.defaultProps,
        defaultProps,
      });

    return (
      <SearchBarContainer
        className={joinClasses(className)}
        $width={width}
        $customizations={customizations.components?.searchBar}
        $isFocused={isFocused}
        $hideButton={hideButton}
      >
        <IconWrapper>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="7" />
            <line x1="15.95" y1="15.95" x2="20.5" y2="20.5" />
          </svg>
        </IconWrapper>
        <SearchInput
          ref={forwardedRef}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          inputValidation={inputValidation}
          width="100%"
          htmlAttributes={{
            input: {
              style: {
                padding: 'unset',
                paddingRight: spacing(1),
              },
              onFocus: () => setIsFocused(true),
              onBlur: () => setIsFocused(false),
            },
          }}
        />

        {!hideButton && (
          <SearchButton onClick={onSearch} disabled={disabled}>
            {buttonLabel}
          </SearchButton>
        )}
      </SearchBarContainer>
    );
  },
);

SearchBar.displayName = 'SearchBar';
