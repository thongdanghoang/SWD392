import React, {ReactElement, useState} from 'react';
import {Form, Modal} from 'react-bootstrap';
import {ModalProps} from '../shared/components/modal/ModalContext.tsx';
import AppButton from '../shared/components/buttons/AppButton.tsx';

const FirstnameLastnameEditFormModal = ({
  hideModal,
  onSubmit,
  data
}: ModalProps): ReactElement => {
  const [formData, setFormData] = useState({
    firstName: data.firstName,
    lastName: data.lastName,
    email: ''
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
      hideModal();
    }
  };

  return (
    <Modal show onHide={hideModal}>
      <Modal.Header closeButton>
        <Modal.Title className="semibold-20 text-color-tertiary">
          Họ và tên
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <div className="d-flex flex-column gap-lg-3">
            <Form.Group controlId="formFirstName">
              <Form.Label className="semibold-14 text-color-quaternary">
                Tên
              </Form.Label>
              <Form.Control
                type="text"
                name="firstname"
                className="regular-14 text-color-quaternary"
                value={formData.firstName}
                onChange={e => {
                  setFormData({...formData, firstName: e.target.value});
                }}
                required
              />
            </Form.Group>
            <Form.Group controlId="formLastname">
              <Form.Label className="semibold-14 text-color-quaternary">
                Họ
              </Form.Label>
              <Form.Control
                type="text"
                name="lastname"
                className="regular-14 text-color-quaternary"
                value={formData.lastName}
                onChange={e => {
                  setFormData({...formData, lastName: e.target.value});
                }}
                required
              />
            </Form.Group>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <AppButton variant="tertiary" onClick={hideModal}>
            Trở về
          </AppButton>
          <AppButton variant="primary" type="submit">
            Lưu thay đổi
          </AppButton>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default FirstnameLastnameEditFormModal;
