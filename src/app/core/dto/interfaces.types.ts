export interface Student {
  id: string;
  code: string;
  names: string;
  email: string;
  password: string;
  semester: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Curriculum {
  id: number;
  version: string;
  isActive: boolean;
  createdAt: string;
  programId: number;
}

export interface StudentCourse {
  studentCurriculumId: number;
  courseInCurriculumId: number;
  createdAt: string;
}

export interface StudentCurriculum {
  id: number;
  isActive: boolean;
  studentId: string;
  student: Student;
  semester?: number;
  curriculumId: number;
  curriculum: Curriculum;
  studentCourses: StudentCourse[];
}
