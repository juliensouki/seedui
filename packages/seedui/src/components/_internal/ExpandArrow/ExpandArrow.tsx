import { ButtonHTMLAttributes, FunctionComponent, MouseEventHandler } from 'react';
import styled from 'styled-components';
import { ChevronDown } from 'lucide-react';

import { applyCustomStyles } from '../../../utils/custom-styles';
import { StyledComponentsPrefix } from '../../../types/internal';
import { IconButton } from '../../Button';

export interface ExpandArrowProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isExpanded: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const ArrowIcon = applyCustomStyles(
  styled(ChevronDown)<StyledComponentsPrefix<ExpandArrowProps>>`
    transform: rotate(${({ $isExpanded }) => ($isExpanded ? '180deg' : '0deg')});
    transition: transform 0.2s ease-in-out;
  `,
);

export const ExpandArrow: FunctionComponent<ExpandArrowProps> = ({ isExpanded, onClick, ...buttonProps }) => {
  return (
    <IconButton
      {...buttonProps}
      size="sm"
      color="neutral"
      variant="transparent"
      onClick={onClick}
      data-testid="expand-arrow"
    >
      <ArrowIcon $isExpanded={isExpanded} />
    </IconButton>
  );
};

ExpandArrow.displayName = 'ExpandArrow';
