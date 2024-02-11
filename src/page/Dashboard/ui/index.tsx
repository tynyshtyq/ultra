'use client'

import { Text } from '@/shared/ui-library';
import React, { FC } from 'react';

interface Props {
    user: any;
}

const DashboardPage: FC<Props> = ({user}) => {


    return (
        <main className='w-full min-h-screen flex flex-col'>
            <Text.Body>{user.name}</Text.Body>
        </main>
    );
};

export default DashboardPage;