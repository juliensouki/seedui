import { FunctionComponent, useState } from 'react';
import { Button, Divider, Tag, Stepper } from '@juliensouki/seedui';
import { WallCard, MiniLabel } from './shared';

const stepLabels = ['Cart', 'Shipping', 'Payment', 'Confirmation'];

export const CheckoutCard: FunctionComponent = () => {
  const [checkoutStep, setCheckoutStep] = useState(3);

  return (
    <WallCard elementProps={{ rootDiv: { style: { gridColumn: 'span 2' } } }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <MiniLabel style={{ marginBottom: 0 }}>Checkout</MiniLabel>
        <Tag color="info" size="md">
          {`Step ${checkoutStep} of ${stepLabels.length}`}
        </Tag>
      </div>
      <Stepper steps={stepLabels} activeStep={checkoutStep} />
      <Divider spacing={10} />
      <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
        <Button
          variant="transparent"
          color="neutral"
          size="md"
          onClick={() => setCheckoutStep((s) => Math.max(1, s - 1))}
        >
          Back
        </Button>
        <Button
          variant="filled"
          color="primary"
          size="md"
          onClick={() => setCheckoutStep((s) => Math.min(stepLabels.length, s + 1))}
        >
          {checkoutStep === stepLabels.length ? 'Place Order' : `Continue to ${stepLabels[checkoutStep]}`}
        </Button>
      </div>
    </WallCard>
  );
};
