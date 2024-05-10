import { AuthContextProps, useAuth } from "oidc-react";
import { createApiClient } from "../shared/utils/apiClient.ts";
import { AxiosInstance } from "axios";

const LoggedIn = () => {
  const auth: AuthContextProps = useAuth();
  const accessToken: string | undefined = auth.userData?.access_token;
  const apiClient: AxiosInstance = createApiClient(accessToken);

  const fetchData = (): void => {
    apiClient.get("http://localhost:3000/")
      .then(response => console.log(response.data))
      .catch(error => console.error("Error:", error));
  };

  if (auth && auth.userData) {
    return (
      <div>
        <strong>Logged in! 🎉</strong><br />
        <button type="button" className="btn btn-danger" onClick={() => auth.signOutRedirect()}>Log out!</button>
        <button type="button" className="btn btn-success" onClick={fetchData}>Fetch Data</button>
      </div>
    );
  }
  return <div>Not logged in! Try to refresh to be redirected to Google.</div>;
};

export default LoggedIn;
