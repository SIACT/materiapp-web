export interface CourseInCurriculum {
  id: number;
  semester: number;
  calendar: string | null;
  credits: number;
  isActive: boolean;
  curriculumId: number;
  courseId: number;
  prerequisiteId?: number | null;
}

export interface CreateCourseInCurriculum {
  semester: number;
  calendar?: string; // A or B
  credits: number;
  curriculumId: number;
  courseId: number;
}

export interface UpdateCourseInCurriculum {
  semester?: number;
  calendar?: string;
  credits?: number;
  curriculumId?: number;
  courseId?: number;
  prerequisiteId?: number | null;
}
