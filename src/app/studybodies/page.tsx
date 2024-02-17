import { authOptions, database } from '@/entities';
import { StudybodyType } from '@/entities/studybody';
import { NewStudyBodyAccountForm, StudyBody } from '@/page';
import { ROUTES } from '@/shared/constants';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { redirect, useRouter } from 'next/navigation';
import React from 'react';

const Studybody = async () => {

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
        const myAccount = (await database.studybody.findUnique({
            where: { userId: session.user.id }
        })) as StudybodyType;

        if (user && myAccount) {
            return (
                <StudyBody user={user} myAccount={myAccount} />
            );
        }

        return <NewStudyBodyAccountForm />
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
    title: "Study bodies",
    description: "Track your academic performance",
    authors: [
      {
        name: 'Dastan Tynyshtyk',
        url: 'https://tynyshtyq.blog',
      },
    ]
};

export default Studybody;