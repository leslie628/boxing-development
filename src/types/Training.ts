import type { AssessmentStatus } from "./assessmentStatus";

export type Training = {
  id: string;
  date: string;
  duration: number;
  skills: string[];
  combinations: {
    id: number;
    status: AssessmentStatus;
  }[];
  notes: string;
  createdAt: string;
};
export interface CreateTrainingSessionRequest {
  date: string;
  durationMinutes: number;
  skillIds: string[];
  combinationIds: string[];
  notes: string;
  skillAssessments?: {
    id: string;
    status: AssessmentStatus;
  }[];

  combinationAssessments?: {
    id: string;
    status: AssessmentStatus;
  }[];
}

export interface ApiTrainingSession {
  id: string;
  date: string;
  durationMinutes: number;
  skillIds: string[];
  combinationIds: string[];
  combinations: {
    id: number;
    status: AssessmentStatus;
  }[];
  notes: string;
  createdAt: string;
}
