import { useEffect, useState } from "react";
import { getSkills } from "../services/skillService";
import type { Skill } from "../types/skill";

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

  return { skills, error, loading };
};
