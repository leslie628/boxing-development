import type { Skill } from '../types/skill'

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000'

export const getSkills = async (): Promise<Skill[]> => {
  const response = await fetch(`${API_URL}/api/skills`)
  if (!response.ok) {
    throw new Error('Failed to fetch Skills.')
  }

  return response.json() as Promise<Skill[]>
}