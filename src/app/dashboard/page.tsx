import { authOptions, database } from '@/entities';
import { DashboardPage, SyncPage } from '@/page';
import { ROUTES } from '@/shared/constants';
import { getParam } from '@/shared/modal';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { ParsedUrlQuery } from 'querystring';
import React, { FC } from 'react';

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
            select: { name: true, email: true }
        });
    
        if (user) {
            return (
                <DashboardPage user={user} />
            );
        }
    }

    

    return <SyncPage />

    
};

export default Dashboard;