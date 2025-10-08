import { ForwardedRef, forwardRef, FunctionComponent, useContext } from 'react';
import styled from 'styled-components';

import { getDefaultProps } from '../../utils/props';
import { joinClasses } from '../../utils/classes';
import { SeedContext } from '../ThemeProvider/context';
import { SeedContextType } from '../../types';
import { StyledComponentsPrefix, InternalProps, StyledProps } from '../../types/internal';
import { Text } from '../Text';

export interface StepperProps {
  steps: string[];
  activeStep: number;
  className?: string;
}

const defaultProps: StepperProps = {
  steps: [],
  activeStep: 0,
};

const StepperContainer = styled.div({
  display: 'flex',
  alignItems: 'center',
});

const StepWrapper = styled.div<StyledComponentsPrefix<{ isActive: boolean }>>(({ theme }) => {
  return {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[100],
  };
});

const StepCircle = styled.div<StyledComponentsPrefix<{ isActive: boolean }>>(({ theme, $isActive }) => ({
  width: 18,
  height: 18,
  borderRadius: '50%',
  flexShrink: 0,
  backgroundColor: $isActive ? theme.colors.primary.default : theme.colors.neutral[300],
  color: $isActive ? theme.colors.neutral.white : theme.colors.neutral[600],
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 2,
  position: 'relative',
}));

const StepLabel = styled(Text)(({ theme, $isActive }: StyledProps<{ $isActive: boolean }>) => {
  return {
    color: $isActive ? theme.colors.neutral.black : theme.colors.neutral[400],
    fontSize: theme.typography.caption.responsive.desktop.fontSize,
    textAlign: 'center',
    width: '100%',
  };
});

const StepLabelContainer = styled.div(({ theme }) => {
  return {
    display: 'flex',
    flexDirection: 'row',
    gap: theme.spacing[100],
    alignItems: 'center',
  };
});

const CheckIconStyled = styled.svg(({ theme }) => ({
  color: theme.colors.neutral[400],
  marginLeft: theme.spacing[200],
  marginRight: theme.spacing[200],
}));

const StepNumberText = styled(Text)(({ theme }: StyledProps<StepperProps>) => ({
  fontSize: theme.typography.small.responsive.desktop.fontSize,
  color: 'inherit',
}));

const CheckIcon: FunctionComponent<{ size?: number }> = ({ size = 12 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    role="img"
    aria-label="Check icon"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

const RightChevron: FunctionComponent<{ size?: number }> = ({ size = 12 }) => (
  <CheckIconStyled
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    role="img"
    aria-label="Chevron right icon"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path d="M9 6l6 6-6 6" />
  </CheckIconStyled>
);

export const Stepper = forwardRef<HTMLDivElement, StepperProps & InternalProps>(
  (props, forwardedRef: ForwardedRef<HTMLDivElement>) => {
    const { customizations } = useContext<SeedContextType>(SeedContext);

    const { steps, activeStep, className } = getDefaultProps<StepperProps & InternalProps>({
      providedProps: props,
      globalDefaultProps: customizations?.components?.stepper?.defaultProps,
      defaultProps,
    });

    return (
      <StepperContainer
        ref={forwardedRef}
        className={joinClasses(className)}
        $customizations={customizations.components?.stepper}
      >
        {steps.map((step, index) => {
          const isChecked = index + 1 < activeStep;
          const isActive = index + 1 === activeStep;

          return (
            <StepWrapper key={index}>
              {index !== 0 && <RightChevron size={14} />}
              <StepLabelContainer>
                <StepCircle $isActive={isChecked || isActive}>
                  {isChecked ? <CheckIcon /> : <StepNumberText>{index + 1}</StepNumberText>}
                </StepCircle>
                <StepLabel $isActive={isChecked || isActive}>{step}</StepLabel>
              </StepLabelContainer>
            </StepWrapper>
          );
        })}
      </StepperContainer>
    );
  },
);

Stepper.displayName = 'Stepper';
