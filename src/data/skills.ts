import type { Skill } from '../types/skill'

export const SkillCategory = {
  Punch: 'Punch',
  Defence: 'Defence',
  Footwork: 'Footwork',
} as const

export const skills: Skill[] = [
  {
    id: 'jab',
    name: 'Jab',
    category: SkillCategory.Punch,
    description: 'A straight punch delivered with the lead hand.',
  },
  {
    id: 'cross',
    name: 'Cross',
    category: SkillCategory.Punch,
    description: 'A straight punch delivered with the rear hand.',
  },
  {
    id: 'lead-hook',
    name: 'Lead Hook',
    category: SkillCategory.Punch,
    description: 'A curved punch delivered with the lead hand.',
  },
  {
    id: 'rear-hook',
    name: 'Rear Hook',
    category: SkillCategory.Punch,
    description: 'A curved punch delivered with the rear hand.',
  },
  {
    id: 'slip',
    name: 'Slip',
    category: SkillCategory.Defence,
    description: 'Move the head off the centre line to evade a punch.',
  },
  {
    id: 'bob-and-weave',
    name: 'Bob and Weave',
    category: SkillCategory.Defence,
    description: 'Bend the knees and move under an incoming punch.',
  },
  {
    id: 'footwork',
    name: 'Footwork',
    category: SkillCategory.Footwork,
    description: 'Move and reposition while maintaining balance.',
  },
]