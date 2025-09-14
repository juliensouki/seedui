import styled, { keyframes } from 'styled-components';
import { Sizes } from '../../../types';

export type LoaderSize = Exclude<Sizes, 'xs' | 'xl'>;

export interface LoaderProps {
  size?: LoaderSize;
  color?: string;
}

const spin = keyframes`
  to {
    transform: rotate(1turn);
  }
`;

const loaderSizes: Record<LoaderSize, { $size: number; $width: number }> = {
  sm: { $size: 13, $width: 2 },
  md: { $size: 16, $width: 3 },
  lg: { $size: 20, $width: 4 },
};

const LoaderWrapper = styled.div<{ $size: number; $width: number; $color?: string }>`
  width: ${({ $size }) => `${$size}px;`}
  padding: ${({ $width }) => `${$width}px;`}
  aspect-ratio: 1;
  border-radius: 50%;
  background: ${({ $color, theme }) => `${$color || theme.colors.primary[600]};`}
  --_m: conic-gradient(#0000 10%, #000), linear-gradient(#000 0 0) content-box;
  -webkit-mask: var(--_m);
  mask: var(--_m);
  -webkit-mask-composite: source-out;
  mask-composite: subtract;
  animation: ${spin} 1s infinite linear;
  }
`;

export const Loader = ({ size = 'md', color }: LoaderProps) => {
  return <LoaderWrapper {...loaderSizes[size]} $color={color} />;
};
