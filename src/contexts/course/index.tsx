'use client'

import { AssignmentType } from '@/entities/assignment';
import { AssignmentUpdate } from '@/entities/assignment/types';
import { CourseType } from '@/entities/courses';
import { createContext, Dispatch, SetStateAction } from 'react';

export interface CourseContextType {
  courses: CourseType[] | null;
  setCourses: Dispatch<SetStateAction<CourseType[] | null>>;
  selectedCourse: CourseType | null;
  selectCourse: Dispatch<SetStateAction<CourseType | null>>;
  updateAssignmentOptimistically: (courseId: string, assignmentId: string, updates: AssignmentUpdate) => void;
  updateCourse: (courseId: string, updates: CourseType) => void;
}

const CourseContext = createContext<CourseContextType | null>(null);
export default CourseContext;