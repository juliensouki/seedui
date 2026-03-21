import { FunctionComponent } from 'react';
import { SchemaWrapper, Box, BoxLabel, Row, Placeholder } from '../../../../components/anatomy/shared';

const StepperSchema: FunctionComponent = () => (
  <SchemaWrapper>
    <Box>
      <BoxLabel>Root</BoxLabel>
      <Row>
        <Box $dashed>
          <BoxLabel>Step</BoxLabel>
          <Row>
            <Placeholder>Step circle</Placeholder>
            <Placeholder>Step label</Placeholder>
          </Row>
        </Box>
        <Placeholder>&#8250;</Placeholder>
        <Box $dashed>
          <BoxLabel>Step</BoxLabel>
          <Row>
            <Placeholder>Step circle</Placeholder>
            <Placeholder>Step label</Placeholder>
          </Row>
        </Box>
      </Row>
    </Box>
  </SchemaWrapper>
);

export default StepperSchema;
