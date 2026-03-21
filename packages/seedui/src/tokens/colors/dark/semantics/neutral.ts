import { SemanticColorShades } from '../../../../types';
import { grey } from '../primitives/grey';
import white from '../primitives/white';
import black from '../primitives/black';

export const neutral: SemanticColorShades & { white: string; black: string } = {
  default: grey[600],
  100: grey[100],
  200: grey[200],
  300: grey[300],
  400: grey[400],
  500: grey[500],
  600: grey[600],
  700: grey[700],
  800: grey[800],
  900: grey[900],
  white,
  black,
};
