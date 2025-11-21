export const API_URLS = {
  BASE: 'http://localhost:3000/api',

  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
  },

  STUDENTS: {
    GET_ALL: '/students',
    GET_ONE: (id: string | number) => `/students/${id}`,
    CREATE: '/students',
    UPDATE: (id: string | number) => `/students/${id}`,
    DELETE: (id: string | number) => `/students/${id}`,
  },

  SEMESTER: {
    GET_COURSES_IN_CURRICULUM: (curriculumId: string | number) => `/courses-in-curriculum?curriculumId=${curriculumId}`,
  }
};
