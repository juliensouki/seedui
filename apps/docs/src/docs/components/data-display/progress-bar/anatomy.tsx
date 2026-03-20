import { FunctionComponent } from 'react';
import { SchemaWrapper, Box, BoxLabel, Placeholder } from '../../anatomy-shared';

const ProgressBarSchema: FunctionComponent = () => (
  <SchemaWrapper>
    <Box>
      <BoxLabel>Track</BoxLabel>
      <Box $dashed style={{ width: '60%' }}>
        <BoxLabel>Fill</BoxLabel>
        <Placeholder>progress</Placeholder>
      </Box>
    </Box>
  </SchemaWrapper>
);

export default ProgressBarSchema;
