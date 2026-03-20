import { FunctionComponent } from 'react';
import { SchemaWrapper, Box, BoxLabel, Row, CirclePlaceholder } from '../../../../components/anatomy/shared';

const AvatarSchema: FunctionComponent = () => (
  <SchemaWrapper>
    <Box>
      <BoxLabel>Root</BoxLabel>
      <Row>
        <CirclePlaceholder>Image</CirclePlaceholder>
      </Row>
    </Box>
  </SchemaWrapper>
);

export default AvatarSchema;
