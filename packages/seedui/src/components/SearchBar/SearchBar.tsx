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
};

const SearchBarContainer = styled.div<StyledComponentsPrefix<{ isFocused?: boolean; width?: string | number }>>(
  ({ theme, $isFocused, $width }) => ({
    display: 'flex',
    alignItems: 'center',
    width: $width,
    backgroundColor: theme.colors.neutral.white,
    padding: `${theme.spacing['050']}px ${theme.spacing['050']}px`,
    borderRadius: theme.borderRadius[100],
    border: `1px solid ${theme.colors.neutral[200]}`,

    ...($isFocused && {
      outline: `2px solid ${theme.colors.primary[300]}`,
      outlineOffset: 1,
      borderColor: theme.colors.primary.default,
    }),
  }),
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

const IconWrapper = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  pointerEvents: 'none',
  paddingLeft: theme.spacing['100'],
  paddingRight: theme.spacing['100'],
  '& svg': {
    width: 18,
    height: 18,
    color: theme.colors.neutral[400],
  },
}));

export const SearchBar = forwardRef<HTMLInputElement, SearchBarProps & InternalProps>(
  (props, forwardedRef: ForwardedRef<HTMLInputElement>) => {
    const { customizations } = useContext<SeedContextType>(SeedContext);
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const { spacing } = useTheme();

    const { value, placeholder, disabled, inputValidation, width, onChange, onSearch, buttonLabel, className } =
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
                paddingRight: spacing[100],
              },
              onFocus: () => setIsFocused(true),
              onBlur: () => setIsFocused(false),
            },
          }}
        />

        <SearchButton onClick={onSearch} disabled={disabled}>
          {buttonLabel}
        </SearchButton>
      </SearchBarContainer>
    );
  },
);

SearchBar.displayName = 'SearchBar';
