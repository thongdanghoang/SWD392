import './App.scss';
import {AuthContextProps, useAuth} from 'oidc-react';
import TestLoginComponent from '../modules/dev/TestLoginComponent.tsx';
import AppHeader from '../modules/shared/components/header/AppHeader.tsx';
import AppFooter from '../modules/shared/components/footer/AppFooter.tsx';
import {ReactElement} from 'react';
import ApplicationService from '../modules/shared/services/application.service.ts';

export default function App(): ReactElement {
  const auth: AuthContextProps = useAuth();
  const applicationService = ApplicationService.getInstance();
  applicationService.setAuth(auth);

  return (
    <div className="app">
      <AppHeader />
      <TestLoginComponent />
      <AppFooter />
    </div>
  );
}
