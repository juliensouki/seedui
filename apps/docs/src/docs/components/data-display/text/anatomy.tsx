import { FunctionComponent } from 'react';
import { SchemaWrapper, Box, BoxLabel, Placeholder } from '../../../../components/anatomy/shared';

const TextSchema: FunctionComponent = () => (
  <SchemaWrapper>
    <Box>
      <BoxLabel>Root</BoxLabel>
      <Placeholder $grow>children</Placeholder>
    </Box>
  </SchemaWrapper>
);

export default TextSchema;
