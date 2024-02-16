'use server';
import { getServerSession } from 'next-auth';
import { z } from 'zod';

import { createAction } from '@/utils/action';
import { authOptions, database } from '@/entities';

const assignmentUpdateSchema = z.object({
    id: z.string().optional(),
    name: z.string(),
    points: z.string(),
    totalPoints: z.string(),
    weight: z.string(),
  });

export const update = createAction({
    schema: z.object({
        courseId: z.string(), 
        updates: z.object({
            percent: z.number().optional(),
            assignments: z.array(assignmentUpdateSchema).optional(),
        }).nonstrict(),
    }),

    ctx: async () => {
        const session = await getServerSession(authOptions);

        if (!session) {
            throw new Error('Not authenticated');
        }

        return { session };
    },
    action: async ({ courseId, updates }, { session }) => {

        const updatedCourse = await database.course.update({
            where: { id: courseId },
            data: {
                ...updates.percent !== undefined && { percent: updates.percent },
                ...updates.assignments !== undefined && {
                    assignments: {
                        updateMany: updates.assignments.map((assignment) => {
                            const {id, ...data} = assignment;
                            return ({
                                where: { id: id },
                                data: { ...data },
                            })
                        }),
                    },
                },
            },
        });

        return updatedCourse;
    },

});
