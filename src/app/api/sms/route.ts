import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { to, message } = await request.json();

    if (!to || !message) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    const TERMII_URL = process.env.TERMII_URL || 'https://api.ng.termii.com/api/sms/send';
    const TERMII_API_KEY = process.env.TERMII_API_KEY;
    const TERMII_SENDER_ID = process.env.TERMII_SENDER_ID || 'AgriFinance'; // Termii assigned Sender ID

    if (!TERMII_API_KEY) {
      console.warn('TERMII_API_KEY is missing. Mocking SMS dispatch.');
      console.log(`[SMS MOCK] To: ${to} | Message: ${message}`);
      return NextResponse.json({ success: true, mocked: true, message: 'Message correctly logged locally' }, { status: 200 });
    }

    const payload = {
      to,
      from: TERMII_SENDER_ID,
      sms: message,
      type: 'plain',
      channel: 'generic',
      api_key: TERMII_API_KEY,
    };

    const termiiRes = await fetch(TERMII_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await termiiRes.json();

    if (!termiiRes.ok) {
      console.error('Termii API Error:', data);
      return NextResponse.json({ success: false, error: data.message || 'Termii error' }, { status: termiiRes.status });
    }

    return NextResponse.json({ success: true, data }, { status: 200 });

  } catch (error) {
    console.error('SMS API Route Error:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
