import { FunctionComponent } from 'react';
import { SchemaWrapper, Box, BoxLabel, Row, Col, Placeholder } from '../../anatomy-shared';

const TagSelectorSchema: FunctionComponent = () => (
  <SchemaWrapper>
    <Box>
      <BoxLabel>Root</BoxLabel>
      <Col>
        <Placeholder>Label</Placeholder>
        <Box $dashed>
          <BoxLabel>Input container</BoxLabel>
          <Row>
            <Box $dashed style={{ flex: 1 }}>
              <BoxLabel>Input</BoxLabel>
              <Placeholder $grow>text</Placeholder>
            </Box>
            <Box $dashed>
              <BoxLabel>Button</BoxLabel>
              <Placeholder>Add</Placeholder>
            </Box>
          </Row>
        </Box>
        <Box $dashed>
          <BoxLabel>Tags container</BoxLabel>
          <Row>
            <Placeholder>Tag</Placeholder>
            <Placeholder>Tag</Placeholder>
            <Placeholder>Tag</Placeholder>
          </Row>
        </Box>
      </Col>
    </Box>
  </SchemaWrapper>
);

export default TagSelectorSchema;
