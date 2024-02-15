'use client'

import { CourseType } from '@/entities/courses';
import { Modal } from '@/features';
import { Text } from '@/shared/ui-library';
import React, { FC, HTMLAttributes, useState } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
    data: CourseType;
    className?: string;
}

const CourseCard: FC<Props> = ({ data, className, ...props }) => {

    const [isOpen, open] = useState(false);

    return (
        <>
            <div 
                className={`w-full max-w-[325px] p-4 pb-12 bg-ghost relative cursor-pointer rounded-m border-t-l flex flex-col h-full gap-6 items-start overflow-hidden ${className}`}
                style={{borderColor: data.color}} 
                onClick={() => open(true)}
                {...props}
            >
                <Text.Heading type="s">{data.name}</Text.Heading>

                <div className='flex items-center gap-2'>
                    <Text.Body>{data.abbr}</Text.Body>
                    <Text.Body>•</Text.Body>
                    <Text.Body>{data.credits} ETC credits</Text.Body>
                </div>
            </div>
        </>
    );
};

export default CourseCard;