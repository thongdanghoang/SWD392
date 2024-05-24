import ApplicationService from '../shared/services/application.service.ts';
import {ReactElement} from 'react';
import AppButton from '../shared/components/buttons/AppButton.tsx';

const TestLoginComponent = (): ReactElement => {
  const applicationService: ApplicationService = new ApplicationService();

  const fetchData = (): void => {
    applicationService
      .getApiClient()
      .get('http://localhost:3000/user')
      .then(response => alert(JSON.stringify(response.data)))
      .catch(error => console.error('Error:', error));
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
