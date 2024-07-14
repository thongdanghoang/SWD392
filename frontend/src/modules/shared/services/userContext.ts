import React from 'react';
import {UserDto} from '../models/userDto.ts';

// Define a type for the user state
type UserState = {
  user: null | UserDto;
  setUser: React.Dispatch<React.SetStateAction<null | UserDto>>;
  updateUserData: (updatedUserData: UserDto) => void;
};

export const UserContext = React.createContext<UserState | undefined>(
  undefined
);
