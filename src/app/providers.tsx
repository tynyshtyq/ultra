'use client';

import { CoursesProvider } from '@/contexts';
import { SessionProvider } from 'next-auth/react';
import React from 'react';


import type { PropsWithChildren } from 'react';

export const Providers: React.FC<PropsWithChildren> = ({ children }) => {

    return (
        <SessionProvider>
            <CoursesProvider>
                {children}
            </CoursesProvider>
        </SessionProvider>
    );
};