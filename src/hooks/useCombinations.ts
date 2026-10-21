import { useEffect, useState } from "react";
import {
  getCombinations,
  createCombination as createCombinationApi,
} from "../services/combinationService";
import type { Combination } from "../types/combination";
import type { CreateCombinationRequest } from "../types/createCombinationRequest";

export const useCombinations = () => {
  const [combinations, setCombinations] = useState<Combination[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCombinations = async () => {
      try {
        const combinationsData = await getCombinations();
        setCombinations(combinationsData);
      } catch (error) {
        console.error("Error fetching combinations:", error);
        setError("Failed to load combinations.");
      } finally {
        setLoading(false);
      }
    };

    void fetchCombinations();
  }, []);

  const createCombination = async (data: CreateCombinationRequest) => {
    try {
      const newCombination = await createCombinationApi(data);

      setCombinations((previous) => [...previous, newCombination]);
      return newCombination;
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to save combination",
      );
      throw error;
    }
  };

  return { combinations, createCombination, error, loading };
};
