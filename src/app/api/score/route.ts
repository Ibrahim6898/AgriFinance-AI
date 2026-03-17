import { NextResponse } from 'next/server';
import { generateCreditScore } from '../../../lib/gemini';
import { FarmerProfile, FarmerScoreResponse } from '../../../types/farmer';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    const user = supabase ? (await supabase.auth.getUser()).data.user : null;
    
    // Basic server-side validation
    if (!body || typeof body.name !== 'string' || typeof body.phoneNumber !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Missing or invalid required fields: name, phoneNumber' } as FarmerScoreResponse,
        { status: 400 }
      );
    }
    
    const farmer: FarmerProfile = {
      ...body,
      farmSizeAcres: Number(body.farmSizeAcres) || 0,
      estimatedYieldKg: Number(body.estimatedYieldKg) || 0,
      yearsExperience: Number(body.yearsExperience) || 0,
      hasIrrigation: Boolean(body.hasIrrigation),
      hasPriorLoan: Boolean(body.hasPriorLoan)
    };

    const scoreData = await generateCreditScore(farmer);

    // If user is logged in and supabase is available, save/update their profile in the database
    if (user && supabase) {
      const { error: dbError } = await supabase
        .from('farmers')
        .upsert({
          id: user.id,
          name: farmer.name,
          phone_number: farmer.phoneNumber,
          location: farmer.location,
          farm_size_acres: farmer.farmSizeAcres,
          primary_crop: farmer.primaryCrop,
          farming_method: farmer.farmingMethod,
          estimated_yield_kg: farmer.estimatedYieldKg,
          years_experience: farmer.yearsExperience,
          has_irrigation: farmer.hasIrrigation,
          has_prior_loan: farmer.hasPriorLoan,
          credit_score: scoreData.credit_score,
          credit_grade: scoreData.grade,
          climate_risk_score: scoreData.climate_risk_score,
          explanation: scoreData.explanation,
          loan_recommendation: scoreData.loan_recommendation,
          positive_factors: scoreData.positive_factors,
          risk_factors: scoreData.risk_factors,
          green_tips: scoreData.green_tips,
        });

      if (dbError) {
        console.error('Error saving to Supabase:', dbError);
        // We still return the scoreData even if saving fails, but we log the error
      }
    }

    return NextResponse.json(
      { success: true, data: scoreData } as FarmerScoreResponse,
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in /api/score route:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' } as FarmerScoreResponse,
      { status: 500 }
    );
  }
}

// Block GET requests gracefully
export async function GET() {
  return NextResponse.json(
    { success: false, error: 'Method not allowed. Please use POST.' },
    { status: 405 }
  );
}
