import { SVG, Text } from '@/shared/ui-library';
import React from 'react';

const Main = () => {
    return (
        <main className="flex flex-col min-h-screen bg-main items-center justify-center">
            <section className='flex flex-col items-start gap-4'>
                <SVG.Logo className='w-6 h-6'/>
                <Text.Title type='s' className='font-bold'><span className='text-vista'>Ultra</span></Text.Title>
            </section>
        </main>
    );
};

export default Main;