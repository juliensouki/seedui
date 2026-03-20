import { FunctionComponent } from 'react';
import { SchemaWrapper, Box, BoxLabel, Placeholder } from '../../../../components/anatomy/shared';

const ButtonSchema: FunctionComponent = () => (
  <SchemaWrapper>
    <Box>
      <BoxLabel>RootButton</BoxLabel>
      <Placeholder $grow>children</Placeholder>
    </Box>
  </SchemaWrapper>
);

export default ButtonSchema;
