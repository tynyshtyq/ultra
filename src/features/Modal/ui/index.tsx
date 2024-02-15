'use client'

import React, { FC, HTMLProps, forwardRef, useImperativeHandle, useState } from 'react';
import { ModalRef } from '../lib/config';
import { ModalContext } from '../lib/context';
import { CourseType } from '@/entities/courses';
import { Text } from '@/shared/ui-library';
import { CourseModal } from '@/features';

interface Props extends HTMLProps<HTMLDivElement> {
}

const Modal = forwardRef<ModalRef, Props>(({...props}, ref) => {

    useImperativeHandle(ref, () => ({
        open,
        close,
        isOpen,
      }));
    
    const [isOpen, setIsOpen] = useState(false);

    const open = () => setIsOpen(true);
    const close = () => {
        setIsOpen(false);
    };

    const overlayClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
        e.target === e.currentTarget && close();

    return (
        <ModalContext.Provider value={{open, isOpen, close}}>
            {
                isOpen &&
                <div 
                    className={`fixed w-full h-full top-0 left-0 items-center justify-center flex`} 
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