import type { CreateSkillRequest } from '../types/createSkillRequest'
import type { Skill } from '../types/skill'

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000'
const skillUrl=`${API_URL}/api/skills`;

export const getSkills = async (): Promise<Skill[]> => {
  const response = await fetch(skillUrl)
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
    `${skillUrl}/${encodeURIComponent(id)}/status`,
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

export const createSkill = async (
  skill: CreateSkillRequest,
): Promise<Skill> => {
  const response = await fetch(`${skillUrl}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(skill),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to create skill.");
  }

  return data;
};

