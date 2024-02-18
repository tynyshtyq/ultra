import { Loader } from '@/shared/ui-library';
import React from 'react';

const Loading = () => {
    return (
        <div className='fixed top-0 z-[100] bottom-0 left-0 right-0 flex items-center justify-center bg-[rgba(255,255,255,0.7)]'>
            <Loader />
        </div>
    );
};

export default Loading;