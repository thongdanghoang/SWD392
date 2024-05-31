import {useApplicationService} from '../shared/services/application.service.ts';
import {ReactElement} from 'react';
import AppButton from '../shared/components/buttons/AppButton.tsx';
import {AppRoutingConstants} from '../shared/app-routing.constants.ts';

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
        </div>
      </div>
    );
  }
  return <div>Not logged in! Try to refresh to be redirected to Google.</div>;
};

export default TestLoginComponent;
