import {ReactElement, ReactNode, useEffect, useState} from 'react';
import {UserContext} from './userContext.ts';
import {UserDto} from '../models/userDto.ts';

// Define a type for the UserProvider props
type UserProviderProps = {
  children: ReactNode;
};

export const UserProvider = ({children}: UserProviderProps): ReactElement => {
  const [user, setUser] = useState<null | UserDto>(null);

  useEffect(() => {
    // Get the user data from local storage
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    // Whenever the user data changes, update it in local storage
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  return (
    <UserContext.Provider value={{user, setUser}}>
      {children}
    </UserContext.Provider>
  );
};
