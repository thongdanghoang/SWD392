import './App.scss';
import {AuthProvider} from 'oidc-react';
import TestLoginComponent from '../modules/dev/TestLoginComponent.tsx';
import {AuthProviderProps} from 'oidc-react/build/src/AuthContextInterface';
import AppHeader from '../modules/shared/components/header/AppHeader.tsx';
import AppFooter from '../modules/shared/components/footer/AppFooter.tsx';
import {ReactElement} from 'react';

export default function App(): ReactElement {
  const oidcConfig: AuthProviderProps = {
    authority: import.meta.env.VITE_APP_AUTHORITY as string,
    clientId: import.meta.env.VITE_APP_CLIENT_ID as string,
    responseType: 'code',
    redirectUri: import.meta.env.VITE_APP_REDIRECT_URI as string
  };

  return (
    <AuthProvider {...oidcConfig}>
      <div className="app">
        <AppHeader />
        <TestLoginComponent />
        <AppFooter />
      </div>
    </AuthProvider>
  );
}
