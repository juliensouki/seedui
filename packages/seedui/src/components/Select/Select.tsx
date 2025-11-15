import {
  cloneElement,
  FocusEventHandler,
  FunctionComponent,
  HTMLAttributes,
  InputHTMLAttributes,
  KeyboardEventHandler,
  MouseEventHandler,
  RefObject,
  useId,
  useMemo,
  useRef,
  useState,
  useContext,
  CSSProperties,
} from 'react';
import styled from 'styled-components';

import { MenuItem, SelectOption } from './MenuItem';
import { SelectActiveItemStyle, optionIconStyles } from './shared';
import { applyCustomStyles } from '../../utils/custom-styles';
import { joinClasses } from '../../utils/classes';
import { getDefaultProps } from '../../utils/props';
import { SeedContext } from '../ThemeProvider/context';
import { SeedContextType } from '../../types';
import { InternalProps } from '../../types/internal';
import { Text } from '../Text';
import { ExpandArrow } from '../_internal/ExpandArrow';

export type SelectStates = 'default' | 'disabled' | 'active';

export interface SelectProps {
  options: SelectOption[];
  onChange: (value: string | null) => void;
  value?: string | null;
  placeholder?: string;
  label?: { text: string; className?: string; style?: CSSProperties };
  width?: string | number;
  menuHeight?: string | number;
  noOptionMessage?: string;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  ref?: RefObject<HTMLDivElement>;
  activeItemStyle?: SelectActiveItemStyle;
  disabled?: boolean;
  rootContainerProps?: HTMLAttributes<HTMLDivElement>;
  selectContainerProps?: HTMLAttributes<HTMLDivElement>;
}

const defaultProps: SelectProps = {
  width: 230,
  menuHeight: 250,
  noOptionMessage: 'No options available.',
  activeItemStyle: { fontWeight: 'bold' },
  options: [],
  onChange: () => {},
};

const SelectDiv = applyCustomStyles(
  styled.div<{ $width?: string | number }>(({ $width }) => ({
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    width: typeof $width === 'number' ? `${$width}px` : $width,
  })),
);

const SelectContainer = applyCustomStyles(
  styled.div<{ $isFocused: boolean; $disabled?: boolean }>(({ theme, $isFocused, $disabled }) => {
    const isLight = theme.mode === 'light';
    const baseColor = isLight ? theme.colors.neutral[200] : theme.colors.neutral[700];
    const activeColor = theme.colors.primary.default;
    const textColor = isLight ? theme.colors.neutral[900] : theme.colors.neutral.white;

    return {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      borderRadius: theme.borderRadius[100],
      backgroundColor: $disabled
        ? isLight
          ? theme.colors.neutral[100]
          : theme.colors.neutral[800]
        : isLight
        ? theme.colors.neutral.white
        : theme.colors.neutral[900],
      color: textColor,
      padding: `${theme.spacing['050']}px ${theme.spacing[100]}px`,
      paddingRight: 0,
      cursor: $disabled ? 'not-allowed' : 'pointer',

      outline: $isFocused ? `2px solid ${theme.colors.primary[200]}` : undefined,
      outlineOffset: $isFocused ? 1 : undefined,
      borderColor: theme.colors.primary.default,
      border: `1px solid ${$isFocused ? activeColor : baseColor}`,

      '::selection': {
        background: 'transparent',
      },
      '::-moz-selection': {
        background: 'transparent',
      },
    };
  }),
);

const SelectInput = styled.input(({ theme }) => ({
  width: '100%',
  flex: 1,
  background: 'inherit',
  color: 'inherit',
  border: 'none',
  outline: 'none',
  font: 'inherit',
  userSelect: 'none',
  WebkitUserSelect: 'none',
  msUserSelect: 'none',
  caretColor: 'transparent',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  padding: 0,
  fontFamily: theme.typography.p.fontFamily,
  fontSize: theme.typography.p.responsive.desktop.fontSize,

  '::selection': {
    background: 'transparent',
  },
  '::-moz-selection': {
    background: 'transparent',
  },
}));

const SelectArrowContainer = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0 8px',
});

const SelectMenu = styled.div<{ $menuHeight: string | number }>(({ theme, $menuHeight }) => ({
  position: 'absolute',
  top: 'calc(100% + 8px)',
  left: 0,
  zIndex: 9999,
  width: '100%',
  maxHeight: typeof $menuHeight === 'number' ? `${$menuHeight}px` : $menuHeight,
  overflowY: 'auto',
  borderRadius: theme.borderRadius['050'],
  backgroundColor: theme.mode === 'light' ? theme.colors.neutral.white : theme.colors.neutral[900],
  border: `1px solid ${theme.mode === 'light' ? theme.colors.neutral[200] : theme.colors.neutral[700]}`,
  boxShadow: theme.boxShadow[1],
  boxSizing: 'border-box',
  padding: 4,
  animation: 'fadeIn 0.1s ease-in-out',

  '@keyframes fadeIn': {
    from: {
      opacity: 0,
      transform: 'translateY(-4px)',
    },
    to: {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
}));

export const Select: FunctionComponent<SelectProps & InternalProps> = (props) => {
  const { customizations } = useContext<SeedContextType>(SeedContext);
  const {
    options,
    value,
    label: { text: label, className: labelClassName, style: labelStyle } = {},
    onChange,
    placeholder,
    width,
    menuHeight,
    noOptionMessage,
    ref,
    inputProps,
    activeItemStyle,
    disabled,
    rootContainerProps,
    selectContainerProps,
  } = getDefaultProps<SelectProps & InternalProps>({
    providedProps: props,
    defaultProps,
    globalDefaultProps: customizations?.components?.select?.select?.defaultProps,
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeItemInMenu, setActiveItemInMenu] = useState<number>(0);
  const menuItemsRefs = useRef<Map<number, HTMLDivElement>>();
  const inputRef = useRef<HTMLInputElement>(null);
  const skipOpenOnceRef = useRef<boolean>(false);

  const uniqueId = useId();

  const activeItem = useMemo<SelectOption | undefined>(
    () => options.find((i) => i.value === value) || undefined,
    [options, value],
  );

  const buildRefMap = () => {
    if (!menuItemsRefs.current) menuItemsRefs.current = new Map();
    return menuItemsRefs.current;
  };

  const handleItemClick = (value: string | null) => {
    onChange(value);
    setIsMenuOpen(false);
  };

  const handleContainerFocus: FocusEventHandler<HTMLDivElement> = (e) => {
    if (skipOpenOnceRef.current) {
      skipOpenOnceRef.current = false;
      return;
    }
    if ((e.target as HTMLElement)?.id === `${uniqueId}-select-input`) {
      setActiveItemInMenu(0);
      setIsMenuOpen(true);
    }
  };

  const handleContainerBlur: FocusEventHandler<HTMLDivElement> = (e) => {
    const next = e.relatedTarget as Node | null;
    if (next && e.currentTarget.contains(next)) return;
    setIsMenuOpen(false);
  };

  const handleArrowClick: MouseEventHandler = (e) => {
    setIsMenuOpen((prev) => {
      if (prev) {
        skipOpenOnceRef.current = true;
        inputRef.current?.blur();
        return false;
      } else {
        inputRef.current?.focus();
        return true;
      }
    });
    e.stopPropagation();
  };

  const handleContainerMouseDown: MouseEventHandler<HTMLDivElement> = (e) => {
    if (disabled) return;
    const target = e.target as HTMLElement;
    if (target.closest('.select-arrow-container')) return;
    if (target.closest('.select-menu-container')) return;
    inputRef.current?.focus();
    setActiveItemInMenu(0);
    setIsMenuOpen(true);
  };

  const handleKeyboard: KeyboardEventHandler = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!isMenuOpen) setIsMenuOpen(true);
      setActiveItemInMenu((i) => (i === 0 ? options.length - 1 : i - 1));
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!isMenuOpen) setIsMenuOpen(true);
      setActiveItemInMenu((i) => (i === options.length - 1 ? 0 : i + 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const newValue = options[activeItemInMenu]?.value;
      handleItemClick(newValue);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setIsMenuOpen(false);
    }
  };

  return (
    <SelectDiv
      {...rootContainerProps}
      ref={ref}
      $width={width}
      $customizations={customizations.components?.select}
      className={joinClasses('select-root', rootContainerProps?.className)}
    >
      {label && (
        <Text variant="caption" className={labelClassName} style={{ marginBottom: 4, ...labelStyle }}>
          {label}
        </Text>
      )}

      <SelectContainer
        {...selectContainerProps}
        onFocus={handleContainerFocus}
        onBlur={handleContainerBlur}
        onKeyDown={handleKeyboard}
        onMouseDown={handleContainerMouseDown}
        $isFocused={isMenuOpen}
        $disabled={disabled}
        $customizations={customizations.components?.select}
        className={joinClasses('select-container', selectContainerProps?.className)}
      >
        {activeItem?.icon && (
          <div style={{ display: 'flex', alignItems: 'center', paddingRight: 6 }}>
            {cloneElement(activeItem.icon, { style: { ...optionIconStyles } })}
          </div>
        )}

        <SelectInput
          {...inputProps}
          placeholder={placeholder}
          value={activeItem?.value === null ? '' : activeItem?.label || ''}
          readOnly
          disabled={disabled}
          ref={inputRef}
          id={`${uniqueId}-select-input`}
        />

        <SelectArrowContainer className="select-arrow-container">
          <ExpandArrow
            isExpanded={isMenuOpen}
            id={`${uniqueId}-select-arrow`}
            tabIndex={-1}
            onClick={handleArrowClick}
          />
        </SelectArrowContainer>

        {isMenuOpen && (
          <SelectMenu
            $menuHeight={menuHeight}
            $customizations={customizations.components?.select}
            className="select-menu-container"
          >
            {options.length === 0 ? (
              <MenuItem option={{ label: noOptionMessage, value: null }} index={0} />
            ) : (
              options.map((option, index) => (
                <MenuItem
                  key={index}
                  option={option}
                  index={index}
                  buildRefMap={buildRefMap}
                  isHighlighted={index === activeItemInMenu}
                  isActive={value === option.value && option.value !== null}
                  handleItemClick={handleItemClick}
                  selectUniqueId={uniqueId}
                  onHover={(i: number) => setActiveItemInMenu(i)}
                  activeItemStyle={activeItemStyle}
                />
              ))
            )}
          </SelectMenu>
        )}
      </SelectContainer>
    </SelectDiv>
  );
};

Select.displayName = 'Select';
