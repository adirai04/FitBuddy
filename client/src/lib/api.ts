import axios from 'axios';
import { FitnessProfile, FitnessPlanResponse } from '../../../shared/types';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

export const generatePlan = async (data: FitnessProfile): Promise<FitnessPlanResponse> => {
  const response = await api.post('/generate-plan', data);
  return response.data.data;
};