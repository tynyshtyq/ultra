'use client'

import { CourseContext } from '@/contexts';
import { CourseType } from '@/entities/courses';
import { CourseCard, Modal } from '@/features';
import { ModalRef } from '@/features/Modal/lib/config';
import { LoadingPage } from '@/page';
import { Text } from '@/shared/ui-library';
import React, { useContext, useEffect, useRef, useState } from 'react';

const Catalogue = () => {

    const context = useContext(CourseContext);

    const [courses, setCourses] = useState<CourseType[] | null>();

    const modalRef = useRef<ModalRef>(null);

    useEffect(() => {
        if (context) setCourses(context.courses);
    }, [context])

    const handleCourseClick = React.useCallback((course: CourseType) => {
        context?.selectCourse(course)
        modalRef.current?.open();
    }, [])  

    if (!courses) return <LoadingPage />;
    return (
        <>
            <div className='flex w-full h-full flex-col py-8 px-4 gap-8'>
                <Text.Heading type="m">Courses</Text.Heading>
                <div className='flex flex-wrap w-full gap-8 justify-between phone:justify-center'>
                    {
                        courses.map((course, id) => {
                            return  <CourseCard onClick={() => handleCourseClick(course)} data={course} key={id} />
                        })
                    }
                </div>
                
            </div>

            <Modal ref={modalRef} />
        </>
    );
};

export default Catalogue;