import { useContext } from 'react';
import CoursesContext from './coursesContext';

const useCourses = () => {
  const context = useContext(CoursesContext);

  if (!context) {
    throw new Error('useCourses must be used within a UserProvider');
  }

  return context;
};

export default useCourses;