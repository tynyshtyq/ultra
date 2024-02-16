import { Input, Loader, SVG, Text } from '@/shared/ui-library';
import React, { FC, useContext, useEffect, useState } from 'react';
import { useCourses } from '@/contexts';
import { CourseType } from '@/entities/courses';
import { Assignment, CourseInfo } from '@/features';
import { createAssignment } from '@/app/actions/Assignment/createAssignment';
import { removeAssignment } from '@/app/actions/Assignment/removeAssignment';

interface Props {
    onClose: () => void;
}

const CourseModal: FC<Props> = ({onClose}) => {

    const { selectedCourse, updateCourse } = useCourses();

    const [loading, setLoading] = useState(false);
    

    if (!selectedCourse) return <Loader />

    const handleNewAssignment = async () => {
        setLoading(true);
        if (selectedCourse.id) {
            const updatedCourse = (await createAssignment({courseId: selectedCourse?.id})) as CourseType;
            if (updatedCourse.id) updateCourse(updatedCourse.id, {...updatedCourse}) 
        }
        setLoading(false);
    }

    const handleAssignmentRemove = async (assignmentId: string) => {
        setLoading(true);
        if (selectedCourse.id) {
            const updatedCourse = (await removeAssignment({courseId: selectedCourse?.id, assignmentId})) as CourseType;
            if (updatedCourse.id) updateCourse(updatedCourse.id, {...updatedCourse}) 
        }

        setLoading(false)
    }

    const getWeight = () => {
        return selectedCourse.assignments.reduce((acc, assignment) => acc + parseFloat(assignment.weight), 0)
    }

    return (
        <div className='w-[90dvw] h-[95dvh] relative bg-[white] flex flex-col gap-4 rounded-m p-6 z-[30]'>

            {
                loading &&  <div className='flex absolute w-full h-full top-0 left-0 bg-[rgba(0,0,0,0.1)] z-[50] items-center justify-center'>
                                <Loader className='!text-[2rem]' />
                            </div>
            }

            <div className='w-full flex items-center pb-4 justify-between border-b-m border-vista border-opacity-30'>
                <Text.Heading type='m'>{selectedCourse.name} <span className='phone:hidden'>• {(selectedCourse.abbr).toLowerCase()}</span></Text.Heading>
                <SVG.Cross onClick={onClose} className='text-[black] w-6 h-6 cursor-pointer' />
            </div>

            <CourseInfo error={getWeight() !== 100 ? 'Please check weight distribution' : null} />
                
            <div className='flex w-full h-full overflow-scroll flex-col'>
                <div className='flex w-full phone:w-max gap-2 pb-4 mb-2 border-b-m border-vista border-opacity-10'>
                    <Text.Body className='w-full phone:w-[90px] text-center'>Name</Text.Body>
                    <Text.Body className='w-full phone:w-[90px] text-center'>Points</Text.Body>
                    <Text.Body className='w-full phone:w-[90px] text-center'>Total points</Text.Body>
                    <Text.Body className='w-full phone:w-[90px] text-center' style={getWeight() !== 100 ? {color: '#FF6978'} : {}}>Weight ({getWeight()}%)</Text.Body>
                    <Text.Body className='w-max text-center px-3'></Text.Body>
                </div>
                <div className='flex flex-col gap-4 items-center phone:w-max'>
                    {
                        selectedCourse.assignments?.map((assignment, id) => {
                            return  <Assignment onRemove={handleAssignmentRemove} assignment={assignment} key={id} />
                        })
                    }                    
                </div>
            </div>
            <button style={{fontWeight: '700'}} className='w-full !text-[36px] cursor-pointer text-vista hover:bg-vista duration-150 hover:bg-opacity-[0.1] rounded-m' onClick={handleNewAssignment}>+</button>
        </div>
    );
};

export default CourseModal;