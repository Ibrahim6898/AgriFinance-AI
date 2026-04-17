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

export interface FarmerDB {
  id: string;
  name: string;
  location: string;
  phone_number: string;
  farm_size_acres: number;
  primary_crop: string;
  farming_method: string;
  estimated_yield_kg: number;
  years_experience: number;
  has_irrigation: boolean;
  has_prior_loan: boolean;
  credit_score: number;
  credit_grade: string;
  climate_risk_score: number;
  loan_status?: 'pending' | 'approved' | 'rejected';
  assigned_lender?: string;
  created_at?: string;
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
