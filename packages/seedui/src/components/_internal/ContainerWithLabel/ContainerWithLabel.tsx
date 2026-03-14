import { FunctionComponent, HTMLAttributes, ReactNode } from 'react';
import styled from 'styled-components';

import { Text, TextPropsAndAttributes } from '../../Text';

const RootDiv = styled.div<{ $width?: string | number }>(({ $width }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  width: $width || '100%',
}));

interface ContainerWithLabelProps {
  label?: string;
  width?: string | number;
  children: ReactNode;
  elementProps?: {
    rootDiv?: HTMLAttributes<HTMLDivElement>;
  };
  forwardProps?: {
    labelTextProps?: TextPropsAndAttributes;
  };
}

export const ContainerWithLabel: FunctionComponent<ContainerWithLabelProps> = ({
  label,
  children,
  width,
  elementProps: { rootDiv } = {},
  forwardProps: { labelTextProps } = {},
}) => {
  if (label) {
    return (
      <RootDiv {...rootDiv} $width={width}>
        {label && (
          <Text {...labelTextProps} variant="caption">
            {label}
          </Text>
        )}
        {children}
      </RootDiv>
    );
  }
  return (
    <RootDiv {...rootDiv} $width={width}>
      {children}
    </RootDiv>
  );
};
