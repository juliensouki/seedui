import { FunctionComponent } from 'react';
import { SchemaWrapper, Box, BoxLabel, Col, Placeholder } from '../../../../components/anatomy/shared';

const TextareaSchema: FunctionComponent = () => (
  <SchemaWrapper>
    <Box>
      <BoxLabel>Root</BoxLabel>
      <Col>
        <Placeholder>Label</Placeholder>
        <Box $dashed>
          <BoxLabel>Input</BoxLabel>
          <Placeholder $grow>text content</Placeholder>
        </Box>
      </Col>
    </Box>
  </SchemaWrapper>
);

export default TextareaSchema;
