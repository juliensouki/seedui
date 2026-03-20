import { FunctionComponent } from 'react';
import { SchemaWrapper, Box, BoxLabel, Col, Placeholder } from '../../../../components/anatomy/shared';

const TooltipSchema: FunctionComponent = () => (
  <SchemaWrapper>
    <Box>
      <BoxLabel>Root</BoxLabel>
      <Col>
        <Box $dashed>
          <BoxLabel>Trigger</BoxLabel>
          <Placeholder $grow>children</Placeholder>
        </Box>
        <Box $dashed>
          <BoxLabel>Tooltip</BoxLabel>
          <Placeholder $grow>text</Placeholder>
        </Box>
      </Col>
    </Box>
  </SchemaWrapper>
);

export default TooltipSchema;
