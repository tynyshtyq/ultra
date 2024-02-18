
'use server';
import { getServerSession } from 'next-auth';
import { z } from 'zod';

import { createAction } from '@/utils/action';
import { authOptions, database } from '@/entities';
import { StudybuddyType } from '@/entities/studybuddy';

export const getBuddies = createAction({
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
        
        const bodies = (await database.studybuddy.findMany({
            where: {
                status: true
            }
        })) as StudybuddyType[];

        return bodies;
    },
});
