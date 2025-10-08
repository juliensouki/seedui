import { cloneElement, FunctionComponent, useId, useContext, ReactElement } from 'react';
import styled from 'styled-components';

import { SeedContext } from '../ThemeProvider/context';
import { applyCustomStyles } from '../../utils/custom-styles';
import { joinClasses } from '../../utils/classes';
import { SeedContextType } from '../../types';
import { Text } from '../Text';
import { optionIconStyles, SelectActiveItemStyle } from './shared';

export interface SelectOption {
  value: string | null;
  label: string;
  icon?: ReactElement;
}

export interface MenuItemProps {
  option: SelectOption;
  index: number;
  buildRefMap?: () => Map<number, HTMLDivElement>;
  handleItemClick?: (value: string | null) => void;
  isActive?: boolean;
  selectUniqueId?: string;
  onHover?: (index: number) => void;
  activeItemStyle?: SelectActiveItemStyle;
  className?: string;
}

const MenuItemDiv = applyCustomStyles(
  styled.div(({ theme }) => {
    const isLight = theme.mode === 'light';
    return {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      padding: '8px 10px',
      cursor: 'pointer',
      outline: 'none',
      borderRadius: theme.borderRadius['050'],
      transition: 'background-color 0.15s ease-in-out',
      backgroundColor: 'transparent',
      color: isLight ? theme.colors.neutral[900] : theme.colors.neutral.white,

      '&:hover': {
        backgroundColor: isLight ? theme.colors.neutral[100] : theme.colors.neutral[800],
      },
    };
  }),
);

const MenuItemText = styled(Text)({
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  flex: 1,
});

export const MenuItem: FunctionComponent<MenuItemProps> = ({
  option,
  index,
  buildRefMap,
  handleItemClick,
  isActive = false,
  selectUniqueId,
  onHover,
  activeItemStyle,
  className,
}) => {
  const { customizations } = useContext<SeedContextType>(SeedContext);
  const uniqueId = useId();

  const {
    color: activeTextColor,
    backgroundColor: activeBackgroundColor,
    fontWeight: activeFontWeight,
  } = activeItemStyle || {};

  return (
    <MenuItemDiv
      $customizations={customizations.components?.select?.menuItem}
      data-testid={`menu-item-${index}`}
      key={option.label || uniqueId}
      id={option.value || selectUniqueId}
      className={joinClasses('menu-item', className)}
      ref={(node: HTMLDivElement) => {
        if (index === undefined || !buildRefMap) return;
        const map = buildRefMap();
        if (node) map.set(index, node);
        else map.delete(index);
      }}
      tabIndex={index}
      onMouseEnter={onHover ? () => onHover(index) : undefined}
      onClick={handleItemClick ? () => handleItemClick(option.value) : undefined}
      style={{
        backgroundColor: isActive ? activeBackgroundColor : undefined,
      }}
    >
      {option.icon && cloneElement(option.icon, { style: { ...optionIconStyles } })}
      <MenuItemText
        data-testid={`menu-item-text-${index}`}
        style={{
          fontWeight: isActive ? activeFontWeight : undefined,
          color: isActive ? activeTextColor : undefined,
          whiteSpace: 'pre',
        }}
      >
        {option.label || ' '}
      </MenuItemText>
    </MenuItemDiv>
  );
};

MenuItem.displayName = 'MenuItem';
