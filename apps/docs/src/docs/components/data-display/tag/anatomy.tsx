import { FunctionComponent } from 'react';
import { SchemaWrapper, Box, BoxLabel, Row, Placeholder } from '../../../../components/anatomy/shared';

const TagSchema: FunctionComponent = () => (
  <SchemaWrapper>
    <Box>
      <BoxLabel>Root</BoxLabel>
      <Row>
        <Placeholder $grow>children</Placeholder>
        <Box $dashed>
          <BoxLabel>Remove button</BoxLabel>
          <Placeholder>&#10005;</Placeholder>
        </Box>
      </Row>
    </Box>
  </SchemaWrapper>
);

export default TagSchema;
