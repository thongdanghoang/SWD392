import ReactDOM from 'react-dom/client';
import App from './app/App.tsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery';
import 'bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './index.css';
import '@assets/styles/styles.scss';
import {AuthProviderProps} from 'oidc-react/build/src/AuthContextInterface';
import {AuthProvider} from 'oidc-react';

const oidcConfig: AuthProviderProps = {
  authority: import.meta.env.VITE_APP_AUTHORITY as string,
  clientId: import.meta.env.VITE_APP_CLIENT_ID as string,
  responseType: 'code',
  redirectUri: import.meta.env.VITE_APP_REDIRECT_URI as string
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <AuthProvider {...oidcConfig}>
    <App />
  </AuthProvider>
  // </React.StrictMode>
);
