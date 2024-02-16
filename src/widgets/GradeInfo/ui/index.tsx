'use client'

import { useCourses } from '@/contexts';
import { CourseType } from '@/entities/courses';
import getGrade from '@/features/CourseInfo/modal';
import { Text } from '@/shared/ui-library';
import React, { useEffect, useState } from 'react';

const GradeInfo = () => {

    const { courses, error, setError } = useCourses();
    const [percent, setPercent] = useState(100);

    useEffect(() => {
        let totalPercent = 0;

        courses.forEach((course: CourseType) => {
            totalPercent += course.percent;
        })

        if (totalPercent / courses.length > 100) setError("Please check your input data");
        

        setPercent(totalPercent / courses.length)
    }, [courses])

    return (
        <div className='pt-4 flex flex-col w-full gap-4 pl-4'>
            <Text.Heading type="m">Grade information</Text.Heading>
            <div className='flex items-center gap-4'>
                <Text.Body>Percent: {percent.toFixed(1)}%</Text.Body>
                {error && <Text.Body className='text-[#FF6978]'>Please check your input data!</Text.Body>}
            </div>
            
            <Text.Body>Grade: &#34;{getGrade(percent)}&#34;</Text.Body>
        </div>
    );
};

export default GradeInfo;