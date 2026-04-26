import { FunctionComponent, useState } from 'react';
import { Button, Tag, Textarea } from '@juliensouki/seedui';
import { WallCard, MiniLabel, Row } from './shared';

export const FeedbackCard: FunctionComponent = () => {
  const [feedback, setFeedback] = useState('');
  const [feedbackTag, setFeedbackTag] = useState('Feature');

  return (
    <WallCard>
      <MiniLabel>Feedback</MiniLabel>
      <Row style={{ gap: 6, marginBottom: 12 }}>
        {['Bug', 'Feature', 'Improvement', 'Other'].map((label) => (
          <Tag
            key={label}
            color={feedbackTag === label ? 'primary' : 'neutral'}
            size="md"
            elementProps={{ root: { style: { cursor: 'pointer' }, onClick: () => setFeedbackTag(label) } }}
          >
            {label}
          </Tag>
        ))}
      </Row>
      <Textarea
        placeholder="Describe your feedback..."
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        width="100%"
      />
      <div style={{ display: 'flex', gap: 8, marginTop: 12, justifyContent: 'flex-end' }}>
        <Button
          variant="transparent"
          color="neutral"
          size="md"
          onClick={() => {
            setFeedback('');
            setFeedbackTag('Feature');
          }}
        >
          Clear
        </Button>
        <Button variant="filled" color="primary" size="md">
          Submit
        </Button>
      </div>
    </WallCard>
  );
};
