'use server';
import { getServerSession } from 'next-auth';
import { z } from 'zod';

import { createAction } from '@/utils/action';
import { authOptions, database } from '@/entities';

export const update = createAction({
    schema: z.object({
        bodyId: z.string(), 
        updates: z.object({
            telegram: z.string().optional(),
            status: z.boolean().optional(),
            regcourses: z.any().optional(),
        }).nonstrict(),
    }),

    ctx: async () => {
        const session = await getServerSession(authOptions);

        if (!session) {
            throw new Error('Not authenticated');
        }

        return { session };
    },
    action: async ({ bodyId, updates }, { session }) => {
        

        const updatedBody = await database.studybody.update({
            where: { id: bodyId },
            data: {
                ...updates.telegram !== undefined && { telegram: updates.telegram },
                ...updates.status !== undefined && { status: updates.status },
                ...updates.regcourses !== undefined && {
                    regcourses: JSON.stringify(updates.regcourses),
                },
            },
        });
        

        return updatedBody;
    },

});
