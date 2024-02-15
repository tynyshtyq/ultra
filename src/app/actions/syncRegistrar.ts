'use server';
import { getServerSession } from 'next-auth';
import { z } from 'zod';


import { createAction } from '@/utils/action';
import { authOptions, database } from '@/entities';
import { Registrar } from '@/entities/courses/modal';
import { CourseType } from '@/entities/courses';

export const syncRegistrar = createAction({
    schema: z.object({
        password: z.string(),
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
    action: async ({ password }, { session }) => {
        
        const username = session.user.email!.split('@')[0]!;
        

        if (!username) throw new Error('No username found');

        const registrar = new Registrar();

        const courses = (await registrar.sync(username, password)).courses.data;
        
        [...Object.keys(courses)].forEach(async (courseName: string) => {
            const course = courses[courseName];

            const existingCourse = await database.course.findFirst({
                where: {
                  AND: [{ userId: session.user.id }, { abbr: course.abbr }],
                },
            });

            if (!existingCourse) {
                await database.course.create({
                    data: {
                        userId: session.user.id,
                        name: course.name,
                        abbr: course.abbr,
                        color: course.color,
                        credits: parseInt(course.credits.split(' ')[0]),
                        percent: 100,
                        assignments: {
                            create: [
                                {
                                    name: 'Quiz 1',
                                    points: '15',
                                    totalPoints: '15',
                                    weight: '10',
                                },
                                {
                                    name: 'Quiz 2',
                                    points: '15',
                                    totalPoints: '15',
                                    weight: '10',
                                },
                                {
                                    name: 'Midterm 1',
                                    points: '30',
                                    totalPoints: '30',
                                    weight: '25',
                                },
                                {
                                    name: 'Midterm 2',
                                    points: '30',
                                    totalPoints: '30',
                                    weight: '25',
                                },
                                {
                                    name: 'Final',
                                    points: '30',
                                    totalPoints: '30',
                                    weight: '30',
                                },
                            ],
                        },
                    },
                });
            }
            
        })
        

        return true;
    },
});