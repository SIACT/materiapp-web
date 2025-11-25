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
    GET_COURSES_IN_CURRICULUM: (curriculumId: string | number) =>
      `/courses-in-curriculum?curriculumId=${curriculumId}`,
  },

  RECOMENDATIONS: {
    GENERATE: (id: string | number) =>
      `/recomendations/generate-recomendation/${id}`,
  },

  STUDENT_COURSES: {
    CREATE: '/student-courses',
    GET_ALL: '/student-courses',
    GET_BY_STUDENT: (studentCurriculumId: string | number) =>
      `/student-courses/student-curriculum/${studentCurriculumId}`,
    GET_ONE: (
      studentCurriculumId: string | number,
      courseInCurriculumId: string | number
    ) => `/student-courses/${studentCurriculumId}/${courseInCurriculumId}`,
    UPDATE: (
      studentCurriculumId: string | number,
      courseInCurriculumId: string | number
    ) => `/student-courses/${studentCurriculumId}/${courseInCurriculumId}`,
    DELETE: (
      studentCurriculumId: string | number,
      courseInCurriculumId: string | number
    ) => `/student-courses/${studentCurriculumId}/${courseInCurriculumId}`,
  },

  STUDENT_CURRICULA: {
    GET_ALL: '/student-curricula',
    GET_ONE: (id: string | number) => `/student-curricula/${id}`,
  },

  COURSES_IN_CURRICULUM: {
    GET_ALL: '/courses-in-curriculum',
    GET_ONE: (id: string | number) => `/courses-in-curriculum/${id}`,
    CREATE: '/courses-in-curriculum',
    UPDATE: (id: string | number) => `/courses-in-curriculum/${id}`,
    DELETE: (id: string | number) => `/courses-in-curriculum/${id}`,
  },
    PROGRAMS: {
    GET_ALL: '/programs',
    GET_ONE: (id: number | string) => `/programs/${id}`,
    GET_BY_SCHOOL: (schoolId: number | string) => `/programs/school/${schoolId}`,
    CREATE: '/programs',
    UPDATE: (id: number | string) => `/programs/${id}`,
    DELETE: (id: number | string) => `/programs/${id}`,
  },
    SCHOOLS: {
    GET_ALL: '/schools',
    GET_ONE: (id: string | number) => `/schools/${id}`,
    CREATE: '/schools',
    UPDATE: (id: string | number) => `/schools/${id}`,
    DELETE: (id: string | number) => `/schools/${id}`,
  },
    CURRICULA: {
    GET_ALL: '/curricula',
    GET_ONE: (id: string | number) => `/curricula/${id}`,
    CREATE: '/curricula',
    UPDATE: (id: string | number) => `/curricula/${id}`,
    DELETE: (id: string | number) => `/curricula/${id}`,
  },
   CAMPUSES: {
    GET_ALL: '/campuses',
    GET_ONE: (id: string | number) => `/campuses/${id}`,
    CREATE: '/campuses',
    UPDATE: (id: string | number) => `/campuses/${id}`,
    DELETE: (id: string | number) => `/campuses/${id}`,
  },
};
