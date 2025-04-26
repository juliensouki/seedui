import { IStyledComponent } from 'styled-components';
import { Mode, Theme } from './theme';

// Props that we don't expose but are useful internally.
export interface InternalProps {
  className?: string;
}

export type StyledComponentsPrefix<T> = {
  [K in keyof T as `$${string & K}`]: T[K];
};

// Necessary to avoid no-unsafe-member-access and no-unsafe-argument linting errors.
// Props type is "any" when extending styles on an existing component using styled function.
// This type is just a workaround to avoid linting errors when using the styled extension feature from styled-components.
export type StyledProps<T> = { theme: Theme & { mode: Mode } } & T;

export type StyledComponent<T> = IStyledComponent<'web', StyledProps<T>>;
