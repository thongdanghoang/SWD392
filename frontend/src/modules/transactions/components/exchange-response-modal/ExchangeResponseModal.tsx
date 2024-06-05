import {ReactElement} from 'react';
import {Modal} from 'react-bootstrap';
import {ModalProps} from '../../../shared/components/modal/ModalContext.tsx';
import AppButton from '../../../shared/components/buttons/AppButton.tsx';
import {useApplicationService} from '../../../shared/services/application.service.ts';
import {AppRoutingConstants} from '../../../shared/app-routing.constants.ts';

export const ExchangeResponseModal = ({
  hideModal,
  onSubmit,
  onReject,
  data
}: ModalProps): ReactElement => {
  const applicationService = useApplicationService();
  const handleReject = (): void => {
    applicationService
      .createApiClient()
      .post(`${AppRoutingConstants.EXCHANGE_REJECT_PATH}/${data.exchangeId}`)
      .then(() => onReject)
      .catch(error => console.error(error))
      .finally(() => hideModal());
  };
  const handleSubmit = (): void => {
    applicationService
      .createApiClient()
      .post(`${AppRoutingConstants.EXCHANGE_ACCEPT_PATH}/${data.exchangeId}`)
      .then(() => onSubmit)
      .catch(error => console.error(error))
      .finally(() => hideModal());
  };
  return (
    <Modal show onHide={hideModal}>
      <Modal.Header closeButton>
        <Modal.Title className="semibold-20 text-color-tertiary">
          Xác nhận giao dịch
        </Modal.Title>
      </Modal.Header>
      <Modal.Body></Modal.Body>
      <Modal.Footer>
        <AppButton variant="secondary" onClick={hideModal}>
          Đóng
        </AppButton>
        <AppButton variant="tertiary" onClick={handleReject}>
          Từ chối
        </AppButton>
        <AppButton variant="primary" onClick={handleSubmit}>
          Đồng ý
        </AppButton>
      </Modal.Footer>
    </Modal>
  );
};
