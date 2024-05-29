import ApplicationService from '../shared/services/application.service.ts';
import {ReactElement} from 'react';
import AppButton from '../shared/components/buttons/AppButton.tsx';

const TestLoginComponent = (): ReactElement => {
  const applicationService: ApplicationService = new ApplicationService();

  const fetchData = (): void => {
    const currentUser = applicationService.getCurrentUser();
    if (currentUser) {
      alert(`Hello ${currentUser.given_name} ${currentUser.family_name}!`);
    } else {
      void applicationService.fetchCurrentUser().then(() => {
        const currentUser = applicationService.getCurrentUser();
        if (currentUser) {
          alert(`Hello ${currentUser.given_name} ${currentUser.family_name}!`);
        } else {
          alert('User not found');
        }
      });
    }
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
