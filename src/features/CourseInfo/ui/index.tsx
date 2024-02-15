import { CourseContext } from '@/contexts';
import { CourseType } from '@/entities/courses';
import { Text } from '@/shared/ui-library';
import React, { useContext, useEffect, useState } from 'react';
import getGrade from '../modal';

const CourseInfo = () => {

    const [course, setCourse] = useState<CourseType | null>(null);

    const [grade, setGrade] = useState<string>('A');
    const [percent, setPercent] = useState(0);
    

    const context = useContext(CourseContext);

    useEffect(() => {
        if (context) {
            setCourse(() => context?.selectedCourse);

            const selectedCourse: CourseType | null = context.selectedCourse;

            if (selectedCourse && selectedCourse.assignments)  {
                
                let percent = 0;
                selectedCourse.assignments.forEach((assignment) => {
                    const add = (parseFloat(assignment.points) / parseFloat(assignment.totalPoints)) * parseFloat(assignment.weight);
                    percent += add;
                })
                
                let totalWeight = selectedCourse.assignments.reduce((acc, assignment) => acc + parseFloat(assignment.weight), 0);
                const remainingWeight = Math.max(0, 100 - totalWeight);
                if (remainingWeight > 0) {
                    percent += remainingWeight
                }
                setPercent(percent)
                setGrade(getGrade(percent))
            }
        }
    }, [context])


    return (
        <div className='flex w-full flex-col items-start gap-3 pt-6 pb-3'>
            <Text.Heading type="s" className='font-semibold'>Grade information:</Text.Heading>
            <div className='flex items-center gap-2'>
                <Text.Body>Percent: <span style={(percent > 100 || percent < 0) ? {color: 'red'} : {}}>{percent.toFixed(2)}%</span></Text.Body>
                {(percent > 100 || percent < 0) && <Text.Body className='text-[red]'>Please check your input data!</Text.Body>}
            </div>
            
            <Text.Body>Grade: "{grade}"</Text.Body>
        </div>
    );
};

export default CourseInfo;