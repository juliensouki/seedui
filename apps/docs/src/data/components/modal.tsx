import { useState } from 'react';
import { Button, Modal, Text } from '@seedui-react/seedui';
import { ComponentDoc } from './types';

function ModalExample() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      <Modal isOpen={open} onClose={() => setOpen(false)} title="Example Modal">
        <Text variant="p">This is modal content.</Text>
      </Modal>
    </>
  );
}

export const modalDoc: ComponentDoc = {
  name: 'Modal',
  category: 'Overlays',
  description: 'An overlay dialog with title, content, and close behavior.',
  overview: 'Modal presents content in a focused overlay that sits on top of the rest of the page. Use it for confirmations, forms, or any workflow that requires the user\'s full attention before continuing. It renders a backdrop that dims the underlying content and traps focus within the dialog for accessibility. Closing behavior is configurable — you can allow dismissal via the overlay click, the Escape key, or restrict it to the close button only for critical flows.',
  props: [
    { name: 'isOpen', type: 'boolean', default: '—', description: 'Controls visibility. Required.' },
    { name: 'onClose', type: '() => void', default: '—', description: 'Called when the modal should close. Required.' },
    { name: 'title', type: 'string', default: '—', description: 'Modal header title.' },
    { name: 'children', type: 'ReactNode', default: '—', description: 'Modal body content.' },
    { name: 'showCloseButton', type: 'boolean', default: 'true', description: 'Show the X close button.' },
    { name: 'closeOnOverlayClick', type: 'boolean', default: 'true', description: 'Close when clicking the overlay.' },
    { name: 'closeOnEscape', type: 'boolean', default: 'true', description: 'Close when pressing Escape.' },
    { name: 'width', type: 'string | number', default: '—', description: 'Modal width.' },
  ],
  example: ModalExample,
  code: `const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Open Modal</Button>
<Modal isOpen={open} onClose={() => setOpen(false)} title="Title">
  <Text>Content here</Text>
</Modal>`,
  anatomy: [
    { name: 'Overlay', htmlAttribute: 'overlayDiv', cssClass: '—' },
    { name: 'Modal container', htmlAttribute: 'modalDiv', cssClass: '—' },
    { name: 'Header', htmlAttribute: 'headerDiv', cssClass: '—' },
    { name: 'Content', htmlAttribute: 'contentDiv', cssClass: '—' },
    { name: 'Close button', htmlAttribute: 'closeButton', cssClass: '—' },
  ],
  usageExamples: [
    {
      title: 'Basic modal',
      description: 'A simple modal with a title and content. It closes when clicking the overlay, pressing Escape, or clicking the close button.',
      code: `const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Open Modal</Button>
<Modal isOpen={open} onClose={() => setOpen(false)} title="Welcome">
  <Text variant="p">This is a basic modal dialog.</Text>
</Modal>`,
    },
    {
      title: 'Custom width',
      description: 'Use the width prop to control the modal size. This is useful for forms or content that needs more horizontal space.',
      code: `const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Wide Modal</Button>
<Modal isOpen={open} onClose={() => setOpen(false)} title="Settings" width={600}>
  <Text variant="p">This modal has a custom width of 600px.</Text>
</Modal>`,
    },
    {
      title: 'Persistent modal',
      description: 'Disable overlay click and Escape to force the user to interact with the modal content. Useful for critical confirmations.',
      code: `const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Confirm Action</Button>
<Modal
  isOpen={open}
  onClose={() => setOpen(false)}
  title="Are you sure?"
  closeOnOverlayClick={false}
  closeOnEscape={false}
>
  <Text variant="p" style={{ marginBottom: 16 }}>This action cannot be undone.</Text>
  <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
    <Button color="neutral" variant="transparent" onClick={() => setOpen(false)}>Cancel</Button>
    <Button color="error" onClick={() => setOpen(false)}>Delete</Button>
  </div>
</Modal>`,
    },
  ],
};
