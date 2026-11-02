import { useMemo } from 'react'
import type { Combination } from '../types/combination'
import type { Skill } from '../types/skill'

export const useDevelopmentOverview = (skills: Skill[], combinations: Combination[]) => {
  const overview = useMemo(() => ({
    naturalSkills: skills.filter(
      skill => skill.status === 'natural'
    ).length,

    skillsToImprove: skills.filter(
      skill => skill.status === 'needs-work'
    ).length,

    naturalCombinations: combinations.filter(
      combination => combination.status === 'natural'
    ).length,

    combinationsToImprove: combinations.filter(
      combination => combination.status === 'needs-work'
    ).length,
  }), [skills, combinations])

  return {
    overview
  }
}