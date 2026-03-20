import { FunctionComponent } from 'react';
import { SchemaWrapper, Box, BoxLabel, Row, Placeholder } from '../../../../components/anatomy/shared';

const SearchBarSchema: FunctionComponent = () => (
  <SchemaWrapper>
    <Box>
      <BoxLabel>Root</BoxLabel>
      <Row>
        <Box $dashed>
          <BoxLabel>Icon</BoxLabel>
          <Placeholder>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="7" />
              <line x1="15.95" y1="15.95" x2="20.5" y2="20.5" />
            </svg>
          </Placeholder>
        </Box>
        <Box $dashed style={{ flex: 1 }}>
          <BoxLabel>Input</BoxLabel>
          <Placeholder $grow>Search...</Placeholder>
        </Box>
        <Box $dashed>
          <BoxLabel>Button</BoxLabel>
          <Placeholder>Search</Placeholder>
        </Box>
      </Row>
    </Box>
  </SchemaWrapper>
);

export default SearchBarSchema;
