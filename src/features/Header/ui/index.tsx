'use client'

import { UserType } from '@/entities/user';
import { LoadingPage } from '@/page';
import { ROUTES } from '@/shared/constants';
import { Button, SVG, Text } from '@/shared/ui-library';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { FC, useContext, useState } from 'react';

interface Props {
    user: UserType;
}

const Header: FC<Props> = ({user}) => {

    const router = useRouter();
    
    const [loading, setLoading] = useState(false);

    const handleSync = () => {
        router.push(ROUTES.DASHBOARD.get({
            query: {
                refetch: 1
            }
        }))
        setLoading(true)
    }

    const handleSignOut = React.useCallback(async () => {
        signOut();
    }, []);

    const handleMainPage = React.useCallback(() => {
        router.push(ROUTES.HOME.get());
    }, [])

    if (loading) return <LoadingPage />

    return (
        <nav className='w-full p-4 flex items-center justify-between border-b-m border-vista border-opacity-20 shadow-lg'>
            <div className='w-max flex items-center gap-2'>
                <SVG.Logo className='w-5 h-5 cursor-pointer' onClick={handleMainPage}/>
                <Text.Body>{user?.name}</Text.Body>
            </div>
            <div className='flex w-max items-center gap-2'>
                <Button.Secondary onClick={handleSync}>Sync with registrar</Button.Secondary>
                <Button.Secondary onClick={handleSignOut}>Log out</Button.Secondary>
            </div>
            
        </nav>
    );
};

export default Header;