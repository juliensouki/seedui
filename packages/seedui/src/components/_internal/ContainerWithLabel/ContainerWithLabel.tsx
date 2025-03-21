import { FunctionComponent, HTMLAttributes, ReactNode } from 'react';
import styled from 'styled-components';
import { Text, TextPropsAndAttributes } from '../../Text';

const RootDiv = styled.div(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
}));

interface ContainerWithLabelProps {
  label?: string;
  children: ReactNode;
  htmlAttributes?: {
    rootDiv?: HTMLAttributes<HTMLDivElement>;
  };
  forwardProps?: {
    labelTextProps?: TextPropsAndAttributes;
  };
}

export const ContainerWithLabel: FunctionComponent<ContainerWithLabelProps> = ({
  label,
  children,
  htmlAttributes: { rootDiv } = {},
  forwardProps: { labelTextProps } = {},
}) => {
  if (label) {
    return (
      <RootDiv {...rootDiv}>
        {label && (
          <Text {...labelTextProps} variant="caption">
            {label}
          </Text>
        )}
        {children}
      </RootDiv>
    );
  }
  return children;
};
