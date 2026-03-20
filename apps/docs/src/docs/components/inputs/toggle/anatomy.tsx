import { FunctionComponent } from 'react';
import { SchemaWrapper, Box, BoxLabel, Row, Placeholder } from '../../../../components/anatomy/shared';

const ToggleSchema: FunctionComponent = () => (
  <SchemaWrapper>
    <Box>
      <BoxLabel>Root</BoxLabel>
      <Row>
        <Box $dashed>
          <BoxLabel>Input</BoxLabel>
          <Placeholder>checkbox</Placeholder>
        </Box>
        <Box $dashed>
          <BoxLabel>Label</BoxLabel>
          <Placeholder>label text</Placeholder>
        </Box>
      </Row>
    </Box>
  </SchemaWrapper>
);

export default ToggleSchema;
