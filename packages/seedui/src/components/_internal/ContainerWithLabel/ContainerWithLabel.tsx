import { FunctionComponent, HTMLAttributes, ReactNode } from 'react';
import styled from 'styled-components';

import { Text, TextPropsAndAttributes } from '../../Text';
import { joinClasses } from '../../../utils/classes';

const RootDiv = styled.div<{ $width?: string | number }>(({ $width }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  width: $width || '100%',
}));

const LabelText = styled(Text)(({ theme }) => ({
  color: theme.mode === 'light' ? theme.colors.neutral.black : theme.colors.neutral[900],
}));

interface ContainerWithLabelProps {
  label?: string;
  width?: string | number;
  children: ReactNode;
  className?: string;
  elementProps?: {
    root?: HTMLAttributes<HTMLDivElement>;
  };
  forwardProps?: {
    labelTextProps?: TextPropsAndAttributes;
  };
}

export const ContainerWithLabel: FunctionComponent<ContainerWithLabelProps> = ({
  label,
  children,
  width,
  className,
  elementProps: { root } = {},
  forwardProps: { labelTextProps } = {},
}) => {
  const mergedClassName = joinClasses(className, root?.className);

  if (label) {
    return (
      <RootDiv {...root} className={mergedClassName} $width={width}>
        {label && (
          <LabelText {...labelTextProps} variant="caption">
            {label}
          </LabelText>
        )}
        {children}
      </RootDiv>
    );
  }
  return (
    <RootDiv {...root} className={mergedClassName} $width={width}>
      {children}
    </RootDiv>
  );
};
