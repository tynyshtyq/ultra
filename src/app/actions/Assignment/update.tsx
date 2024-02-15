'use server';
import { getServerSession } from 'next-auth';
import { z } from 'zod';

import { createAction } from '@/utils/action';
import { authOptions, database } from '@/entities';

export const update = createAction({
    schema: z.object({
        assignmentId: z.string(), 
        updates: z.object({
            name: z.string().optional().nullable(),
            points: z.string().optional().nullable(),
            totalPoints: z.string().optional().nullable(),
            weight: z.string().optional().nullable(),
        }).nonstrict(),
    }),
    ctx: async () => {
        const session = await getServerSession(authOptions);

        if (!session) {
            throw new Error('Not authenticated');
        }

        return { session };
    },
    action: async ({ assignmentId, updates }, { session }) => {

        const updatesToApply = Object.keys(updates).reduce((acc, key) => {
            // @ts-ignore
            acc[key] = updates[key];
            return acc;
        }, {});

        const updatedAssignment = await database.assignment.update({
            where: { id: assignmentId },
            data: updatesToApply,
        });

        return updatedAssignment;
    },
});
