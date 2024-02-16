'use client'

import React, { ReactNode } from 'react';
import { CoursesProvider } from './coursesContext';

type AppProviderProps = {
  children: ReactNode;
};

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return <CoursesProvider>{children}</CoursesProvider>;
};

export default AppProvider;