import { GoogleGenAI } from '@google/genai';
import { FarmerProfile, CreditScoreResult } from '../types/farmer';

// Initialize the Google Gen AI client. Note that it automatically picks up the GEMINI_API_KEY environment variable if not passed explicitly,
// but we pass it explicitly here for clarity based on the requirements.
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || 'AIza-placeholder-key' });

const SYSTEM_PROMPT = `You are an AI credit analyst specializing in agricultural microfinance for Sub-Saharan Africa. You assess smallholder farmers for creditworthiness using non-traditional data signals. You are fair, transparent, and always explain your reasoning in plain language a farmer can understand.

You will receive a farmer profile in JSON. Return ONLY valid JSON with this exact structure:
{
  "credit_score": 85,
  "grade": "A",
  "climate_risk_score": 4,
  "positive_factors": ["string", "string", "string"],
  "risk_factors": ["string", "string"],
  "explanation": "4 sentences max, plain English",
  "loan_recommendation": "suggested loan range in USD",
  "green_tips": ["string", "string", "string"]
}

Scoring rubric:
Years of experience: 0 to 5 points per year, max 25
Farm size appropriateness for crop: 0 to 20
Irrigation access: 0 to 15
Crop market demand in region: 0 to 15
Climate risk of region and crop combo: 0 to 15, inverse, higher risk means lower score
Prior loan repayment history if any: 0 to 10
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
  let baseScore = 50;
  baseScore += Math.min(farmer.yearsExperience * 3, 25);
  if (farmer.hasIrrigation) baseScore += 15;
  if (!farmer.hasPriorLoan) baseScore -= 10;
  if (farmer.estimatedYieldKg > 2000) baseScore += 10;
  
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
    climate_risk_score: 4,
    positive_factors: [
      farmer.hasIrrigation ? "Access to reliable water source (irrigation) reduces crop failure risk." : "Stable primary crop selection.",
      `${farmer.yearsExperience} years of farming experience indicates practical resilience.`,
      `Estimated yield of ${farmer.estimatedYieldKg}kg shows strong growth potential.`
    ],
    risk_factors: [
      "Vulnerability to seasonal dry spells in the current region.",
      !farmer.hasPriorLoan ? "Lack of formal credit history makes long-term repayment patterns unpredictable." : "Potential market price fluctuations for primary crop."
    ],
    explanation: `Based on the provided details, ${farmer.name} demonstrates a fair capacity for repayment, primarily supported by ${farmer.yearsExperience} years of experience and a strong estimated yield of ${farmer.estimatedYieldKg}kg. The ${farmer.farmSizeAcres} acre farm shows promise, though weather variability presents a mild risk factor. Adopting additional recommended eco-practices could further improve stability.`,
    loan_recommendation: score >= 70 ? "$250 - $500 USD" : "$50 - $150 USD",
    green_tips: [
      "Consider intercropping with legumes to naturally enrich soil nitrogen.",
      "Use mulching around crop roots to retain moisture during periods of low rainfall.",
      "Track local weather alerts to optimize the timing of your planting and harvesting."
    ]
  };
}
