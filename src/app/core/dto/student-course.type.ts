export interface StudentCourse {
  id: number;
  name: string;
  code: string;
  semester: number;
  calendar: string;
  type: string;
  credits: number;
  isApproved: boolean;
  courseInCurriculumId: number;
}
