export interface StudentCurriculum {
  id: number;
  studentId: string;
  schoolId: number;
  programId: number;
  curriculumId: number;
  semester: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export type StudentCurriculumCreateDto = Partial<StudentCurriculum>;