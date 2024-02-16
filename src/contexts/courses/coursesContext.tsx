'use client'

import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { CourseType } from '@/entities/courses';
import { AssignmentType, AssignmentUpdate } from '@/entities/assignment/types';

type CoursesState = {
  courses: CourseType[];
  status: boolean;
  error: string | null;
  setError: (error: string | null) => void;
  saved: (status: boolean) => void;
  selectedCourse: CourseType | null;
  selectCourse: (course: CourseType) => void;
  setCourses: (courses: CourseType[]) => void;
  updateAssignment: (courseId: string, assignmentId: string, updates: AssignmentUpdate) => void;
  updateCourse: (courseId: string, updates: CourseType) => void;
};


// Initial state
const initialState: CoursesState = {
  courses: [],
  status: true,
  error: null,
  setError: () => {},
  saved: () => {},
  setCourses: () => {},
  selectedCourse: null,
  selectCourse: () => {},
  updateAssignment: () => {},
  updateCourse: () => {}
};

// Create the UserContext
const CoursesContext = createContext<CoursesState>(initialState);

// User reducer function
const userReducer = (state: CoursesState, action: any) => {
  switch (action.type) {
    case 'SET':
      return {
        ...state,
        courses: action.payload,
    };

    case 'SAVED':
      return {
        ...state,
        status: action.payload,
    };

    case 'ERROR_OCCURED':
      return {
        ...state,
        error: action.payload,
    };

    case 'SELECT':
      return {
        ...state,
        selectedCourse: action.payload,
    };

    default:
      return state;
  }
};

// UserProvider component
export const CoursesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);
  
  const saved = (status: boolean) => {
    dispatch({type: "SAVED", payload: status})
  }

  const setError = (error: string | null) => {
    dispatch({type: "ERROR_OCCURED", payload: error})
  }

  const setCourses = (courses: CourseType[]) => {
    if (state.selectedCourse) {
      const updatedCourse = courses.find((course) => state.selectedCourse.id === course.id);
      dispatch({type: "SELECT", payload: updatedCourse})
    }
    dispatch({ type: 'SET', payload: courses });
  };

  const selectCourse = (course: CourseType) => {
    dispatch({ type: 'SELECT', payload: course });
  };

  const calculatePercent = (assignments: AssignmentType[]) => {
    let percent = 0;
    if (assignments) {
      assignments.forEach((assignment) => {
        const add = (parseFloat(assignment.points) / parseFloat(assignment.totalPoints) || 1) * parseFloat(assignment.weight);
        
        percent += add;
      })
      
      let totalWeight = assignments.reduce((acc, assignment) => acc + parseFloat(assignment.weight), 0);
      const remainingWeight = Math.max(0, 100 - totalWeight);
      if (remainingWeight > 0) {
          percent += remainingWeight
      }

    }

    if (percent > 100) setError("Please check your input data");
    else setError(null)
    return percent;
  }

  const updateAssignment = (courseId: string, assignmentId: string, updates: AssignmentUpdate) => {

    const updatedCourses = state.courses.map((course: CourseType) => {
      if (course.id === courseId) {
        const updatedAssignments = course.assignments.map((assignment: AssignmentType) => {
          if (assignment.id === assignmentId) {
            return { ...assignment, ...updates };
          }
          return assignment;
        });
        
        let percent = calculatePercent(updatedAssignments)

        return { ...course, assignments: updatedAssignments, percent };
      }
      return course;
    });
    dispatch({ type: 'SAVED', payload: false });
    setCourses(updatedCourses);
  };

  const updateCourse = (courseId: string, updates: CourseType) => {
    const updatedCourses = state.courses.map((course: CourseType) => {
      if (course.id === courseId) {
        

        const percent = calculatePercent(updates.assignments);

        return {
          ...updates,
          percent
        };
      }
      return course;
    });
    dispatch({ type: 'SAVED', payload: false });
    setCourses(updatedCourses);
  }
  

  return (
    <CoursesContext.Provider value={{ ...state, setCourses, selectCourse, updateAssignment, updateCourse, saved, setError }}>
      {children}
    </CoursesContext.Provider>
  );
};

export default CoursesContext;