'use client'

import { ROUTES } from '@/shared/constants';
import { Button, SVG, Text } from '@/shared/ui-library';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react';

const MainPage = () => {
    const router = useRouter();
    const session = useSession();

    const handleDashboard = () => {
        if (session.status === 'unauthenticated') {
            router.push(ROUTES.AUTH.get({
                query: {
                    callbackUrl: ROUTES.DASHBOARD.get(),
                },
            }))
        }
        else {
            router.push(ROUTES.DASHBOARD.get())
        }
    }

    return (
        <main className="flex flex-col min-h-screen bg-main items-center justify-center">
            <section className='flex flex-col items-start gap-4 max-w-[90%]'>
                <div className='w-full flex gap-2 items-center'>
                    <SVG.Logo className='w-9 h-9'/>
                    <Text.Title type='l' className='font-bold max-w-[600px] phone:max-w-[100%] text-vista'>Ultra</Text.Title>
                </div>
                
                <div className='max-w-[40vw] phone:max-w-[100%]'>
                    <Text.Heading type='l' className='w-full text-vista'>Transform your study experience with our <span className='phone:hidden'>all-in-one</span> platform</Text.Heading>
                </div>
                
                <div className='flex flex-col pl-2 phone:pl-0 gap-2 max-w-[65dvw]'>
                    <Text.Heading type='s'>- track grades with precision</Text.Heading>
                    <Text.Heading type='s'>- access ChatGPT 4 on-demand</Text.Heading>
                    <Text.Heading type='s'>- and connect with study partners effortlessly.</Text.Heading>
                </div>
                <Button.Primary onClick={handleDashboard}>
                    {session.status === 'unauthenticated' ? 'Login' : "Dashboard"}
                </Button.Primary>
            </section>
        </main>
    );
};

export default MainPage;