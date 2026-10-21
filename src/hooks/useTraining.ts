import { useEffect, useState } from "react";
import {
  createTrainingSession as createTrainingSessionApi,
  getTrainingSessions,
} from "../services/trainingService";
import type { CreateTrainingSessionRequest, Training } from "../types/Training";

export const useTraining = () => {
  const [trainingSessions, setTrainingSessions] = useState<Training[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrainingSessions = async () => {
      try {
        const trainingSessions = await getTrainingSessions();
        setTrainingSessions(trainingSessions);
      } catch (error) {
        console.error("Error fetching training sessions:", error);
        setError("Failed to load training sessions.");
      } finally {
        setLoading(false);
      }
    };
    void fetchTrainingSessions();
  }, []);
  
  const createTrainingSession = async (data: CreateTrainingSessionRequest) => {
    try {
      setError(null);
      const newSession = await createTrainingSessionApi(data);
      setTrainingSessions((prevSessions) => [...prevSessions, newSession]);
      return newSession;
    } catch (error) {
      console.error("Error creating training session:", error);
      setError("Failed to create training session.");
      throw error;
    }
  };

  return { trainingSessions, createTrainingSession, error, loading };
};
