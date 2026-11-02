export interface Skill {
  id: string
  name: string
  category: string
  description: string,
  status?: "natural" | "needs-work"
}