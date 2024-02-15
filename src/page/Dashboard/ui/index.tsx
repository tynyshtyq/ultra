'use client'

import { CourseContext } from '@/contexts';
import { CourseType } from '@/entities/courses';
import { UserType } from '@/entities/user';
import { Header } from '@/features';
import { Button, Loader, SVG, Text } from '@/shared/ui-library';
import { Catalogue } from '@/widgets';
import { useSession } from 'next-auth/react';
import React, { FC, useContext, useEffect, useState } from 'react';

interface Props {
    user: UserType;
    courses: CourseType[];
}

const DashboardPage: FC<Props> = ({user, courses}) => {

    const context = useContext(CourseContext);
    
    
    useEffect(() => {
        if (context) {
            context.setCourses(courses)
        }
    }, [context])
    
    
    return (
        <main className='w-full min-h-screen flex flex-col'>
            <Header user={user} />
            <Catalogue />
        </main>
    );
};

export default DashboardPage;