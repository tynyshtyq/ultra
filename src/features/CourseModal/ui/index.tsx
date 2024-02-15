import { Input, Loader, SVG, Text } from '@/shared/ui-library';
import React, { FC, useContext, useEffect, useState } from 'react';
import { CourseContext } from '@/contexts';
import { CourseType } from '@/entities/courses';
import { Assignment, CourseInfo } from '@/features';
import { createAssignment } from '@/app/actions/Assignment/createAssignment';
import { removeAssignment } from '@/app/actions/Assignment/removeAssignment';

interface Props {
    onClose: () => void;
}

const CourseModal: FC<Props> = ({onClose}) => {

    const context = useContext(CourseContext);

    const [course, setCourse] = useState<CourseType | null>(null);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (context) {
            setCourse(context.selectedCourse);
        }
    }, [context])
    

    if (!course) return <Loader />

    const handleNewAssignment = async () => {
        setLoading(true);
        if (course.id) {
            const updatedCourse = await createAssignment({courseId: course?.id});
            context?.selectCourse(updatedCourse)
            context?.updateCourse(updatedCourse.id, {...updatedCourse}) 
        }
        setLoading(false);
    }

    const handleAssignmentRemove = async (assignmentId: string) => {
        setLoading(true);
        if (assignmentId && course.id) {
            const updatedCourse = await removeAssignment({courseId: course?.id, assignmentId});
            context?.selectCourse(updatedCourse)
            context?.updateCourse(updatedCourse.id, {...updatedCourse}) 
        }

        setLoading(false)
    }

    return (
        <div className='w-[90vw] h-[95vh] relative bg-[white] flex flex-col gap-4 rounded-m p-6 z-[30]'>

            {
                loading &&  <div className='flex absolute w-full h-full top-0 left-0 bg-[rgba(0,0,0,0.1)] z-[50] items-center justify-center'>
                                <Loader className='!text-[2rem]' />
                            </div>
            }

            <div className='w-full flex items-center pb-4 justify-between border-b-m border-vista border-opacity-30'>
                <Text.Heading type='m'>{course.name} • {(course.abbr).toLowerCase()}</Text.Heading>
                <SVG.Cross onClick={onClose} className='text-[black] w-6 h-6 cursor-pointer' />
            </div>

            <CourseInfo />
            <div className='flex w-full gap-2 pb-4 mb-2 border-b-m border-vista border-opacity-10'>
                <Text.Body className='w-full text-center'>Name</Text.Body>
                <Text.Body className='w-full text-center'>Points</Text.Body>
                <Text.Body className='w-full text-center'>Total points</Text.Body>
                <Text.Body className='w-full text-center'>Weight</Text.Body>
                <Text.Body className='w-max text-center px-3'></Text.Body>
            </div>
            <div className='flex w-full h-full overflow-scroll flex-col'>
                <div className='flex flex-col gap-4 items-center'>
                    {
                        course.assignments?.map((assignment, id) => {
                            return  <Assignment onRemove={handleAssignmentRemove} assignment={assignment} key={id} />
                        })
                    }
                    <button style={{fontWeight: '700'}} className='w-full !text-[36px] cursor-pointer text-vista hover:bg-vista duration-150 hover:bg-opacity-[0.1] rounded-m' onClick={handleNewAssignment}>+</button>
                </div>


                
            </div>
            
            
        </div>
    );
};

export default CourseModal;