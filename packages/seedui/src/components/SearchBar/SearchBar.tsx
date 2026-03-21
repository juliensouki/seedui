import { ChangeEventHandler, ForwardedRef, forwardRef, HTMLAttributes, useContext, useState } from 'react';
import styled, { useTheme } from 'styled-components';

import { getDefaultProps } from '../../utils/props';
import { joinClasses } from '../../utils/classes';
import { SeedContext } from '../ThemeProvider/context';
import { SeedContextType } from '../../types';
import { Input } from '../Input';
import { StyledComponentsPrefix, InternalProps, StyledProps } from '../../types/internal';
import { Button } from '../Button';

/** A search input with a built-in icon and optional submit button. */
export interface SearchBarProps {
  /** Current search value (controlled). */
  value: string;
  /** Placeholder text. Defaults to "Search...". */
  placeholder?: string;
  /** Disables the input and button. */
  disabled?: boolean;
  /** Validation function — returns true if the input is valid. */
  inputValidation?: (value: string) => boolean;
  /** Component width — number (px) or string. */
  width?: string | number;
  /** Called when the user types in the search field. */
  onChange?: ChangeEventHandler<HTMLInputElement>;
  /** Called when the user clicks the search button or presses Enter. */
  onSearch?: () => void;
  /** Label for the submit button. Defaults to "Search". */
  buttonLabel?: string;
  /** Hides the submit button, showing only the input with icon. */
  hideButton?: boolean;
  /** Additional CSS class for the root element. */
  className?: string;
  /** Access underlying DOM elements (root, icon, input, button). */
  elementProps?: {
    root?: HTMLAttributes<HTMLDivElement>;
    icon?: HTMLAttributes<HTMLDivElement>;
    input?: HTMLAttributes<HTMLInputElement>;
    button?: HTMLAttributes<HTMLButtonElement>;
  };
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

const SearchBarContainer = styled.div<StyledComponentsPrefix<{ isFocused?: boolean; disabled?: boolean; width?: string | number; hideButton?: boolean }>>(
  ({ theme, $isFocused, $disabled, $width, $hideButton }) => {
    const isLight = theme.mode === 'light';
    return {
      display: 'flex',
      alignItems: 'center',
      width: $width,
      backgroundColor: $disabled
        ? isLight
          ? theme.colors.neutral[100]
          : theme.colors.neutral[200]
        : isLight
        ? theme.colors.neutral.white
        : theme.colors.neutral[300],
      padding: $hideButton
        ? `${theme.spacing(1)}px ${theme.spacing(1.5)}px ${theme.spacing(1)}px ${theme.spacing(0.5)}px`
        : `${theme.spacing(0.5)}px`,
      borderRadius: theme.borderRadius(4),
      border: `1px solid ${$disabled
        ? isLight
          ? theme.colors.neutral[200]
          : theme.colors.neutral[400]
        : isLight
        ? theme.colors.neutral[200]
        : theme.colors.neutral[500]}`,

      ...(!$disabled && !$isFocused && {
        '&:hover': {
          borderColor: isLight ? theme.colors.neutral[500] : theme.colors.neutral[800],
        },
      }),

      ...($isFocused && !$disabled && {
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
      color: isLight ? theme.colors.neutral[400] : theme.colors.neutral[700],
    },
  };
});

/** A search input with an integrated icon and optional submit button. */
export const SearchBar = forwardRef<HTMLInputElement, SearchBarProps & InternalProps>(
  (props, forwardedRef: ForwardedRef<HTMLInputElement>) => {
    const { customizations } = useContext<SeedContextType>(SeedContext);
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const { spacing } = useTheme();

    const { value, placeholder, disabled, inputValidation, width, onChange, onSearch, buttonLabel, hideButton, className, elementProps = {} } =
      getDefaultProps<SearchBarProps & InternalProps>({
        providedProps: props,
        globalDefaultProps: customizations?.components?.searchBar?.defaultProps,
        defaultProps,
      });

    return (
      <SearchBarContainer
        {...elementProps.root}
        className={joinClasses('search-bar-root', className, elementProps.root?.className)}
        $width={width}
        $customizations={customizations.components?.searchBar}
        $isFocused={isFocused}
        $disabled={disabled}
        $hideButton={hideButton}
      >
        <IconWrapper {...elementProps.icon} className={joinClasses('search-bar-icon', elementProps.icon?.className)}>
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
          className="search-bar-input"
          elementProps={{
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
          <SearchButton onClick={onSearch} disabled={disabled} className="search-bar-button">
            {buttonLabel}
          </SearchButton>
        )}
      </SearchBarContainer>
    );
  },
);

SearchBar.displayName = 'SearchBar';
