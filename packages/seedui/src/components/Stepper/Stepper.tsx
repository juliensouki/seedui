import { ForwardedRef, forwardRef, FunctionComponent, HTMLAttributes, useContext } from 'react';
import styled from 'styled-components';

import { getDefaultProps } from '../../utils/props';
import { joinClasses } from '../../utils/classes';
import { SeedContext } from '../ThemeProvider/context';
import { SeedContextType } from '../../types';
import { StyledComponentsPrefix, InternalProps, StyledProps } from '../../types/internal';
import { Text } from '../Text';

/** A horizontal step indicator showing progress through a multi-step flow. */
export interface StepperProps {
  /** Array of step labels displayed in order. */
  steps: string[];
  /** The current active step (1-based index). */
  activeStep: number;
  /** Additional CSS class for the root element. */
  className?: string;
  /** Access underlying DOM elements (root, step, stepCircle, stepLabel). */
  elementProps?: {
    root?: HTMLAttributes<HTMLDivElement>;
    step?: HTMLAttributes<HTMLDivElement>;
    stepCircle?: HTMLAttributes<HTMLDivElement>;
    stepLabel?: HTMLAttributes<HTMLDivElement>;
  };
}

const defaultProps: StepperProps = {
  steps: [],
  activeStep: 0,
  elementProps: {
    root: {},
    step: {},
    stepCircle: {},
    stepLabel: {},
  },
};

const StepperContainer = styled.div(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: theme.spacing(1),
  width: '100%',
  maxWidth: '100%',
  boxSizing: 'border-box',
  [`@media only screen and (max-width: ${theme.breakpoints[theme.breakpoints.mobile]}px)`]: {
    gap: theme.spacing(0.5),
  },
}));

const StepWrapper = styled.div<StyledComponentsPrefix<{ isActive: boolean }>>(({ theme }) => {
  return {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing(1),
    [`@media only screen and (max-width: ${theme.breakpoints[theme.breakpoints.mobile]}px)`]: {
      gap: theme.spacing(0.5),
    },
  };
});

const StepCircle = styled.div<StyledComponentsPrefix<{ isActive: boolean }>>(({ theme, $isActive }) => {
  const isLight = theme.mode === 'light';
  return {
    width: 18,
    height: 18,
    borderRadius: '50%',
    flexShrink: 0,
    backgroundColor: $isActive ? theme.colors.primary.default : isLight ? theme.colors.neutral[300] : theme.colors.neutral[400],
    color: $isActive ? theme.colors.neutral.white : isLight ? theme.colors.neutral[600] : theme.colors.neutral[700],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
    position: 'relative',
  };
});

const StepLabel = styled(Text)(({ theme, $isActive }: StyledProps<{ $isActive: boolean }>) => {
  const isLight = theme.mode === 'light';
  return {
    color: $isActive
      ? isLight ? theme.colors.neutral.black : theme.colors.neutral.white
      : isLight ? theme.colors.neutral[400] : theme.colors.neutral[600],
    fontSize: theme.typography.caption.fontSize,
    textAlign: 'center',
    [`@media only screen and (max-width: ${theme.breakpoints[theme.breakpoints.mobile]}px)`]: {
      display: $isActive ? 'block' : 'none',
    },
  };
});

const StepLabelContainer = styled.div(({ theme }) => {
  return {
    display: 'flex',
    flexDirection: 'row',
    gap: theme.spacing(1),
    alignItems: 'center',
  };
});

const CheckIconStyled = styled.svg(({ theme }) => ({
  color: theme.mode === 'light' ? theme.colors.neutral[400] : theme.colors.neutral[500],
  marginLeft: theme.spacing(2),
  marginRight: theme.spacing(2),
  [`@media only screen and (max-width: ${theme.breakpoints[theme.breakpoints.mobile]}px)`]: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));

const StepNumberText = styled(Text)(({ theme }: StyledProps<StepperProps>) => ({
  fontSize: theme.typography.small.fontSize,
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
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 6l6 6-6 6" />
  </CheckIconStyled>
);

/** A horizontal step indicator that shows progress through a sequential workflow. */
export const Stepper = forwardRef<HTMLDivElement, StepperProps & InternalProps>(
  (props, forwardedRef: ForwardedRef<HTMLDivElement>) => {
    const { customizations } = useContext<SeedContextType>(SeedContext);

    const {
      steps,
      activeStep,
      className,
      elementProps: {
        root: rootHTMLAttributes,
        step: stepHTMLAttributes,
        stepCircle: stepCircleHTMLAttributes,
        stepLabel: stepLabelHTMLAttributes,
      } = {},
    } = getDefaultProps<StepperProps & InternalProps>({
      providedProps: props,
      globalDefaultProps: customizations?.components?.stepper?.defaultProps,
      defaultProps,
    });

    return (
      <StepperContainer
        ref={forwardedRef}
        className={joinClasses('stepper-root', className, rootHTMLAttributes?.className)}
        $customizations={customizations.components?.stepper}
        {...rootHTMLAttributes}
      >
        {steps.map((step, index) => {
          const isChecked = index + 1 < activeStep;
          const isActive = index + 1 === activeStep;

          return (
            <StepWrapper key={index} className={joinClasses('stepper-step', stepHTMLAttributes?.className)} {...stepHTMLAttributes}>
              <StepLabelContainer>
                <StepCircle $isActive={isChecked || isActive} className={joinClasses('stepper-step-circle', stepCircleHTMLAttributes?.className)} {...stepCircleHTMLAttributes}>
                  {isChecked ? <CheckIcon /> : <StepNumberText>{index + 1}</StepNumberText>}
                </StepCircle>
                <StepLabel $isActive={isActive} className={joinClasses('stepper-step-label', stepLabelHTMLAttributes?.className)} {...stepLabelHTMLAttributes}>{step}</StepLabel>
              </StepLabelContainer>
              {index < steps.length - 1 && <RightChevron size={14} />}
            </StepWrapper>
          );
        })}
      </StepperContainer>
    );
  },
);

Stepper.displayName = 'Stepper';
