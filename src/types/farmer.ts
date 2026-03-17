export interface FarmerProfile {
  id?: string;
  name: string;
  location: string;
  phoneNumber: string;
  farmSizeAcres: number;
  primaryCrop: string;
  farmingMethod: string;
  estimatedYieldKg: number;
  yearsExperience: number;
  hasIrrigation: boolean;
  hasPriorLoan: boolean;
  createdAt?: Date;
}

export type CreditGrade = 'A' | 'B' | 'C' | 'D' | 'F';

export interface CreditScoreResult {
  credit_score: number;
  grade: CreditGrade;
  climate_risk_score: number;
  positive_factors: string[];
  risk_factors: string[];
  explanation: string;
  loan_recommendation: string;
  green_tips: string[];
}

export interface FarmerScoreResponse {
  success: boolean;
  data?: CreditScoreResult;
  error?: string;
}
