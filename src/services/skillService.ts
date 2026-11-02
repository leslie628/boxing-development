import type { Skill } from '../types/skill'

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000'

export const getSkills = async (): Promise<Skill[]> => {
  const response = await fetch(`${API_URL}/api/skills`)
  if (!response.ok) {
    throw new Error('Failed to fetch Skills.')
  }

  return response.json() as Promise<Skill[]>
}

export async function updateSkillStatus(
  id: string,
  status: 'natural' | 'needs-work' | null,
): Promise<Skill> {
  const response = await fetch(
    `${API_URL}/api/skills/${encodeURIComponent(id)}/status`,
    {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    },
  )

  if (!response.ok) {
    throw new Error('Failed to update skill status')
  }

  return response.json()
}