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
            <section className='flex flex-col items-start gap-4'>
                <SVG.Logo className='w-6 h-6'/>
                <Text.Title type='s' className='font-bold max-w-[600px]'><span className='text-vista'>Ultra.</span> Track your academic performance</Text.Title>
                <Text.Body>by <a target='_blank' href="https://tynyshtyq.blog/" className='text-vista' style={{opacity: '.7'}}>Dastan Tynyshtyq</a></Text.Body>
                <Button.Primary onClick={handleDashboard}>
                    {session.status === 'unauthenticated' ? 'Login' : "Dashboard"}
                </Button.Primary>
            </section>
        </main>
    );
};

export default MainPage;