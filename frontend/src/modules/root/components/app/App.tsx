import "./App.scss";
import { AuthProvider } from "oidc-react";
import LoggedIn from "../../LoggedIn.tsx";
import { AuthProviderProps } from "oidc-react/build/src/AuthContextInterface";
import AppHeader from "../header/AppHeader.tsx";
import AppFooter from "../footer/AppFooter.tsx";

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
        <LoggedIn />
        <AppFooter />
      </div>
    </AuthProvider>
  );
}