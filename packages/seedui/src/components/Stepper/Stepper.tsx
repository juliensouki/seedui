import { ForwardedRef, forwardRef, useContext } from 'react';
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
  width: '100%',
});

const StepWrapper = styled.div<StyledComponentsPrefix<{ isActive: boolean }>>(({ theme, $isActive }) => {
  const gap = 14;
  const circleDiameter = 18;
  const lineTop = circleDiameter / 2;

  return {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',

    '&:not(:last-child)::after': {
      content: '""',
      position: 'absolute',
      top: `${lineTop}px`,
      left: `calc(50% + ${gap}px)`,
      width: `calc(100% - ${gap * 2}px)`,
      height: '1px',
      backgroundColor: theme.colors.neutral[300],
      zIndex: 0,
    },

    '&:not(:last-child)::before': {
      content: '""',
      position: 'absolute',
      top: `${lineTop}px`,
      left: `calc(50% + ${gap}px)`,
      height: '1px',
      backgroundColor: theme.colors.primary.default,
      width: $isActive ? `calc(100% - ${gap * 2}px)` : '0%',
      zIndex: 1,
    },
  };
});

const StepCircle = styled.div<StyledComponentsPrefix<{ isActive: boolean }>>(({ theme, $isActive }) => ({
  width: 18,
  height: 18,
  borderRadius: '50%',
  backgroundColor: $isActive ? theme.colors.primary.default : theme.colors.neutral[300],
  color: $isActive ? theme.colors.neutral.white : theme.colors.neutral[600],
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 2,
  position: 'relative',
}));

const StepLabel = styled(Text)(({ theme }: StyledProps<{ $align?: 'left' | 'center' | 'right' }>) => {
  return {
    marginTop: theme.spacing['050'],
    fontSize: theme.typography.caption.responsive.desktop.fontSize,
    textAlign: 'center',
    width: '100%',
  };
});

const StepNumberText = styled(Text)(({ theme }: StyledProps<StepperProps>) => ({
  fontSize: theme.typography.small.responsive.desktop.fontSize,
  color: 'inherit',
}));

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
          const isLinkActive = index + 1 < activeStep;
          const isCircleActive = index + 1 <= activeStep;

          return (
            <StepWrapper key={index} $isActive={isLinkActive}>
              <StepCircle $isActive={isCircleActive}>
                <StepNumberText>{index + 1}</StepNumberText>
              </StepCircle>
              <StepLabel>{step}</StepLabel>
            </StepWrapper>
          );
        })}
      </StepperContainer>
    );
  },
);

Stepper.displayName = 'Stepper';
