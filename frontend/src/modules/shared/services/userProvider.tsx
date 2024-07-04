import {ReactElement, ReactNode, useEffect, useState} from 'react';
import {UserContext} from './userContext.ts';
import {UserDto} from '../models/userDto.ts';
import {useApplicationService} from './application.service.ts';

// Define a type for the UserProvider props
type UserProviderProps = {
  children: ReactNode;
};

export const UserProvider = ({children}: UserProviderProps): ReactElement => {
  const applicationService = useApplicationService();
  const [user, setUser] = useState<null | UserDto>(null);

  useEffect((): void => {
    if (applicationService.isAuthenticated()) {
      void applicationService
        .fetchCurrentUser()
        .then((user: UserDto) => setUser(user))
        .catch(error => console.error(error));
    }
  }, [applicationService.isAuthenticated()]);

  return (
    <UserContext.Provider value={{user, setUser}}>
      {children}
    </UserContext.Provider>
  );
};
