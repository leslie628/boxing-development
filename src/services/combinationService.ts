
import type { Combination } from '../types/combination'
import type { CreateCombinationRequest } from '../types/createCombinationRequest'

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000'

export const getCombinations = async (): Promise<Combination[]> => {
  const response = await fetch(`${API_URL}/api/combinations`)

  if (!response.ok) {
    throw new Error('Failed to fetch combinations.')
  }

  return response.json() as Promise<Combination[]>
}

export const createCombination = async (data: CreateCombinationRequest): Promise<Combination> => {
  const response = await fetch(`${API_URL}/api/combinations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => null)
    throw new Error(errorData?.message ?? 'Failed to save combination.')
  }

  return response.json() as Promise<Combination>
}
