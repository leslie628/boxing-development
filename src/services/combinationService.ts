
import type { AICombinationRequest, AICombinations } from '../types/aiCombinations'
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

export const getAISuggestions = async (data: AICombinationRequest): Promise<AICombinations> => {
  const response = await fetch(`${API_URL}/api/combinations/ai`,{
     method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error('Failed to fetch AI suggestions.')
  }
  return response.json() as Promise<AICombinations>
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

export const updateCombinationStatus = async (combinationId: string, status: 'natural' | 'needs-work'): Promise<Combination> => {
  const response = await fetch(`${API_URL}/api/combinations/${encodeURIComponent(combinationId)}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status }),
  })
  if(!response.ok) {
    const errorData = await response.json().catch(() => null)
    throw new Error(errorData?.message ?? 'Failed to update combination status.')
  }
  return response.json() as Promise<Combination>
}