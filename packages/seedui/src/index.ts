import * as lightSemanticColors from './tokens/colors/light/semantics';
import * as lightPrimitiveColors from './tokens/colors/light/primitives';
import * as darkSemanticColors from './tokens/colors/dark/semantics';
import * as darkPrimitiveColors from './tokens/colors/dark/primitives';

export * from './style';

export * from './components';
export * from './types';

export const colors = {
  light: { primitive: lightPrimitiveColors, semantic: lightSemanticColors },
  dark: { primitive: darkPrimitiveColors, semantic: darkSemanticColors },
};
