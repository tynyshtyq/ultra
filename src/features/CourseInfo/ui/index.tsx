
import { Loader, SVG, Text } from '@/shared/ui-library';
import React, { FC, useState } from 'react';
import getGrade from '../modal';
import { useCourses } from '@/contexts';

interface Props {
    error: string | null;
}

const CourseInfo: FC<Props> = ({error}) => {

    const { selectedCourse } = useCourses();

    const [closed, setClosed] = useState(false);

    if (!selectedCourse) return <Loader />

    return (
        <div className='flex w-full flex-col items-start gap-3 pt-6 pb-3 relative'>
            { 
                !closed && 
                    <div className='flex items-center phone:hidden justify-center gap-2 absolute top-0 left-[0] w-full opacity-[.5] '>
                        <Text.Body className='!text-[14px] w-max text-center phone:mt-[-4px] phone:!text-[11px]'>Please try to enter all the assignments with the correct weight to get an accurate calculation</Text.Body> 
                        <SVG.Cross className='w-3 h-3 cursor-pointer' onClick={() => setClosed(true)}/>
                    </div>
            }
            <Text.Heading type="s" className='font-semibold'>Grade information:</Text.Heading>
            <div className='flex items-center gap-2'>
                <Text.Body>Percent: {(selectedCourse.percent).toFixed(1)}%</Text.Body>
                {selectedCourse.percent > 100 && <Text.Body className='text-[#FF6978]'>{error ? error : 'Please check your input data!'}</Text.Body>}
            </div>
            
            <Text.Body>Grade: &apos;{getGrade(selectedCourse.percent)}&apos;</Text.Body>
        </div>
    );
};

export default CourseInfo;