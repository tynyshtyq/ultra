'use client'

import { Button, Text } from '@/shared/ui-library';
import { signIn } from 'next-auth/react';
import React, { FC, useState } from 'react';

interface Props {
    callbackUrl?: string;
    error?: string;
}


const DEFAULT_ERROR = 'Sign in failed. Try again later.';

const ERRROS: Record<string, string> = {
    'Signin': 'You need to sign in to view this page.',
    'OAuthAccountNotLinked': 'Seems like you used a different sign in method. Sign in with the same account you used originally.',
};


const AuthPage: FC<Props> = ({callbackUrl, error}) => {

    const errorMessage = error ? ERRROS[error] ?? DEFAULT_ERROR : null;
    const [isLoading, setLoading] = useState(false);

    console.log(callbackUrl);
    

    const handleGoogleSignIn = () => {
        setLoading(true)
        signIn('google', {
            callbackUrl
        })
        .finally(() => {
            setLoading(false);
        });
    };

    return (
        <div className='flex w-full h-full items-center justify-center flex-col gap-4'>
            <Text.Heading type='m' className='font-bold'>Sign in</Text.Heading>
            <Text.Body className='opacity-[.75]'>use your .nu.edu.kz account</Text.Body>
            <div className='flex flex-col gap-2 w-[350px]'>
                <Button.Secondary disabled={isLoading} onClick={handleGoogleSignIn} className='!w-full'>Google</Button.Secondary>
            </div>

            {errorMessage && <Text.Body>{errorMessage}</Text.Body>}
        </div>
    );
};

export default AuthPage;