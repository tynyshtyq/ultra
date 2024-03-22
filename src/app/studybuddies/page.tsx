import { authOptions, database } from '@/entities';
import { StudybuddyType } from '@/entities/studybuddy';
import { NewStudyBuddyAccountForm, StudyBuddy } from '@/page';
import { ROUTES } from '@/shared/constants';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { redirect, useRouter } from 'next/navigation';
import React from 'react';

const Studybuddy = async () => {

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
        select: { id: true, name: true, email: true }
    });

    if (user && session.user.id) {
        const myAccount = (await database.studybuddy.findUnique({
            where: { userId: session.user.id }
        })) as StudybuddyType;

        if (user && myAccount) {
            return (
                <StudyBuddy user={user} myAccount={myAccount} />
            );
        }

        return <NewStudyBuddyAccountForm />
    }
    else {

        return redirect(ROUTES.DASHBOARD.get({
            query: {
                refetch: 1
            }
        }));
    }
    

    
};

export const metadata: Metadata = {
    title: "Study buddies",
    description: "Track your academic performance",
    authors: [
      {
        name: 'Dastan Rinatuly',
        url: 'https://tynyshtyq.blog',
      },
    ]
};

export default Studybuddy;