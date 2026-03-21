import { FunctionComponent } from 'react';
import { SchemaWrapper, Box, BoxLabel, Placeholder } from '../../../../components/anatomy/shared';

const SkeletonSchema: FunctionComponent = () => (
  <SchemaWrapper>
    <Box>
      <BoxLabel>Root</BoxLabel>
      <Placeholder $grow>animated placeholder</Placeholder>
    </Box>
  </SchemaWrapper>
);

export default SkeletonSchema;
