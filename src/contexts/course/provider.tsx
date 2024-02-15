'use client'

import React, { useState, ReactNode } from 'react';
import { CourseContext, CourseContextType } from '@/contexts';
import { CourseType } from '@/entities/courses';
import { AssignmentType } from '@/entities/assignment';
import { AssignmentUpdate } from '@/entities/assignment/types';

interface CourseProviderProps {
  children: ReactNode;
}


const Init: CourseType[] = []

export const CourseProvider: React.FC<CourseProviderProps> = ({ children }) => {
  const [courses, setCourses] = useState<CourseContextType['courses']>(Init);
  const [selectedCourse, selectCourse] = useState<CourseContextType['selectedCourse']>(null);

  const updateAssignmentOptimistically = (courseId: string, assignmentId: string, updates: AssignmentUpdate) => {
    
    if (courses) {
      const updatedCourses = courses.map(course => {
        if (course.id === courseId) {
          selectCourse({...course,
            assignments: course.assignments.map(assignment => {
              if (assignment.id === assignmentId) {
                return { ...assignment, ...updates };
              }
              return assignment;
          })})

          return {
            ...course,
            assignments: course.assignments.map(assignment => {
              if (assignment.id === assignmentId) {
                return { ...assignment, ...updates };
              }
              return assignment;
            }),
          };
        }
        return course;
      });
      setCourses(updatedCourses);
    }
  };

  const updateCourse = (courseId: string, updates: CourseType) => {
    if (courses) {
      const updatedCourses = courses.map(course => {
        if (course.id === courseId) {
          return {
            ...updates
          };
        }
        return course;
      });
      setCourses(updatedCourses);
    }
  }
  
  

  return (
    <CourseContext.Provider value={{ courses, setCourses, selectedCourse, selectCourse, updateAssignmentOptimistically, updateCourse }}>
      {children}
    </CourseContext.Provider>
  );
};