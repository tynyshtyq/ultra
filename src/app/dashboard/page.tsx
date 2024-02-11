import { authOptions, database } from '@/entities';
import { DashboardPage } from '@/page';
import { ROUTES } from '@/shared/constants';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react';

const Dashboard = async () => {

    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
        return redirect(ROUTES.AUTH.get({
            query: {
                callbackUrl: ROUTES.DASHBOARD.get(),
            },
        }));
    }

    const user = await database.user.findUnique({
        where: { id: session.user.id },
        select: { name: true, email: true }
    });

    if (user) {
        return (
            <DashboardPage user={user} />
        );
    }

    // return <Sync />

    
};

export default Dashboard;