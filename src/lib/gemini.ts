import { GoogleGenerativeAI } from '@google/generative-ai';
import { FarmerProfile, CreditScoreResult } from '../types/farmer';

// Initialize the Google Gen AI client.
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'AIza-placeholder-key');

const SYSTEM_PROMPT = (language: string) => `You are an AI agricultural credit analyst for Zamfara State, Nigeria. 
Your primary mission is Financial Inclusion for smallholder farmers. 
You MUST assess farmers using a Hybrid Scoring Logic (Rules + AI Analysis).

Language: Provide all analysis, factors, and tips in ${language === 'ha' ? 'Hausa' : 'English'}.

Hybrid Rules (Zamfara Context):
1. EXPERIENCE BIAS: If years_experience < 2, the credit_score cannot exceed 60.
2. REGIONAL FIT: If crop is "Cotton", "Groundnuts", "Beans", or "Tobacco", add 10 points for region-crop fit in Zamfara.
3. CLIMATE RESILIENCE: If irrigation is "false", climate_risk_score MUST be at least 6.
4. LOAN CAP: Maximum recommendation is $5000 USD for Grade A, $2500 for Grade B.

Return ONLY valid JSON:
{
  "credit_score": number,
  "grade": "A" | "B" | "C" | "D",
  "climate_risk_score": number,
  "positive_factors": string[],
  "risk_factors": string[],
  "explanation": string,
  "loan_recommendation": string,
  "green_tips": string[]
}
`;

/**
 * Calls the Gemini API to generate a credit score based on the farmer's profile.
 */
export async function generateCreditScore(farmer: FarmerProfile, language: string = 'en'): Promise<CreditScoreResult> {
  if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'AIza-placeholder-key') {
    console.warn('GEMINI_API_KEY is missing or placeholder. Returning mock data.');
    return getMockData(farmer, language);
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const prompt = `Farmer Profile: ${JSON.stringify(farmer)}`;
    
    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: 'application/json',
        temperature: 0.2,
      },
      systemInstruction: SYSTEM_PROMPT(language)
    });

    const response = await result.response;
    const text = response.text();
    return JSON.parse(text) as CreditScoreResult;
  } catch (error) {
    console.error('Error generating credit score from Gemini:', error);
    return getMockData(farmer, language);
  }
}

/**
 * Generates deterministic-ish mock data based on the farmer's inputs.
 */
function getMockData(farmer: FarmerProfile, language: string = 'en'): CreditScoreResult {
  const isHa = language === 'ha';
  let baseScore = 40;
  
  // Zamfara-specific high value crops
  const regionalCrops = ['cotton', 'groundnut', 'beans', 'tobacco', 'maize', 'sorghum'];
  const isRegionMatch = regionalCrops.some(crop => farmer.primaryCrop.toLowerCase().includes(crop));
  
  baseScore += Math.min(farmer.yearsExperience * 4, 30);
  if (isRegionMatch) baseScore += 10;
  if (farmer.hasIrrigation) baseScore += 15;
  if (farmer.farmSizeAcres > 5) baseScore += 5;
  if (farmer.yearsExperience < 2) baseScore = Math.min(baseScore, 60);

  const score = Math.max(0, Math.min(100, baseScore));
  let grade: 'A' | 'B' | 'C' | 'D' = 'C';
  if (score >= 80) grade = 'A';
  else if (score >= 70) grade = 'B';
  else if (score >= 60) grade = 'C';
  else grade = 'D';

  return {
    credit_score: score,
    grade,
    climate_risk_score: farmer.hasIrrigation ? 3 : 7,
    positive_factors: isHa ? [
      isRegionMatch ? `Amfanin gona ya dace da yankin Zamfara: ${farmer.primaryCrop}` : "Daidaiton amfanin gona",
      farmer.hasIrrigation ? "Inshorar yanayi: Samun ban-ruwa" : "Hanyoyin noma",
      farmer.farmSizeAcres > 5 ? "Girma da yalwar gona" : "Manomi mai jajircewa"
    ] : [
      isRegionMatch ? `High Region-Crop alignment for Zamfara: ${farmer.primaryCrop}` : "Standard Crop Alignment",
      farmer.hasIrrigation ? "Climate Resilience: Access to Irrigation" : "Stable Farming Method",
      farmer.farmSizeAcres > 5 ? "Scale potential for commercial growth" : "Dedicated Smallholder"
    ],
    risk_factors: isHa ? [
      farmer.yearsExperience < 2 ? "Karancin shekarun gwaninta" : "Canjin kasuwa",
      !farmer.hasIrrigation ? "Babban hadarin fari ba tare da ban-ruwa ba" : "Kwanciyar hankali"
    ] : [
      farmer.yearsExperience < 2 ? "Low Experience Bias" : "Market Volatility",
      !farmer.hasIrrigation ? "High Climate Risk (Rain-fed dependency)" : "Low Security Risk"
    ],
    explanation: isHa 
      ? `Binciken Mu don ${farmer.name}: Mun gano maki ${score}/100 a matakin ${grade}. Dalilan hakan sun hada da ${farmer.yearsExperience} na gwaninta da kuma kyakkyawan amfani na ${farmer.primaryCrop} a Zamfara.`
      : `Analysis for ${farmer.name}: Scoring system identifies a ${grade} grade (${score}/100). Primary drivers include ${farmer.yearsExperience} years of experience and strong ${farmer.primaryCrop} yield potential in Zamfara.`,
    loan_recommendation: score >= 80 ? "$500 - $1000 USD" : (score >= 60 ? "$200 - $400 USD" : "$50 - $150 USD"),
    green_tips: isHa ? [
      "Yi amfani da irin da ke jure fari na Zamfara.",
      "Shiga kungiyar manoma ta Karamar Hukumar ku.",
      "Inganta dabarun ban-ruwa."
    ] : [
      "Use drought-resistant seeds certified for Zamfara soils.",
      "Join a local cooperative in your LGA for bulk fertilizer access.",
      "Implement simple rainwater harvesting for small-scale irrigation."
    ]
  };
}
