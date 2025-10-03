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
  justifyContent: 'space-between',
  width: '100%',
});

const StepWrapper = styled.div<StyledComponentsPrefix<{ isActive: boolean }>>(({ theme, $isActive }) => {
  const gapBetweenCirclesAndLines = 14;

  return {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
    position: 'relative',

    // Base line (grey)
    '&:not(:last-child)::after': {
      content: '""',
      position: 'absolute',
      top: '9px', // vertical center of circle
      left: `calc(50% + ${gapBetweenCirclesAndLines}px)`, // start 16px to the right of the circle
      right: `calc(-50% + ${gapBetweenCirclesAndLines}px)`, // end 16px before next circle
      height: '1px',
      backgroundColor: theme.colors.neutral[200],
      zIndex: 0,
    },

    // Animated active line
    '&:not(:last-child)::before': {
      content: '""',
      position: 'absolute',
      top: '9px',
      left: `calc(50% + ${gapBetweenCirclesAndLines}px)`, // same offset
      height: '1px',
      backgroundColor: theme.colors.primary.default,
      width: $isActive ? `calc(100% - ${gapBetweenCirclesAndLines * 2}px)` : '0%', // shrink to keep 3px gap on both sides
      transition: 'width 0.4s ease',
      zIndex: 1,
    },
  };
});

const StepCircle = styled.div<StyledComponentsPrefix<{ isActive: boolean }>>(({ theme, $isActive }) => ({
  width: 18,
  height: 18,
  borderRadius: '50%',
  backgroundColor: $isActive ? theme.colors.primary.default : theme.colors.neutral[200],
  color: $isActive ? theme.colors.neutral.white : theme.colors.neutral[600],
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 2,
  position: 'relative',
  transition: 'background-color 0.4s ease, color 0.4s ease',
}));

const StepLabel = styled(Text)(({ theme }: StyledProps<StepperProps>) => ({
  marginTop: theme.spacing['050'],
  fontSize: theme.typography.caption.responsive.desktop.fontSize,
  textAlign: 'center',
}));

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
