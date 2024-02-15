'use client'

import { CourseContext } from '@/contexts';
import { CourseType } from '@/entities/courses';
import { UserType } from '@/entities/user';
import { Header } from '@/features';
import { ROUTES } from '@/shared/constants';
import { Button, Loader, SVG, Text } from '@/shared/ui-library';
import { Catalogue } from '@/widgets';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { FC, useContext, useEffect, useState } from 'react';

interface Props {
    user: UserType;
    courses: CourseType[];
}

const DashboardPage: FC<Props> = ({user, courses}) => {

    const context = useContext(CourseContext);
    
    
    useEffect(() => {
        if (context) {
            context.setCourses(courses);
        }
    }, [])
    
    
    return (
        <main className='w-full min-h-screen flex flex-col'>
            <Header user={user} />

            {
                courses.length > 0 ?
                    <Catalogue />
                :
                    <div className='flex m-auto flex-col items-center justify-center'>
                        <Text.Body>It looks like you haven't synced with the registrar. <Link className='text-vista underline' href={ROUTES.DASHBOARD.get({query: {refetch: 1}})}>Please synchronize with the registrar</Link>!</Text.Body>
                    </div>
            }
            
        </main>
    );
};

export default DashboardPage;