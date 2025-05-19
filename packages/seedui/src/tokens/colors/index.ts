import * as lightSemantic from './light/semantics';
import * as darkSemantic from './dark/semantics';
import * as lightPrimitives from './light/primitives';
import * as darkPrimitives from './dark/primitives';

export const semantic = {
  light: lightSemantic,
  dark: darkSemantic,
};

export const primitives = {
  light: lightPrimitives,
  dark: darkPrimitives,
};
