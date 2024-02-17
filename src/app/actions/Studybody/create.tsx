
'use server';
import { getServerSession } from 'next-auth';
import { z } from 'zod';

import { createAction } from '@/utils/action';
import { authOptions, database } from '@/entities';

export const createBodyAccount = createAction({
    schema: z.object({
        telegram: z.string(),
        name: z.string()
    }),
    ctx: async () => {

        const session = await getServerSession(authOptions);


        if (!session) {
            throw new Error('Not authenticated');
        }


        return {
            session,
        };
    },
    action: async ({ telegram, name }, { session }) => {
        
        const newAccount = await database.studybody.create({
            data: {
                name: name,
                telegram: telegram,
                status: false,
                userId: session.user.id
            }
        });

        return newAccount;
    },
});
