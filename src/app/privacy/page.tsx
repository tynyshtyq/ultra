import { Text } from '@/shared/ui-library';
import Link from 'next/link';
import React from 'react';

const Privacy = () => {
    return (
        <div className='w-full h-full flex items-center justify-center'>
            <div className='flex max-w-[350px] w-full flex-col gap-4'>
                <Text.Heading type='m'>Privacy policy</Text.Heading>
                <Text.Body type='m' className='text-justify opacity-[.7]'>ultra is a tool to track your academic performance. It does not collect any personal information, except courses details.</Text.Body>
                <Text.Body type='m' className='text-justify opacity-[.7]'>We don&apos;t store passwords or any other sensitive information. Even registrar password is not stored.</Text.Body>
                <Link href={'/'}><Text.Body type='m' className='text-justify text-vista'>Home</Text.Body></Link>
            </div>
        </div>
    );
};

export default Privacy;