import {ReactElement} from 'react';
import {Modal} from 'react-bootstrap';
import {ModalProps} from '../modal/ModalContext.tsx';
import AppButton from '../buttons/AppButton.tsx';

export const DeleteProductConfirmationModal = ({
  hideModal,
  onSubmit
}: ModalProps): ReactElement => (
  <Modal show centered onHide={hideModal}>
    <Modal.Header closeButton>
      <Modal.Title>
        <div className="text-color-quaternary semibold-20">
          Xác nhận gỡ sản phẩm
        </div>
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <div className={'text-color-quaternary regular-14'}>
        Bạn có chắc chắn muốn gỡ sản phẩm này không?
      </div>
    </Modal.Body>
    <Modal.Footer>
      <AppButton variant="tertiary" onClick={hideModal}>
        Không
      </AppButton>
      <AppButton
        variant="primary"
        onClick={(): void => {
          hideModal();
          if (onSubmit) {
            onSubmit();
          }
        }}
      >
        Xác nhận gỡ sản phẩm
      </AppButton>
    </Modal.Footer>
  </Modal>
);
