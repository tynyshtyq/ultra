
'use server';
import { getServerSession } from 'next-auth';
import { z } from 'zod';

import { createAction } from '@/utils/action';
import { authOptions, database } from '@/entities';
import { StudybodyType } from '@/entities/studybody';

export const getBodies = createAction({
    schema: z.null(),
    ctx: async () => {

        const session = await getServerSession(authOptions);


        if (!session) {
            throw new Error('Not authenticated');
        }


        return {
            session,
        };
    },
    action: async (_, { session }) => {
        
        const bodies = (await database.studybody.findMany({
            where: {
                status: true
            }
        })) as StudybodyType[];

        return bodies;
    },
});
