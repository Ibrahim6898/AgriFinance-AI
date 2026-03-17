import { GoogleGenAI } from '@google/genai';
import { FarmerProfile, CreditScoreResult } from '../types/farmer';

// Initialize the Google Gen AI client. Note that it automatically picks up the GEMINI_API_KEY environment variable if not passed explicitly,
// but we pass it explicitly here for clarity based on the requirements.
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || 'AIza-placeholder-key' });

const SYSTEM_PROMPT = `You are an AI agricultural credit analyst for rural Sub-Saharan Africa. Your primary mission is Financial Inclusion for smallholder farmers.
You MUST assess farmers using a Hybrid Scoring Logic (Rules + AI Analysis).

Hybrid Rules (Priority):
1. EXPERIENCE BIAS: If years_experience < 2, the credit_score cannot exceed 60 (high risk for new farmers).
2. LOCAL CONTEXT: If location is "Kano" and crop is "Maize", these are highly compatible; add 10 points for region-crop fit.
3. SCALING POTENTIAL: If farmSizeAcres > 5, flag as "Commercial potential"; increase loan_recommendation by 20%.
4. CLIMATE RESILIENCE: If irrigation is "false", climate_risk_score MUST be at least 6.

Return ONLY valid JSON with this exact structure:
{
  "credit_score": 85,
  "grade": "A",
  "climate_risk_score": 4,
  "positive_factors": ["Rule Match: 10yr+ experience", "Region-Crop Fit: Kano Maize", "Irrigation resilient"],
  "risk_factors": ["High regional heat index", "Small farm-to-yield ratio"],
  "explanation": "Summarize how the hybrid rules and AI analysis resulted in this score. Be explainable.",
  "loan_recommendation": "suggested range in USD",
  "green_tips": ["Actionable tip 1", "Actionable tip 2", "Actionable tip 3"]
}

Scoring Rubric (Total 100):
- Experience (Experience Rules apply): 0-30
- Asset Stability (Farm size + Irrigation): 0-30
- Market Fit (Crop + Location context): 0-25
- Financial Maturity (Prior history): 0-15
`;

/**
 * Calls the Gemini API to generate a credit score based on the farmer's profile.
 * Falls back to mock data if the API key is missing or the request fails.
 */
export async function generateCreditScore(farmer: FarmerProfile): Promise<CreditScoreResult> {
  // Fallback if API key is not configured
  if (!process.env.GEMINI_API_KEY) {
    console.warn('GEMINI_API_KEY is missing. Returning mock data.');
    return getMockData(farmer);
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        { role: 'user', parts: [{ text: JSON.stringify(farmer) }] }
      ],
      config: {
        systemInstruction: SYSTEM_PROMPT,
        responseMimeType: 'application/json',
        temperature: 0.2, // Low temperature for more consistent, analytical responses
      }
    });

    if (!response.text) {
      throw new Error('No text returned from Gemini API');
    }

    const result = JSON.parse(response.text) as CreditScoreResult;
    return result;
  } catch (error) {
    console.error('Error generating credit score from Gemini:', error);
    console.warn('Falling back to mock data...');
    return getMockData(farmer);
  }
}

/**
 * Generates deterministic-ish mock data based on the farmer's inputs 
 * so the application can still function perfectly during demo or offline mode.
 */
function getMockData(farmer: FarmerProfile): CreditScoreResult {
  let baseScore = 40;
  const isKanoMaize = farmer.location.toLowerCase().includes('kano') && farmer.primaryCrop.toLowerCase().includes('maize');
  
  // Rule 1: Experience
  baseScore += Math.min(farmer.yearsExperience * 4, 30);
  
  // Rule 2: Local Context (Kano Maize)
  if (isKanoMaize) baseScore += 10;
  
  // Rule 3: Irrigation
  if (farmer.hasIrrigation) baseScore += 15;
  
  // Rule 4: Scale
  if (farmer.farmSizeAcres > 5) baseScore += 5;

  // Cap for low experience
  if (farmer.yearsExperience < 2) baseScore = Math.min(baseScore, 60);

  const score = Math.max(0, Math.min(100, baseScore));
  let grade: 'A' | 'B' | 'C' | 'D' | 'F' = 'C';
  if (score >= 80) grade = 'A';
  else if (score >= 70) grade = 'B';
  else if (score >= 60) grade = 'C';
  else if (score >= 50) grade = 'D';
  else grade = 'F';

  return {
    credit_score: score,
    grade,
    climate_risk_score: farmer.hasIrrigation ? 3 : 7,
    positive_factors: [
      isKanoMaize ? "High Region-Crop Alignment: Ideal for Maize cultivation in Kano." : "Standard crop-region alignment.",
      farmer.hasIrrigation ? "Resilience Rule: Access to irrigation mitigates drought risk." : "Stable farming method.",
      farmer.farmSizeAcres > 5 ? "Scale Rule: Farm size indicates potential for commercial surplus." : "Manageable smallholder operation."
    ],
    risk_factors: [
      farmer.yearsExperience < 2 ? "Experience Rule: Low tenure increases operational risk for lenders." : "Standard market price volatility.",
      !farmer.hasIrrigation ? "Resilience Rule: Lack of irrigation increases climate vulnerability." : "Minor pests risk."
    ],
    explanation: `Analysis for ${farmer.name}: Hybrid logic identifies a ${grade} grade. Key drivers include ${farmer.yearsExperience} years of experience and ${isKanoMaize ? 'excellent crop-region fit in Kano' : 'stable primary crop'}. Total score is ${score}/100.`,
    loan_recommendation: score >= 80 ? "$400 - $750 USD" : (score >= 60 ? "$150 - $300 USD" : "$50 - $100 USD"),
    green_tips: [
      "Switch to drought-resistant seed varieties certified by the local council.",
      "Implement drip irrigation or rainwater harvesting to ensure year-round yields.",
      "Register with a local cooperative to pool resources and negotiate better fertilizer prices."
    ]
  };
}
