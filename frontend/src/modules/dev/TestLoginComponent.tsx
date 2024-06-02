import {ReactElement} from 'react';
import {useApplicationService} from '../shared/services/application.service.ts';
import {AppRoutingConstants} from '../shared/app-routing.constants.ts';
import AppButton from '../shared/components/buttons/AppButton.tsx';
import {useModal} from '../shared/components/modal/useModal.tsx';
import {SimpleModal} from './SimpleModal.tsx';
import FormModal from './FormModal.tsx';
import AddressFormModal from '../products/components/AddressFormModal.tsx';

const TestLoginComponent = (): ReactElement => {
  const applicationService = useApplicationService();

  const fetchData = (): void => {
    applicationService
      .createApiClient()
      .get(`${AppRoutingConstants.BASE_URL}/user`)
      .then(response => {
        alert(JSON.stringify(response.data));
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleModalSubmit = (data: any): void => {
    alert(JSON.stringify(data));
  };

  const modalContext = useModal();

  if (!modalContext) {
    // handle the case where modalContext is null
    // for example, you could return a loading spinner
    return <div>Loading...</div>;
  }

  const {showModal} = modalContext;

  if (applicationService.isAuthenticated()) {
    return (
      <div>
        <strong>Logged in! 🎉</strong>
        <br />
        <div className="actions d-flex gap-3">
          <AppButton
            style="secondary"
            onClickFn={() => applicationService.signOutRedirect()}
            children="Log out!"
          />
          <AppButton
            style="primary"
            onClickFn={fetchData}
            children="Fetch data"
          />
          <AppButton style="primary" onClickFn={() => showModal(SimpleModal)}>
            Show SimpleModal
          </AppButton>
          <AppButton
            style="primary"
            onClickFn={() => showModal(FormModal, handleModalSubmit)}
          >
            Show FormModel
          </AppButton>
          <AppButton
            style="primary"
            onClickFn={() => showModal(AddressFormModal, handleModalSubmit)}
          >
            Show AddressFormModal
          </AppButton>
        </div>
      </div>
    );
  }
  return <></>;
};

export default TestLoginComponent;
