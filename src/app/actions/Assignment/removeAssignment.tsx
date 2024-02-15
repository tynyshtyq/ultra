
'use server';
import { getServerSession } from 'next-auth';
import { z } from 'zod';

import { createAction } from '@/utils/action';
import { authOptions, database } from '@/entities';

export const removeAssignment = createAction({
    schema: z.object({
        courseId: z.string(),
        assignmentId: z.string()
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
    action: async ({ courseId, assignmentId }, { session }) => {
        
        const newCourse = await database.course.update({
            where: {
                id: courseId, 
            },
            data: {
                assignments: {
                    delete: {
                        id: assignmentId
                    }
                }
            },
            include: {
                assignments: true
            }
        });

        return newCourse;
    },
});
