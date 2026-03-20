import { FunctionComponent } from 'react';
import { SchemaWrapper, Box, BoxLabel, Placeholder } from '../../anatomy-shared';

const CardSchema: FunctionComponent = () => (
  <SchemaWrapper>
    <Box>
      <BoxLabel>Root</BoxLabel>
      <Placeholder $grow>children</Placeholder>
    </Box>
  </SchemaWrapper>
);

export default CardSchema;
