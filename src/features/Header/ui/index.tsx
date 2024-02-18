'use client'

import { useCourses } from '@/contexts';
import { UserType } from '@/entities/user';
import { LoadingPage } from '@/page';
import { ROUTES } from '@/shared/constants';
import { Button, Loader, SVG, Text } from '@/shared/ui-library';
import { signOut, useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import React, { FC, useContext, useState } from 'react';

interface Props {
    user: UserType | null;
}

const Header: FC<Props> = ({user}) => {

    const router = useRouter();

    const location = usePathname();
    console.log(location);
    
    const [loading, setLoading] = useState(false);

    const { status } = useCourses();

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

    const handleStudyBodies = React.useCallback(() => {
        router.push(ROUTES.STUDYBODY.get());
    }, [])

    const handleDashboard = React.useCallback(() => {
        router.push(ROUTES.DASHBOARD.get());
    }, []) 

    if (loading) return <LoadingPage />

    return (
        <nav className='w-full p-4 flex items-center justify-between border-b-m border-vista border-opacity-20 shadow-lg'>
            <div className='w-max flex items-center gap-2'>
                <SVG.Logo className='w-5 h-5 cursor-pointer' onClick={handleMainPage}/>
                <div className='flex items-center gap-4'>
                    <Text.Body className='phone:hidden'>{user?.name}</Text.Body>
                    {
                        !status && 
                        <div className='flex items-center gap-4'>
                            <Text.Body className='text-[14px]'>•</Text.Body>
                            <Text.Body className='text-[14px]'>saving</Text.Body>
                            <Loader className='text-[10px]'/>
                        </div>
                    }
                </div>
                
            </div>
            <div className='flex w-max items-center gap-2'>
                <Button.Secondary onClick={location === '/studybodies' ? handleDashboard : handleStudyBodies}>{location === '/studybodies' ? 'Dashboard' : 'Study bodies'}</Button.Secondary>
                <Button.Secondary onClick={handleSync}>Sync with registrar</Button.Secondary>
                <Button.Secondary onClick={handleSignOut}>Log out</Button.Secondary>
            </div>
            
        </nav>
    );
};

export default Header;