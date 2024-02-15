'use client'

import React, { useState, ReactNode } from 'react';
import { CourseContext, CourseContextType } from '@/contexts';
import { CourseType } from '@/entities/courses';
import { AssignmentType } from '@/entities/assignment';

interface CourseProviderProps {
  children: ReactNode;
}

const Init: CourseType[] = []

export const CourseProvider: React.FC<CourseProviderProps> = ({ children }) => {
  const [courses, setCourses] = useState<CourseContextType['courses']>(Init);
  const [selectedCourse, selectCourse] = useState<CourseContextType['selectedCourse']>(null);

  const updateAssignmentOptimistically = (courseId: string, assignmentId: string, newName: string) => {
    setCourses((currentCourses) => currentCourses && currentCourses.map(course => {
      if (course.id === courseId) {
        return {
          ...course,
          assignments: course.assignments && course.assignments.map(assignment => {
            if (assignment.id === assignmentId) {
              return { ...assignment, name: newName };
            }
            return assignment;
          }),
        };
      }
      return course;
    }));
  };
  

  return (
    <CourseContext.Provider value={{ courses, setCourses, selectedCourse, selectCourse, updateAssignmentOptimistically }}>
      {children}
    </CourseContext.Provider>
  );
};