'use client'

import CourseContext from './course';
import { CourseContextType } from './course/index';
import { CourseProvider } from './course/provider';
import UserContext from './user';
import { UserContextType } from './user';
import { UserProvider } from './user/provider';

export {
    CourseContext,
    CourseProvider,
    UserContext,
    UserProvider,
}

export type {
    CourseContextType,
    UserContextType
}