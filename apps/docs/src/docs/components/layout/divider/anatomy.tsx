import { FunctionComponent } from 'react';
import { SchemaWrapper, Box, BoxLabel, Row, Placeholder } from '../../../../components/anatomy/shared';

const DividerSchema: FunctionComponent = () => (
  <SchemaWrapper>
    <Box>
      <BoxLabel>Root</BoxLabel>
      <Row>
        <Placeholder $grow>Line</Placeholder>
        <Placeholder>Children</Placeholder>
        <Placeholder $grow>Line</Placeholder>
      </Row>
    </Box>
  </SchemaWrapper>
);

export default DividerSchema;
