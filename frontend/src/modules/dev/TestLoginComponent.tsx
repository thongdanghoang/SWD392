import ApplicationService from '../shared/services/application.service.ts';
import {ReactElement} from 'react';
import AppPrimaryButton from '../shared/components/buttons/AppPrimaryButton.tsx';
import AppSecondaryButton from '../shared/components/buttons/AppSecondaryButton.tsx';

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
        <AppSecondaryButton
          onClickFn={() => applicationService.signOutRedirect()}
          children="Log out!"
          disabled
        />
        <AppPrimaryButton onClickFn={fetchData} children="Fetch data" active />
      </div>
    );
  }
  return <div>Not logged in! Try to refresh to be redirected to Google.</div>;
};

export default TestLoginComponent;
