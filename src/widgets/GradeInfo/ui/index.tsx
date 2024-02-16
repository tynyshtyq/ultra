'use client'

import { useCourses } from '@/contexts';
import { CourseType } from '@/entities/courses';
import getGrade from '@/features/CourseInfo/modal';
import getGradePoints from '@/features/CourseInfo/modal/getGradePoints';
import { Text } from '@/shared/ui-library';
import React, { useEffect, useState } from 'react';

const GradeInfo = () => {

    const { courses, error, setError } = useCourses();
    const [percent, setPercent] = useState(100);
    const [gradePoints, setGradePoints] = useState(4)

    useEffect(() => {
        let totalPercent = 0;
        let totalGradePoints = 0;

        courses.forEach((course: CourseType) => {
            totalPercent += course.percent;
            totalGradePoints += getGradePoints(course.percent) * course.credits;
        })

        if (totalPercent / courses.length > 100) setError("Please check your input data");
        else setError(null)
        setGradePoints(totalGradePoints / courses.reduce((acc, course) => acc + course.credits, 0))
        setPercent(totalPercent / courses.length)
    }, [courses])

    return (
        <div className='pt-4 flex flex-col w-full gap-4 pl-4'>
            <Text.Heading type="m">Grade information</Text.Heading>
            <div className='flex items-center gap-4'>
                <Text.Body>Grade: &#34;{gradePoints.toFixed(2)}&#34;</Text.Body>
                {error && <Text.Body className='text-[#FF6978]'>Please check your input data!</Text.Body>}
            </div>
            
            <Text.Body>Letter: &#34;{getGrade(percent)}&#34;</Text.Body>
        </div>
    );
};

export default GradeInfo;