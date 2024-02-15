'use client'

import React, { useState, ReactNode, useMemo, useEffect } from 'react';
import { UserContext, UserContextType } from '@/contexts';

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserContextType['user']>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};