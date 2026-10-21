import type { ApiTrainingSession, Training } from '../types/Training';
import type { CreateTrainingSessionRequest } from '../types/Training';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000'

export const getTrainingSessions = async (): Promise<Training[]> => {
  const response = await fetch(`${API_URL}/api/training`)

  if (!response.ok) {
    throw new Error('Failed to fetch training sessions')
  }

  const sessions: ApiTrainingSession[] = await response.json()

  return sessions.map((session) => ({
    id: session.id,
    date: session.date,
    duration: session.durationMinutes,
    skills: session.skillIds,
    combinations: session.combinationIds,
    notes: session.notes,
    createdAt: session.createdAt,
  }))
}

export const createTrainingSession = async (
  data: CreateTrainingSessionRequest,
): Promise<Training> => {
  const response = await fetch(`${API_URL}/api/training`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error('Failed to save training session')
  }

  const session: ApiTrainingSession = await response.json()

  return {
    id: session.id,
    date: session.date,
    duration: session.durationMinutes,
    skills: session.skillIds,
    combinations: session.combinationIds,
    notes: session.notes,
    createdAt: session.createdAt,
  }
}