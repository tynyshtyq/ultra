'use client'

import { useCourses } from '@/contexts';
import { CourseType } from '@/entities/courses';
import { UserType } from '@/entities/user';
import { Header } from '@/features';
import { ROUTES } from '@/shared/constants';
import { Text } from '@/shared/ui-library';
import { Catalogue, GradeInfo } from '@/widgets';
import Link from 'next/link';
import React, { FC, useEffect } from 'react';

interface Props {
    user: UserType;
    courses: CourseType[];
}

const DashboardPage: FC<Props> = ({user, courses}) => {

    const {setCourses} = useCourses();

    useEffect(() => {
        setCourses(courses)
    }, [courses])
    
    
    return (
        <main className='w-full min-h-screen flex flex-col'>
            <Header user={user} />

            {
                courses.length > 0 ?
                    <>
                        <GradeInfo />
                        <Catalogue />
                    </>
                    
                :
                    <div className='flex m-auto flex-col items-center justify-center'>
                        <Text.Body className='phone:w-[calc(100%-2rem)] text-center'>It looks like you haven&apos;t synced with the registrar! </Text.Body>
                    </div>
            }
            <Text.Body className='phone:w-[calc(100%-2rem)] text-center !text-[14px] opacity-[0.5] mt-auto mx-auto mb-4'>If you encounter an error or want to suggest something - write to <Link target='_blank' href={'https://t.me/dastan_tynyshtyk'} className='text-vista'>@dastan_tynyshtyk</Link> 😊 </Text.Body>
        </main>
    );
};

export default DashboardPage;