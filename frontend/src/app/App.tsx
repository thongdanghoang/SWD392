import "./App.scss";
import { AuthProvider } from "oidc-react";
import TestLoginComponent from "../modules/dev/TestLoginComponent.tsx";
import { AuthProviderProps } from "oidc-react/build/src/AuthContextInterface";
import AppHeader from "../modules/shared/components/header/AppHeader.tsx";
import AppFooter from "../modules/shared/components/footer/AppFooter.tsx";

export default function App() {

  const oidcConfig: AuthProviderProps = {
    authority: import.meta.env.VITE_APP_AUTHORITY,
    clientId: import.meta.env.VITE_APP_CLIENT_ID,
    responseType: "code",
    redirectUri: import.meta.env.VITE_APP_REDIRECT_URI
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