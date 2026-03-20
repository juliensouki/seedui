import { FunctionComponent } from 'react';
import { SchemaWrapper, Box, BoxLabel, Row, Col, Placeholder } from '../../anatomy-shared';

const InputSchema: FunctionComponent = () => (
  <SchemaWrapper>
    <Box>
      <BoxLabel>Root</BoxLabel>
      <Col>
        <Placeholder>Label</Placeholder>
        <Box $dashed>
          <BoxLabel>Container</BoxLabel>
          <Row>
            <Box $dashed>
              <BoxLabel>Icon container</BoxLabel>
              <Placeholder>icon</Placeholder>
            </Box>
            <Placeholder $grow>Input</Placeholder>
            <Box $dashed>
              <BoxLabel>Validation icon</BoxLabel>
              <Placeholder>&#10003; / &#10007;</Placeholder>
            </Box>
          </Row>
        </Box>
      </Col>
    </Box>
  </SchemaWrapper>
);

export default InputSchema;
