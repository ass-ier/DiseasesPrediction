import axios from 'axios';
import { DiabetesPrediction, HeartDiseasePrediction, ParkinsonsPrediction, PredictionResult } from '../types';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const predictionApi = {
  // Diabetes Prediction
  predictDiabetes: async (data: DiabetesPrediction): Promise<PredictionResult> => {
    const response = await api.post('/predict/diabetes', data);
    return response.data;
  },

  // Heart Disease Prediction
  predictHeartDisease: async (data: HeartDiseasePrediction): Promise<PredictionResult> => {
    const response = await api.post('/predict/heart', data);
    return response.data;
  },

  // Parkinson's Disease Prediction
  predictParkinsons: async (data: ParkinsonsPrediction): Promise<PredictionResult> => {
    const response = await api.post('/predict/parkinsons', data);
    return response.data;
  },

  // Health check
  healthCheck: async (): Promise<{ status: string; message: string }> => {
    const response = await api.get('/health');
    return response.data;
  },
};

export default api;
