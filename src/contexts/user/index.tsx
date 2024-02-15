'use client'

import { UserType } from '@/entities/user';
import { createContext, Dispatch, SetStateAction } from 'react';

export interface UserContextType {
  user: UserType | null;
  setUser: Dispatch<SetStateAction<UserType | null>>;
}

const UserContext = createContext<UserContextType>();
export default UserContext;