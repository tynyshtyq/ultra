import { authOptions, database } from '@/entities';
import { DashboardPage, SyncPage } from '@/page';
import { ROUTES } from '@/shared/constants';
import { getParam } from '@/shared/modal';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { ParsedUrlQuery } from 'querystring';
import React, { FC } from 'react';
import { Metadata } from 'next';
import { CourseType } from '@/entities/courses';

interface PageProps {
    searchParams: ParsedUrlQuery;
}

const Dashboard: FC<PageProps> = async ({searchParams}) => {

    const isRefetch = getParam(searchParams.refetch) === '1';

    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
        return redirect(ROUTES.AUTH.get({
            query: {
                callbackUrl: ROUTES.DASHBOARD.get(),
            },
        }));
    }

    if (!isRefetch) {
        const user = await database.user.findUnique({
            where: { id: session.user.id },
            select: { id: true, name: true, email: true }
        });

        const courses = (await database.course.findMany({
            where: {
                userId: session.user.id,
            },
            include: {
                assignments: true,
              },
            
        })) as unknown as CourseType[];

    
        if (user && courses) {
            return (
                <DashboardPage courses={courses} user={user} />
            );
        }
    }


    return <SyncPage />

    
};

export const metadata: Metadata = {
    title: "Dashboard",
    description: "Track your academic performance",
    authors: [
      {
        name: 'Dastan Tynyshtyk',
        url: 'https://tynyshtyq.blog',
      },
    ]
};

export default Dashboard;