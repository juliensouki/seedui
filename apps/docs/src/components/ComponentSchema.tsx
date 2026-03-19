import { FunctionComponent } from 'react';
import { styled } from '@seedui-react/seedui';

/* ------------------------------------------------------------------ */
/*  Generic building blocks                                            */
/* ------------------------------------------------------------------ */

const SchemaWrapper = styled('div')(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    padding: 32,
    borderRadius: 12,
    backgroundColor: isLight ? theme.colors.neutral[100] : theme.colors.neutral[200],
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  };
});

const Box = styled('div')<{ $dashed?: boolean }>(({ theme, $dashed }) => {
  const isLight = theme.mode === 'light';
  return {
    position: 'relative',
    border: `1.5px ${$dashed ? 'dashed' : 'solid'} ${isLight ? theme.colors.neutral[300] : theme.colors.neutral[400]}`,
    borderRadius: 8,
    padding: 16,
    backgroundColor: isLight ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.03)',
  };
});

const BoxLabel = styled('span')(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    position: 'absolute',
    top: -9,
    left: 12,
    fontSize: 11,
    fontWeight: 600,
    fontFamily: "'JetBrains Mono Variable', 'JetBrains Mono', monospace",
    color: isLight ? theme.colors.neutral[500] : theme.colors.neutral[800],
    backgroundColor: isLight ? theme.colors.neutral[100] : theme.colors.neutral[100],
    padding: '0 6px',
    letterSpacing: '0.02em',
  };
});

const Row = styled('div')(() => ({
  display: 'flex',
  gap: 10,
  alignItems: 'stretch',
}));

const Col = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 10,
}));

const Placeholder = styled('div')<{ $grow?: boolean }>(({ theme, $grow }) => {
  const isLight = theme.mode === 'light';
  return {
    flex: $grow ? 1 : undefined,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px 14px',
    borderRadius: 6,
    border: `1.5px dashed ${isLight ? theme.colors.neutral[300] : theme.colors.neutral[600]}`,
    fontSize: 11,
    fontWeight: 600,
    fontFamily: "'JetBrains Mono Variable', 'JetBrains Mono', monospace",
    color: isLight ? theme.colors.neutral[400] : theme.colors.neutral[800],
    whiteSpace: 'nowrap',
  };
});

/* ------------------------------------------------------------------ */
/*  Schema definitions                                                 */
/* ------------------------------------------------------------------ */

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
              <Placeholder>✓ / ✗</Placeholder>
            </Box>
          </Row>
        </Box>
      </Col>
    </Box>
  </SchemaWrapper>
);

const ModalSchema: FunctionComponent = () => (
  <SchemaWrapper>
    <Box>
      <BoxLabel>Overlay</BoxLabel>
      <Box $dashed>
        <BoxLabel>ModalContainer</BoxLabel>
        <Col>
          <Box $dashed>
            <BoxLabel>ModalHeader</BoxLabel>
            <Row>
              <Placeholder $grow>Title</Placeholder>
              <Placeholder>CloseButton</Placeholder>
            </Row>
          </Box>
          <Box $dashed>
            <BoxLabel>ModalContent</BoxLabel>
            <Placeholder $grow>children</Placeholder>
          </Box>
        </Col>
      </Box>
    </Box>
  </SchemaWrapper>
);

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
              <Placeholder>▾</Placeholder>
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

const StepperSchema: FunctionComponent = () => (
  <SchemaWrapper>
    <Box>
      <BoxLabel>StepperContainer</BoxLabel>
      <Row>
        <Box $dashed>
          <BoxLabel>StepWrapper</BoxLabel>
          <Box $dashed>
            <BoxLabel>StepLabelContainer</BoxLabel>
            <Row>
              <Placeholder>StepCircle</Placeholder>
              <Placeholder>StepLabel</Placeholder>
            </Row>
          </Box>
        </Box>
        <Placeholder>›</Placeholder>
        <Box $dashed>
          <BoxLabel>StepWrapper</BoxLabel>
          <Box $dashed>
            <BoxLabel>StepLabelContainer</BoxLabel>
            <Row>
              <Placeholder>StepCircle</Placeholder>
              <Placeholder>StepLabel</Placeholder>
            </Row>
          </Box>
        </Box>
      </Row>
    </Box>
  </SchemaWrapper>
);

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

const TooltipSchema: FunctionComponent = () => (
  <SchemaWrapper>
    <Box>
      <BoxLabel>MainDiv</BoxLabel>
      <Col>
        <Box $dashed>
          <BoxLabel>ChildrenWrapper</BoxLabel>
          <Placeholder $grow>children</Placeholder>
        </Box>
        <Box $dashed>
          <BoxLabel>TooltipComponent</BoxLabel>
          <Placeholder $grow>TooltipText</Placeholder>
        </Box>
      </Col>
    </Box>
  </SchemaWrapper>
);

const CirclePlaceholder = styled('div')<{ $size?: number }>(({ theme, $size = 48 }) => {
  const isLight = theme.mode === 'light';
  return {
    width: $size,
    height: $size,
    borderRadius: '50%',
    border: `1.5px dashed ${isLight ? theme.colors.neutral[300] : theme.colors.neutral[400]}`,
    backgroundColor: isLight ? theme.colors.neutral[100] : theme.colors.neutral[100],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 11,
    fontWeight: 600,
    fontFamily: "'JetBrains Mono Variable', 'JetBrains Mono', monospace",
    color: isLight ? theme.colors.neutral[400] : theme.colors.neutral[800],
    flexShrink: 0,
  };
});

const AvatarSchema: FunctionComponent = () => (
  <SchemaWrapper>
    <Box>
      <BoxLabel>RootDiv</BoxLabel>
      <Row>
        <CirclePlaceholder>img</CirclePlaceholder>
      </Row>
    </Box>
  </SchemaWrapper>
);

const AvatarStackSchema: FunctionComponent = () => (
  <SchemaWrapper>
    <Box>
      <BoxLabel>RootDiv</BoxLabel>
      <div style={{ display: 'flex' }}>
        <CirclePlaceholder style={{ zIndex: 3 }}>AB</CirclePlaceholder>
        <CirclePlaceholder style={{ zIndex: 2, marginLeft: -14 }}>CD</CirclePlaceholder>
        <CirclePlaceholder style={{ zIndex: 1, marginLeft: -14 }}>+N</CirclePlaceholder>
      </div>
    </Box>
  </SchemaWrapper>
);

const ButtonSchema: FunctionComponent = () => (
  <SchemaWrapper>
    <Box>
      <BoxLabel>RootButton</BoxLabel>
      <Placeholder $grow>children</Placeholder>
    </Box>
  </SchemaWrapper>
);

const IconButtonSchema: FunctionComponent = () => (
  <SchemaWrapper>
    <Box>
      <BoxLabel>RootButton</BoxLabel>
      <Placeholder>icon</Placeholder>
    </Box>
  </SchemaWrapper>
);

const CardSchema: FunctionComponent = () => (
  <SchemaWrapper>
    <Box>
      <BoxLabel>RootDiv</BoxLabel>
      <Placeholder $grow>children</Placeholder>
    </Box>
  </SchemaWrapper>
);

const DividerSchema: FunctionComponent = () => (
  <SchemaWrapper>
    <Row>
      <Placeholder $grow>Line</Placeholder>
    </Row>
  </SchemaWrapper>
);

const TagSchema: FunctionComponent = () => (
  <SchemaWrapper>
    <Box>
      <BoxLabel>RootDiv</BoxLabel>
      <Row>
        <Placeholder $grow>children</Placeholder>
        <Placeholder>RemoveButton</Placeholder>
      </Row>
    </Box>
  </SchemaWrapper>
);

const TextSchema: FunctionComponent = () => (
  <SchemaWrapper>
    <Box>
      <BoxLabel>TextElement</BoxLabel>
      <Placeholder $grow>children</Placeholder>
    </Box>
  </SchemaWrapper>
);

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

const PopoverSchema: FunctionComponent = () => (
  <SchemaWrapper>
    <Box>
      <BoxLabel>RootDiv</BoxLabel>
      <Col>
        <Box $dashed>
          <BoxLabel>TriggerDiv</BoxLabel>
          <Placeholder $grow>children</Placeholder>
        </Box>
        <Box $dashed>
          <BoxLabel>PopoverDiv</BoxLabel>
          <Placeholder $grow>content</Placeholder>
        </Box>
      </Col>
    </Box>
  </SchemaWrapper>
);

const ProgressBarSchema: FunctionComponent = () => (
  <SchemaWrapper>
    <Box>
      <BoxLabel>RootDiv / TrackDiv</BoxLabel>
      <Box $dashed style={{ width: '60%' }}>
        <BoxLabel>BarDiv</BoxLabel>
        <Placeholder>fill</Placeholder>
      </Box>
    </Box>
  </SchemaWrapper>
);

const SkeletonSchema: FunctionComponent = () => (
  <SchemaWrapper>
    <Box>
      <BoxLabel>RootDiv</BoxLabel>
      <Placeholder $grow>animated placeholder</Placeholder>
    </Box>
  </SchemaWrapper>
);

/* ------------------------------------------------------------------ */
/*  Registry                                                           */
/* ------------------------------------------------------------------ */

const schemas: Record<string, FunctionComponent> = {
  Avatar: AvatarSchema,
  AvatarStack: AvatarStackSchema,
  Button: ButtonSchema,
  IconButton: IconButtonSchema,
  Card: CardSchema,
  Divider: DividerSchema,
  SearchBar: SearchBarSchema,
  Input: InputSchema,
  Modal: ModalSchema,
  Popover: PopoverSchema,
  ProgressBar: ProgressBarSchema,
  Select: SelectSchema,
  Skeleton: SkeletonSchema,
  Stepper: StepperSchema,
  Tag: TagSchema,
  TagSelector: TagSelectorSchema,
  Text: TextSchema,
  Textarea: TextareaSchema,
  Toggle: ToggleSchema,
  Tooltip: TooltipSchema,
};

/* ------------------------------------------------------------------ */
/*  Public component                                                   */
/* ------------------------------------------------------------------ */

interface ComponentSchemaProps {
  name: string;
}

export const ComponentSchema: FunctionComponent<ComponentSchemaProps> = ({ name }) => {
  const Schema = schemas[name];
  if (!Schema) return null;
  return <Schema />;
};
