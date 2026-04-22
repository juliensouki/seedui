import { useState } from 'react';
import { Button, Modal, Text } from '@seedui-react/seedui';
import { ComponentDoc } from '../../../types';

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
  description: 'Dialog that overlays the page and requires attention before continuing.',
  overview: 'A focused overlay for confirmations, forms, or critical actions. Dims the background and traps focus. Dismissible via overlay click, Escape, or close button.',
  props: [
    { name: 'isOpen', type: 'boolean', default: '—', description: 'Controls visibility. Required.' },
    { name: 'onClose', type: '() => void', default: '—', description: 'Called when the modal should close. Required.' },
    { name: 'title', type: 'string', default: '—', description: 'Modal header title.' },
    { name: 'children', type: 'ReactNode', default: '—', description: 'Modal body content.' },
    { name: 'showCloseButton', type: 'boolean', default: 'true', description: 'Show the X close button.' },
    { name: 'closeOnOverlayClick', type: 'boolean', default: 'true', description: 'Close when clicking the overlay.' },
    { name: 'closeOnEscape', type: 'boolean', default: 'true', description: 'Close when pressing Escape.' },
    { name: 'width', type: 'string | number', default: '—', description: 'Modal width.' },
    { name: 'padding', type: 'number | string', default: '16', description: 'Inner padding of the modal body in px (number) or any valid CSS padding string.' },
  ],
  example: ModalExample,
  code: `const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Open Modal</Button>
<Modal isOpen={open} onClose={() => setOpen(false)} title="Title">
  <Text>Content here</Text>
</Modal>`,
  anatomy: [
    { name: 'Overlay', htmlAttribute: 'overlay', cssClass: 'modal-overlay' },
    { name: 'Container', htmlAttribute: 'container', cssClass: 'modal-container' },
    { name: 'Header', htmlAttribute: 'header', cssClass: 'modal-header' },
    { name: 'Content', htmlAttribute: 'content', cssClass: 'modal-content' },
    { name: 'Close button', htmlAttribute: 'closeButton', cssClass: 'modal-close-button' },
  ],
  usageExamples: [
    {
      code: `const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Open Modal</Button>
<Modal isOpen={open} onClose={() => setOpen(false)} title="Welcome">
  <Text variant="p">This is a basic modal dialog.</Text>
</Modal>`,
    },
    {
      code: `const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Wide Modal</Button>
<Modal isOpen={open} onClose={() => setOpen(false)} title="Settings" width={600}>
  <Text variant="p">This modal has a custom width of 600px.</Text>
</Modal>`,
    },
    {
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
