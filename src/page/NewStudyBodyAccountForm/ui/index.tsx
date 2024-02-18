'use client'

import { createBodyAccount } from '@/app/actions/Studybody/create';
import { ROUTES } from '@/shared/constants';
import { Button, Input, Loader, SVG, Text } from '@/shared/ui-library';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, FormEvent, useState } from 'react';

const NewStudyBodyAccountForm = () => {

    const router = useRouter();
    const { data: session } = useSession();

    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const [telegram, setTelegram] = useState<string>();

    const handleTelegramChange = (e: ChangeEvent<HTMLInputElement>) => {
        let inputValue = e.target.value.trim();
    
        let username = inputValue.startsWith('@') ? inputValue : '@' + inputValue;
    
        setTelegram(username);
    }
    
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        if (telegram && session && session.user.name) {
            createBodyAccount({
                telegram: telegram,
                name: session.user.name
            })
            .then((res) => {
                window.location.href = ROUTES.STUDYBODY.get()
            })
            .finally(() => {
                setLoading(false)
            })

        }
        

    };

    const handleMainPage = React.useCallback(() => {
        router.push(ROUTES.HOME.get());
    }, [])

    return (
        <main className='flex w-full h-full flex-col'>

            {
                loading &&
                    <div className='fixed flex items-center justify-center top-0 left-0 w-full h-full z-[10]' style={{backgroundColor: 'rgba(255, 255, 255, 0.7)'}}>
                        <Loader className='!text-[24px]' />
                    </div>
            }

            <div className='flex flex-col items-start gap-6 m-auto'>

                <SVG.Logo className='w-6 h-6' onClick={handleMainPage} />
                <Text.Body type='l' className='font-bold'>Find your study partner!</Text.Body>
                
                <form onSubmit={handleSubmit} className='max-w-[300px] w-full flex flex-col gap-2 items-center'>
                    <Input.Primary value={telegram} placeholder='Telegram username' onChange={handleTelegramChange}></Input.Primary>
                    
                    <Text.Body>{errorMessage}</Text.Body>
                    <Button.Primary className='!w-full mt-2 flex items-center justify-center text-center' type="submit">Create a profile</Button.Primary>
                </form>

                <Text.Body className='opacity-[.7] !text-[12px] max-w-[300px]'>We only use your credentials via our API to retrieve your schedule; <span className='text-vista'>they are not stored by us.</span></Text.Body>
                
            </div>
        </main>
    );
};

export default NewStudyBodyAccountForm;