import { useEffect, useState } from "react";
import { getSkills, createSkill } from "../services/skillService";
import type { Skill } from "../types/skill";
import type { CreateSkillRequest } from "../types/createSkillRequest";

export const useSkills = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const skillsData = await getSkills();
        setSkills(skillsData);
      } catch (error) {
        console.error("Error fetching skills:", error);
        setError("Failed to load skills.");
      } finally {
        setLoading(false);
      }
    };

    void fetchSkills();
  }, []);

  const createNewSkill = async (skill: CreateSkillRequest) => {
    try {
      await createSkill(skill);
    } catch (error) {
      console.error("Error creating skills:", error);
      setError("Failed to create skills.");
    } finally {
      setLoading(false);
    }
  };

  return { skills, createNewSkill, error, loading };
};
