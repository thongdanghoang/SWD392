import {ReactElement} from 'react';
import {Button, Modal} from 'react-bootstrap';
import {ModalProps} from '../shared/components/modal/ModalContext.tsx';

export const SimpleModal = ({hideModal}: ModalProps): ReactElement => (
  <Modal show onHide={hideModal}>
    <Modal.Header closeButton>
      <Modal.Title>Modal Title</Modal.Title>
    </Modal.Header>
    <Modal.Body>This is the modal body.</Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={hideModal}>
        Close
      </Button>
      <Button
        variant="primary"
        onClick={() => {
          alert('Action!');
          hideModal();
        }}
      >
        Save Changes
      </Button>
    </Modal.Footer>
  </Modal>
);
