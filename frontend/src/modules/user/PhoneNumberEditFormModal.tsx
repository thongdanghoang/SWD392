import React, {ReactElement, useState} from 'react';
import {Form, Modal} from 'react-bootstrap';
import {ModalProps} from '../shared/components/modal/ModalContext.tsx';
import AppButton from '../shared/components/buttons/AppButton.tsx';

const PhoneNumberEditFormModal = ({
  hideModal,
  onSubmit,
  data
}: ModalProps): ReactElement => {
  const [formData, setFormData] = useState({
    phone: data.phone
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    const form = e.currentTarget;
    if (form.checkValidity() && onSubmit) {
      onSubmit(formData);
      hideModal();
    }
    setValidated(true);
  };

  const [validated, setValidated] = useState(false);

  return (
    <Modal show onHide={hideModal}>
      <Modal.Header closeButton>
        <Modal.Title className="semibold-20 text-color-tertiary">
          Số điện thoại của bạn
        </Modal.Title>
      </Modal.Header>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Modal.Body>
          <div className="d-flex flex-column gap-lg-3">
            <Form.Group controlId="formPhoneNumber">
              <Form.Label className="semibold-16 text-color-quaternary">
                Số điện thoại
              </Form.Label>
              <Form.Control
                type="text"
                name="phone"
                className="regular-14 text-color-quaternary"
                pattern="0\d{9}"
                value={formData.phone}
                onChange={e => {
                  setFormData({...formData, phone: e.target.value});
                }}
                required
              />
              <Form.Control.Feedback type="invalid">
                Số điện thoại không hợp lệ
              </Form.Control.Feedback>
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

export default PhoneNumberEditFormModal;
