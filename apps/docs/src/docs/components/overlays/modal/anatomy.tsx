import { FunctionComponent } from 'react';
import { SchemaWrapper, Box, BoxLabel, Row, Col, Placeholder } from '../../../../components/anatomy/shared';

const ModalSchema: FunctionComponent = () => (
  <SchemaWrapper>
    <Box>
      <BoxLabel>Overlay</BoxLabel>
      <Box $dashed>
        <BoxLabel>Container</BoxLabel>
        <Col>
          <Box $dashed>
            <BoxLabel>Header</BoxLabel>
            <Row>
              <Placeholder $grow>Title</Placeholder>
              <Box $dashed>
                <BoxLabel>Close button</BoxLabel>
                <Placeholder>&#10005;</Placeholder>
              </Box>
            </Row>
          </Box>
          <Box $dashed>
            <BoxLabel>Content</BoxLabel>
            <Placeholder $grow>children</Placeholder>
          </Box>
        </Col>
      </Box>
    </Box>
  </SchemaWrapper>
);

export default ModalSchema;
