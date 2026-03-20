import { FunctionComponent } from 'react';
import { SchemaWrapper, Box, BoxLabel, CirclePlaceholder } from '../../../../components/anatomy/shared';

const AvatarStackSchema: FunctionComponent = () => (
  <SchemaWrapper>
    <Box>
      <BoxLabel>Root</BoxLabel>
      <div style={{ display: 'flex' }}>
        <CirclePlaceholder style={{ zIndex: 3 }}>AB</CirclePlaceholder>
        <CirclePlaceholder style={{ zIndex: 2, marginLeft: -14 }}>CD</CirclePlaceholder>
        <CirclePlaceholder style={{ zIndex: 1, marginLeft: -14 }}>+N</CirclePlaceholder>
      </div>
    </Box>
  </SchemaWrapper>
);

export default AvatarStackSchema;
