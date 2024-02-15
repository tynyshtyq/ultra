import { Input, Loader, SVG, Text } from '@/shared/ui-library';
import React, { FC, useContext, useEffect, useState } from 'react';
import { CourseContext } from '@/contexts';
import { CourseType } from '@/entities/courses';
import { Assignment } from '@/features';
import { createAssignment } from '@/app/actions/Assignment/createAssignment';

interface Props {
    onClose: () => void;
}

const CourseModal: FC<Props> = ({onClose}) => {

    const context = useContext(CourseContext);

    const [course, setCourse] = useState<CourseType | null>(null);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (context) {
            setCourse(context.selectedCourse)
        }
    }, [context])
    

    if (!course) return <Loader />

    const handleNewAssignment = async () => {
        setLoading(true);
        if (course.id) setCourse(await createAssignment({courseId: course?.id}))
        setLoading(false);
    }

    return (
        <div className='w-[90vw] h-[90vh] relative bg-[white] flex flex-col gap-4 rounded-m p-6 z-[30]'>

            {
                loading &&  <div className='flex absolute w-full h-full top-0 left-0 bg-[rgba(0,0,0,0.1)] z-[50] items-center justify-center'>
                                <Loader className='!text-[2rem]' />
                            </div>
            }

            <div className='w-full flex items-center justify-between'>
                <Text.Heading type='m'>{course.name}</Text.Heading>
                <SVG.Cross onClick={onClose} className='text-[black] w-6 h-6 cursor-pointer'  />
            </div>

            <div className='flex w-full h-full overflow-scroll'>
                <div className='flex flex-col gap-4 items-center'>
                    {
                        course.assignments?.map((assignment, id) => {
                            return  <Assignment assignment={assignment} key={id} />
                        })
                    }
                    <button style={{fontWeight: '700'}} className='w-full !text-[36px] cursor-pointer hover:bg-main hover:opacity-[.6] rounded-m' onClick={handleNewAssignment}>+</button>
                </div>


                
            </div>
            
            
        </div>
    );
};

export default CourseModal;