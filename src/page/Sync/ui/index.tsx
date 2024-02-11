'use client';

import { Button, Input, Loader, SVG, Text } from '@/shared/ui-library';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, FormEvent, useCallback, useMemo, useState } from 'react';

const SyncPage = () => {

    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const [password, setPassword] = useState<string>('');

    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handlePasswordChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }, [])

    const handleSubmit = useCallback(async (e: FormEvent) => {

    }, []);

    const { data: session } = useSession();

    const username = React.useMemo(() => session?.user?.email?.split('@')[0] ?? '...', [session]);

    return (
        <main className='flex w-full h-full items-center justify-center'>
            {
                loading &&
                    <div className='fixed flex items-center justify-center top-0 left-0 w-full h-full z-4' style={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
                        <Loader className='!text-[24px]' />
                    </div>
            }
            <div className='flex flex-col items-start gap-6'>
                <Text.Body type='l' className='font-bold'>Have a good semester!</Text.Body>
                
                <form onSubmit={handleSubmit} className='max-w-[300px] w-full flex flex-col gap-2 items-center'>
                    <Input.Primary disabled value={username}></Input.Primary>
                    <div className='w-full flex gap-2'>
                        <Input.Primary type={showPassword ? 'text' : 'password'} placeholder='password' value={password} onChange={handlePasswordChange}></Input.Primary>
                        <Button.Secondary type='button' onClick={() => setShowPassword(!showPassword)}>
                            Show
                        </Button.Secondary>
                        
                    </div>
                    
                    <Text.Body>{errorMessage}</Text.Body>
                    <Button.Primary className='!w-full mt-2 flex items-center justify-center text-center' type="submit">Sync with registrar</Button.Primary>
                </form>

                <Text.Body className='opacity-[.7] !text-[12px] max-w-[300px]'>We only use your credentials via our API to retrieve your schedule; <span className='text-vista'>they are not stored by us.</span></Text.Body>
                
                
            </div>
        </main>
    );
};

export default SyncPage;