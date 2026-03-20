import { FunctionComponent } from 'react';
import { SchemaWrapper, Box, BoxLabel, Row, Col, Placeholder } from '../../anatomy-shared';

const SelectSchema: FunctionComponent = () => (
  <SchemaWrapper>
    <Box>
      <BoxLabel>Root</BoxLabel>
      <Col>
        <Placeholder>Label</Placeholder>
        <Box $dashed>
          <BoxLabel>Container</BoxLabel>
          <Row>
            <Placeholder>icon</Placeholder>
            <Placeholder $grow>Display</Placeholder>
            <Box $dashed>
              <BoxLabel>Arrow</BoxLabel>
              <Placeholder>&#9662;</Placeholder>
            </Box>
          </Row>
        </Box>
        <Box $dashed>
          <BoxLabel>Menu</BoxLabel>
          <Col>
            <Box $dashed>
              <BoxLabel>Menu item</BoxLabel>
              <Placeholder>option</Placeholder>
            </Box>
            <Box $dashed>
              <BoxLabel>Menu item</BoxLabel>
              <Placeholder>option</Placeholder>
            </Box>
          </Col>
        </Box>
      </Col>
    </Box>
  </SchemaWrapper>
);

export default SelectSchema;
