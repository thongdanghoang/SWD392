import {ReactElement} from 'react';
import {Modal} from 'react-bootstrap';
import {ModalProps} from '../../shared/components/modal/ModalContext.tsx';
import AppButton from '../../shared/components/buttons/AppButton.tsx';

export const ExchangeProductConfirmationModal = ({
  hideModal,
  onSubmit,
  data
}: ModalProps): ReactElement => (
  <Modal show centered onHide={hideModal}>
    <Modal.Header closeButton>
      <Modal.Title>
        <div className="text-color-quaternary semibold-20">
          Xác nhận tạo yêu cầu giao dịch
        </div>
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <div className={'text-color-quaternary regular-14'}>
        {`Chênh lệch tổng giá trị giữa những sản phẩm bạn chọn và sản phẩm bạn muốn
      trao đổi là `}
        <strong className={'text-color-sub-color semibold-16'}>
          {data.differentPrice}
        </strong>
        {`, bạn có chắc chắn muốn gửi yêu cầu giao dịch không?`}
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
        Xác nhận gửi yêu cầu giao dịch
      </AppButton>
    </Modal.Footer>
  </Modal>
);
