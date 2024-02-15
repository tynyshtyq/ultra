
'use server';
import { getServerSession } from 'next-auth';
import { z } from 'zod';

import { createAction } from '@/utils/action';
import { authOptions, database } from '@/entities';

export const createAssignment = createAction({
    schema: z.object({
        courseId: z.string()
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
    action: async ({ courseId }, { session }) => {
        
        const newCourse = await database.course.update({
            where: {
                id: courseId, 
            },
            data: {
                assignments: {
                    create: {
                        name: 'New Assignment',
                        points: 15,
                        totalPoints: 15,
                        weight: 0
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
