'use client'

import React, { HTMLProps, forwardRef, useImperativeHandle, useState } from 'react';
import { ModalRef } from '../lib/config';
import { ModalContext } from '../lib/context';
import { CourseModal } from '@/features';
import { useCourses } from '@/contexts';
import { update } from '@/app/actions/Courses/update';

interface Props extends HTMLProps<HTMLDivElement> {
    
}

const Modal = forwardRef<ModalRef, Props>(({...props}, ref) => {

    const { selectedCourse, status, saved } = useCourses();
    useImperativeHandle(ref, () => ({
        open,
        close,
        isOpen,
      }));
    
    const [isOpen, setIsOpen] = useState(false);

    const open = () => setIsOpen(true);
    const close = () => {
        if (!status && selectedCourse && selectedCourse.id && selectedCourse.assignments) {
            update({courseId: selectedCourse.id, updates: {percent: selectedCourse.percent, assignments: selectedCourse.assignments}})
            .then(() => {
                saved(true)
            })
        }
        setIsOpen(false);
    };

    const overlayClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
        e.target === e.currentTarget && close();

    return (
        <ModalContext.Provider value={{open, isOpen, close}}>
            {
                isOpen &&
                <div 
                    className={`fixed w-full h-full top-0 left-0 items-center justify-center flex z-[50]`} 
                    style={{backgroundColor: 'rgba(0, 0, 0, .5)'}} 
                    onClick={overlayClick}
                    {...props}
                >
                    <CourseModal onClose={close}/>
                </div>
            }
            
        </ModalContext.Provider>
    );
});

Modal.displayName = "Modal"

export default Modal;