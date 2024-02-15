
'use server';
import { getServerSession } from 'next-auth';
import { z } from 'zod';

import { createAction } from '@/utils/action';
import { authOptions, database } from '@/entities';

export const updateName = createAction({
    schema: z.object({
        assignmentId: z.string(), 
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
    action: async ({ assignmentId, name }, { session }) => {
        
        await database.assignment.update({
            where: {
                id: assignmentId, 
            },
            data: {
                name: name 
            }
        });
    },
});
