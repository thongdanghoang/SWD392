import './App.scss';
import {AuthContextProps, useAuth} from 'oidc-react';
import {ReactElement} from 'react';
import ApplicationService from '../modules/shared/services/application.service.ts';
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import TestLoginComponent from '../modules/dev/TestLoginComponent.tsx';
import AppHeader from '../modules/shared/components/header/AppHeader.tsx';
import AppFooter from '../modules/shared/components/footer/AppFooter.tsx';
import HomepageComponent from '../modules/homepage/HomepageComponent.tsx';

export default function App(): ReactElement {
  const auth: AuthContextProps = useAuth();
  const applicationService = ApplicationService.getInstance();
  applicationService.setAuth(auth);

  return (
    <Router>
      <div className="app">
        <div className="header">
          <AppHeader />
        </div>
        <div className="body">
          <Routes>
            <Route path="/" element={<HomepageComponent />}></Route>
            <Route path="/dev" element={<TestLoginComponent />}></Route>
          </Routes>
        </div>
        <div className="footer">
          <AppFooter />
        </div>
      </div>
    </Router>
  );
}
