import { NextResponse } from 'next/server';
import { generateCreditScore } from '../../../lib/gemini';
import { FarmerProfile, FarmerScoreResponse } from '../../../types/farmer';
import { createClient, createAdminClient } from '@/utils/supabase/server';


export async function POST(request: Request) {
  try {
    const body = await request.json();
    const language = body.language || 'en';
    const supabase = await createClient();
    
    if (!supabase) {
      // Return score without database persistence
      const scoreData = await generateCreditScore({
        ...body,
        farmSizeAcres: Number(body.farmSizeAcres) || 0,
        estimatedYieldKg: Number(body.estimatedYieldKg) || 0,
        yearsExperience: Number(body.yearsExperience) || 0,
        hasIrrigation: Boolean(body.hasIrrigation),
        hasPriorLoan: Boolean(body.hasPriorLoan)
      } as FarmerProfile, language);
      return NextResponse.json(
        { success: true, data: scoreData } as FarmerScoreResponse,
        { status: 200 }
      );
    }
    const { data: { user } } = await supabase.auth.getUser();
    
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

    const scoreData = await generateCreditScore(farmer, language);
    const isDemo = body.is_demo === true;

    // Always save to the database using admin client (bypasses RLS)
    const adminClient = createAdminClient();
    if (adminClient) {
      const targetId = user?.id || `farmer-${farmer.phoneNumber.replace(/\D/g, '').slice(-6)}-${Date.now()}`;
      
      const { error: dbError } = await adminClient
        .from('farmers')
        .upsert({
          id: targetId,
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
        console.error('Error saving farmer to Supabase:', dbError);
      } else {
        console.log('Farmer saved successfully:', targetId);
      }
    } else {
      console.warn('Admin client unavailable — SUPABASE_SERVICE_ROLE_KEY may not be set');
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
