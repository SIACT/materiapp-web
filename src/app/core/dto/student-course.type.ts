export interface StudentCourse {
  id: number;
 
  studentCurriculumId: number;
  courseInCurriculumId: number;
 
  approved: boolean;          
  approvedAt?: string | null;   
 
  createdAt: string;
  updatedAt: string;
 
  createdBy?: number;
  updatedBy?: number;
}
