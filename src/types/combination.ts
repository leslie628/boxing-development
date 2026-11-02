export interface Combination {
  id: string
  name: string
  skillIds: string[]
  status?: 'natural' | 'needs-work'
}