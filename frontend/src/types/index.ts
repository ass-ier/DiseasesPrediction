export interface DiabetesPrediction {
  pregnancies: number;
  glucose: number;
  bloodPressure: number;
  skinThickness: number;
  insulin: number;
  bmi: number;
  diabetesPedigreeFunction: number;
  age: number;
}

export interface HeartDiseasePrediction {
  age: number;
  sex: number; // 0: female, 1: male
  cp: number; // chest pain type
  trestbps: number; // resting blood pressure
  chol: number; // cholesterol
  fbs: number; // fasting blood sugar
  restecg: number; // resting electrocardiographic results
  thalach: number; // maximum heart rate achieved
  exang: number; // exercise induced angina
  oldpeak: number; // ST depression induced by exercise
  slope: number; // slope of peak exercise ST segment
  ca: number; // number of major vessels
  thal: number; // thalassemia
}

export interface ParkinsonsPrediction {
  mdvpFo: number; // MDVP:Fo(Hz)
  mdvpFhi: number; // MDVP:Fhi(Hz)
  mdvpFlo: number; // MDVP:Flo(Hz)
  mdvpJitter: number; // MDVP:Jitter(%)
  mdvpJitterAbs: number; // MDVP:Jitter(Abs)
  mdvpRap: number; // MDVP:RAP
  mdvpPpq: number; // MDVP:PPQ
  jitterDdp: number; // Jitter:DDP
  mdvpShimmer: number; // MDVP:Shimmer
  mdvpShimmerDb: number; // MDVP:Shimmer(dB)
  shimmerApq3: number; // Shimmer:APQ3
  shimmerApq5: number; // Shimmer:APQ5
  mdvpApq: number; // MDVP:APQ
  shimmerDda: number; // Shimmer:DDA
  nhr: number; // NHR
  hnr: number; // HNR
  rpde: number; // RPDE
  dfa: number; // DFA
  spread1: number; // spread1
  spread2: number; // spread2
  d2: number; // D2
  ppe: number; // PPE
}

export interface PredictionResult {
  prediction: number;
  confidence: number;
  message: string;
  riskLevel: 'low' | 'medium' | 'high';
}

export type DiseaseType = 'diabetes' | 'heart' | 'parkinsons';

export interface DiseaseInfo {
  name: string;
  description: string;
  icon: string;
  color: string;
  features: string[];
}
