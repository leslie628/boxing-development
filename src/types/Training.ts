export type Training = {
  id: string;
  date: string;
  duration: number;
  skills: string[];
  combinations: string[];
  notes: string;
  createdAt: string;
};
export interface CreateTrainingSessionRequest {
  date: string;
  durationMinutes: number;
  skillIds: string[];
  combinationIds: string[];
  notes: string;
}

export interface ApiTrainingSession {
  id: string;
  date: string;
  durationMinutes: number;
  skillIds: string[];
  combinationIds: string[];
  notes: string;
  createdAt: string;
}
