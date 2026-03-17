# AgriFinance AI - Solution Brief

## Problem
In Sub-Saharan Africa, millions of smallholder farmers lack access to formal banking and credit systems. Traditional microfinance institutions (MFIs) rely on credit histories or steady bank deposits to assess risk—metrics these farmers simply don't have. This financial exclusion forces farmers to rely on predatory lenders or prevents them from purchasing high-yield seeds and fertilizers, trapping communities in poverty.

Furthermore, climate change introduces unpredictable weather patterns. Farmers without access to climate-smart agricultural knowledge or irrigation are increasingly vulnerable to crop failure.

## Users
**Primary**: Smallholder farmers in underserved communities (focusing on Nigeria, Kenya, and Ghana). These users often have limited internet access, utilize feature phones (2G/USSD), and require simple, local-language interfaces.
**Secondary**: Rural cooperatives and Microfinance Institutions (MFIs). They need an efficient, robust dashboard to filter, evaluate, and match farmers with the right financial products while mitigating lending risk.

## Build
**AgriFinance AI** is a web platform built with a modern, mobile-first tech stack (Next.js 14 App Router, Tailwind CSS, TypeScript) and an AI-driven backend (Google Gemini API).

Instead of relying on banking history, AgriFinance evaluates alternative data points:
- Farm size and primary crop
- Years of farming experience
- Access to irrigation
- Estimated crop yields

The Gemini AI engine processes these inputs, alongside climate risk factors, to generate a comprehensive credit score and a clear, plain-language explanation. Crucially, the platform includes an SMS/USSD interface for our primary users, ensuring digital inclusion for farmers without smartphones.

## Impact
AgriFinance AI addresses all four pillars of the FEED challenge:
1. **Financial Inclusion**: By utilizing non-traditional data signals for credit scoring, we unlock micro-loan access for previously "unscorable" farmers.
2. **Education**: The AI generates actionable, personalized "Green Tips" to educate farmers on improving yields and adopting climate-smart practices.
3. **Environment**: Climate risk scoring prioritizes sustainable agriculture and highlights environmental vulnerabilities, rewarding farmers who utilize eco-friendly methods.
4. **Digital Inclusion**: With a low-bandwidth design and USSD/SMS fallback integration, the platform reaches farmers exactly where they are—on feature phones with 2G connections.

## Scalability
The architecture is inherently scalable. As Next.js serverless functions process the AI integration, the core logic effortlessly scales with demand.
Future roadmap items include:
- **Supabase Integration**: Storing and tracking farmer profiles over time to build robust, continuous credit histories.
- **Twilio SMS Gateway**: Migrating the current USSD/SMS simulator to live, automated two-way SMS communication.
- **Localized AI Models**: Expanding the language options in the Gemini prompt (e.g., Swahili, Hausa, Yoruba) to ensure native-language accessibility across more regions.
