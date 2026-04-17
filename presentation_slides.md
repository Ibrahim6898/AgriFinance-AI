---
theme: default
class: text-center
highlighter: shiki
lineNumbers: false
info: |
  ## AgriFinance AI - FEED Hackathon Presentation
drawings:
  persist: false
transition: slide-left
title: AgriFinance AI
fonts:
  sans: 'Inter, ui-sans-serif, system-ui'
---

<style>
:root {
  --brand-blue: #1A365D;
  --brand-orange: #F97316;
}
h1, h2, h3, h4, h5 {
  color: var(--brand-blue) !important;
}
.text-brand-blue { color: var(--brand-blue); }
.text-brand-orange { color: var(--brand-orange); }
.bg-brand-blue { background-color: var(--brand-blue); }
.bg-brand-orange { background-color: var(--brand-orange); }
.border-brand-orange { border-color: var(--brand-orange); }
.accent { color: var(--brand-orange); }
.header-bar {
  position: absolute;
  top: 0; left: 0; width: 100%;
  padding: 0.75rem 2rem;
  background-color: var(--brand-blue);
  color: white;
  font-size: 1.1rem;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  z-index: 10;
}
.slide-body {
  margin-top: 3.5rem;
  height: calc(100% - 3.5rem);
  overflow: hidden;
}
</style>

<!-- SLIDE 1: Title -->
<div class="header-bar">
<span>AgriFinance AI — FEED Hackathon 2026</span>
<span class="bg-white px-2 py-1 rounded flex items-center"><img src="/nextgen_logo.png" onerror="this.style.display='none';this.nextSibling.style.display='flex'" alt="NextGen" class="h-8"><span style="display:none;align-items:center;gap:4px;"><span style="color:#c00;font-weight:900;font-size:1rem;">NEXTGEN</span><span style="font-size:0.65rem;color:#555;">BY airtel & <span style="color:green;font-weight:bold;">3MTT</span></span></span></span>
</div>

<div class="slide-body flex flex-col justify-center items-center px-12">
<h1 class="text-5xl font-black uppercase tracking-tight mb-2">AgriFinance AI</h1>
<h2 class="text-2xl font-semibold text-gray-600 mb-8">Empowering Smallholders with <span class="accent font-bold">AI-Driven Credit Scoring</span></h2>

<div class="grid grid-cols-2 gap-6 w-full text-left">
<div class="bg-brand-blue text-white p-5 rounded shadow-lg border-t-4 border-orange-500">
<h3 class="text-orange-400 mb-3 border-b border-orange-500 pb-2 uppercase tracking-wide text-sm">Hackathon Details</h3>
<ul class="space-y-2 text-base">
<li><span class="text-green-400 mr-2">✓</span> NextGen Cohort Track</li>
<li><span class="text-green-400 mr-2">✓</span> Financial Inclusion Pillar</li>
<li><span class="text-green-400 mr-2">✓</span> Digital Inclusion Pillar</li>
</ul>
</div>
<div class="bg-white p-5 rounded shadow-lg border-l-4 border-orange-500">
<h3 class="text-brand-blue mb-3 uppercase tracking-wide text-sm">Presented By</h3>
<p class="text-lg font-black text-brand-blue mb-1">Ibrahim Yakubu Ahmad</p>
<p class="text-gray-500 text-sm mb-2">Fellow ID: FE/23/40137605 | NextGen Cohort</p>
<p class="text-brand-blue font-bold text-sm">Mai-Gus Software Technology (Maisoft)</p>
</div>
</div>
</div>

---
layout: default
---

<!-- SLIDE 2: The Problem -->
<div class="header-bar">
<span>The Problem: The Invisible Farmer</span>
</div>

<div class="slide-body grid grid-cols-2 gap-5 p-4">
<div class="bg-brand-blue text-white p-5 rounded shadow-lg border-t-4 border-orange-500 flex flex-col">
<h3 class="text-orange-400 mb-3 border-b border-orange-500 pb-2 uppercase tracking-wide text-sm">Real-World Relevance</h3>
<ul class="space-y-3 text-sm flex-grow">
<li><span class="text-green-400 font-bold mr-2">✓</span> Millions of smallholder farmers locked out of formal finance</li>
<li><span class="text-green-400 font-bold mr-2">✓</span> <b>No Financial Footprint:</b> No bank history, no collateral</li>
<li><span class="text-green-400 font-bold mr-2">✓</span> <b>High Risk Perception:</b> Lenders fear climate uncertainty</li>
<li><span class="text-red-400 font-bold mr-2">✗</span> Farmers cannot buy quality seeds or fertilizer</li>
</ul>
<div class="bg-brand-orange p-3 text-center font-bold italic rounded mt-3 text-white text-sm">
"How do lenders reach someone who doesn't exist on paper?"
</div>
</div>

<div class="flex flex-col gap-3">
<div class="bg-gray-50 p-4 rounded border-l-4 border-orange-500 shadow">
<h3 class="text-sm uppercase tracking-wide text-brand-blue mb-1 font-bold">The Vicious Cycle</h3>
<p class="text-gray-700 text-sm">No capital → Low yield → No savings → No credit. Without a loan, smallholder farmers are permanently trapped.</p>
</div>
<img src="/farmer.jpg" class="w-full flex-1 object-cover rounded shadow-lg border-4 border-white min-h-0" style="max-height: 220px;" alt="Distressed Farmer on Dry Farmland" />
</div>
</div>

---
layout: default
---

<!-- SLIDE 3: My Solution -->
<div class="header-bar">
<span>My Solution: AgriFinance AI</span>
</div>

<div class="slide-body flex flex-col justify-center p-4">
<p class="text-lg text-center mb-6 text-gray-700">An intelligent microfinance platform providing <span class="text-brand-orange font-bold">capital access</span> based on alternative agricultural data — not bank history.</p>

<div class="grid grid-cols-3 gap-5 text-center">
<div class="bg-white px-5 py-6 rounded shadow-lg border-t-4 border-orange-500 flex flex-col items-center">
<div class="w-14 h-14 rounded-full border-4 border-brand-blue flex items-center justify-center font-black text-lg text-brand-blue mb-3">01</div>
<h3 class="text-brand-blue font-black mb-2 border-b border-gray-200 w-full pb-2 text-base">Data Scoring</h3>
<p class="text-xs text-gray-600 leading-relaxed">Generates credit scores using farm data — size, yield, experience, crop type — rather than banking history.</p>
</div>

<div class="bg-white px-5 py-6 rounded shadow-lg border-t-4 border-orange-500 flex flex-col items-center">
<div class="w-14 h-14 rounded-full border-4 border-brand-blue flex items-center justify-center font-black text-lg text-brand-blue mb-3">02</div>
<h3 class="text-brand-blue font-black mb-2 border-b border-gray-200 w-full pb-2 text-base">Climate Guardrails</h3>
<p class="text-xs text-gray-600 leading-relaxed">Assesses localized climate risk per region and conditionally recommends resilient, green farming practices.</p>
</div>

<div class="bg-white px-5 py-6 rounded shadow-lg border-t-4 border-orange-500 flex flex-col items-center">
<div class="w-14 h-14 rounded-full border-4 border-brand-blue flex items-center justify-center font-black text-lg text-brand-blue mb-3">03</div>
<h3 class="text-brand-blue font-black mb-2 border-b border-gray-200 w-full pb-2 text-base">Score Simulator</h3>
<p class="text-xs text-gray-600 leading-relaxed">A "what-if" educational tool showing farmers exactly how positive actions (e.g. irrigation) improve their credit score.</p>
</div>
</div>
</div>

---
layout: default
---

<!-- SLIDE 4: Who Is This For -->
<div class="header-bar">
<span>Who Is This For?</span>
</div>

<div class="slide-body flex flex-col justify-center p-4">
<p class="text-base text-center text-gray-600 mb-5">Bridging the gap between those who need capital and those who supply it.</p>

<div class="grid grid-cols-2 gap-6">
<div class="bg-brand-blue text-white p-5 rounded shadow-lg border-l-4 border-orange-500">
<h3 class="text-orange-400 uppercase text-center border-b border-orange-500 pb-2 mb-4 text-sm tracking-widest">The Smallholder Farmer</h3>
<p class="text-gray-400 text-center mb-4 text-xs">(e.g., in Zamfara, Northern Nigeria)</p>
<ul class="space-y-3 text-sm">
<li><span class="text-green-400 font-bold mr-2">✓</span> Access via localized Hausa-language interface.</li>
<li><span class="text-green-400 font-bold mr-2">✓</span> Supports lower-fidelity USSD/SMS alternative workflows.</li>
<li><span class="text-green-400 font-bold mr-2">✓</span> Designed to overcome digital literacy and bandwidth limits.</li>
</ul>
</div>

<div class="bg-white p-5 rounded shadow-lg border-l-4 border-brand-blue">
<h3 class="text-brand-blue uppercase text-center border-b border-brand-blue pb-2 mb-4 text-sm tracking-widest">The Microfinance Lender</h3>
<p class="text-gray-500 text-center mb-4 text-xs">(MFIs, Community Banks & NGOs)</p>
<ul class="space-y-3 text-sm text-gray-800">
<li><span class="text-brand-blue font-bold mr-2">✓</span> Access via a dedicated Admin Lender Dashboard.</li>
<li><span class="text-brand-blue font-bold mr-2">✓</span> View curated lists of AI-scored, verified farmer profiles.</li>
<li><span class="text-brand-blue font-bold mr-2">✓</span> Gain transparent, evidence-based risk insights per applicant.</li>
</ul>
</div>
</div>
</div>

---
layout: default
---

<!-- SLIDE 5: How I Built It -->
<div class="header-bar">
<span>How I Built It — NextGen Tech Stack</span>
</div>

<div class="slide-body grid grid-cols-2 gap-6 p-4">
<div class="bg-brand-blue text-white p-5 rounded shadow-lg border-t-4 border-orange-500 flex flex-col justify-center items-center">
<h3 class="text-orange-400 uppercase tracking-widest mb-4 border-b border-orange-500 w-full text-center pb-2 text-sm">Core Technologies</h3>
<p class="text-gray-300 italic mb-5 text-xs">Designed for speed, scale, and resilience</p>
<div class="grid grid-cols-2 gap-3 w-full text-center">
<div class="bg-white border rounded flex items-center justify-center p-2"><img src="https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg" alt="Next.js" class="h-5"></div>
<div class="bg-white border rounded flex items-center justify-center p-2"><img src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg" alt="Tailwind" class="h-5"><span class="ml-1 text-gray-800 font-bold text-xs">Tailwind</span></div>
<div class="bg-white border text-gray-800 font-bold rounded flex items-center justify-center p-2 text-sm">Supabase</div>
<div class="bg-white border rounded flex items-center justify-center p-2"><img src="https://assets.vercel.com/image/upload/v1588805858/repositories/vercel/logo.png" alt="Vercel" class="h-5"></div>
</div>
</div>

<div class="flex flex-col justify-center space-y-4">
<div class="bg-white border-l-4 border-orange-500 p-4 shadow rounded">
<h3 class="text-brand-blue font-bold text-sm mb-1">Frontend & Routing</h3>
<p class="text-gray-600 text-xs">Next.js (React) with Tailwind CSS for a highly responsive, app-like experience.</p>
</div>
<div class="bg-white border-l-4 border-orange-500 p-4 shadow rounded">
<h3 class="text-brand-blue font-bold text-sm mb-1">Backend & Database</h3>
<p class="text-gray-600 text-xs">Supabase for secure data persistence, real-time updates, and Phone OTP authentication.</p>
</div>
<div class="bg-white border-l-4 border-orange-500 p-4 shadow rounded">
<h3 class="text-brand-blue font-bold text-sm mb-1">Localization & Deployment</h3>
<p class="text-gray-600 text-xs">Deployed on Vercel. React Context API drives instant Hausa-language UI switching.</p>
</div>
</div>
</div>

---
layout: default
---

<!-- SLIDE 6: AI Integration -->
<div class="header-bar">
<span>Meaningful AI Integration</span>
</div>

<div class="slide-body flex flex-col justify-center p-4">
<h2 class="text-center text-brand-blue text-xl font-bold mb-5">AI as a <span class="text-brand-orange uppercase">Localized Actuarial Engine</span></h2>

<div class="grid grid-cols-3 gap-5">
<div class="bg-brand-blue text-white p-5 rounded shadow-lg col-span-1 border-t-4 border-orange-500 flex flex-col items-center justify-center text-center">
<img src="https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg" alt="Gemini Logo" class="w-14 mb-4 bg-white rounded-full p-2">
<h3 class="text-white text-lg font-black uppercase mb-1">Google Gemini</h3>
<p class="text-gray-300 uppercase tracking-widest text-xs border-t border-gray-600 pt-2 w-full">Core Reasoning Engine</p>
</div>

<div class="col-span-2 flex flex-col gap-4">
<div class="bg-white p-5 rounded shadow border-l-4 border-gray-400">
<h4 class="text-gray-500 uppercase tracking-widest text-xs mb-2 font-bold">Step 1 — The Input</h4>
<p class="text-gray-800 text-sm">I feed non-traditional agricultural data (e.g., <i>"2 years experience, 5ha maize, manual irrigation, Zamfara region"</i>) into a high-context, strictly typed prompt.</p>
</div>
<div class="bg-white p-5 rounded shadow border-l-4 border-brand-orange">
<h4 class="text-brand-orange uppercase tracking-widest text-xs mb-2 font-bold">Step 2 — Output Synthesis</h4>
<p class="text-gray-800 text-sm mb-2">Gemini returns a structured JSON object containing:</p>
<ul class="list-disc ml-5 text-brand-blue font-bold text-sm space-y-1">
<li>A definitive Credit Score (0–100)</li>
<li>Clear Positive Factors & Risk Factors</li>
<li>Actionable, plain-language improvement advice</li>
</ul>
</div>
</div>
</div>
</div>

---
layout: default
---

<!-- SLIDE 7: Impact & Scalability -->
<div class="header-bar">
<span>Impact & Scalability</span>
</div>

<div class="slide-body flex flex-col justify-center p-4">
<div class="bg-blue-50 border-t-4 border-orange-500 p-4 text-center shadow mb-5 rounded">
<h2 class="text-brand-blue uppercase tracking-widest font-black text-xl">Building for the Next Billion</h2>
</div>

<div class="grid grid-cols-3 gap-5">
<div class="bg-white p-5 shadow-lg rounded border-b-4 border-orange-500">
<h3 class="text-brand-blue font-black border-b border-gray-200 pb-2 mb-3 text-base">Local First</h3>
<p class="text-gray-600 text-sm">Built-in Hausa localization can be extended to any region by adding a language mapping file — no code changes required.</p>
</div>

<div class="bg-white p-5 shadow-lg rounded border-b-4 border-brand-blue">
<h3 class="text-brand-blue font-black border-b border-gray-200 pb-2 mb-3 text-base">Low-Bandwidth Ready</h3>
<p class="text-gray-600 text-sm">Lightweight Next.js architecture built for eventual headless integration into USSD and SMS gateways for feature phones.</p>
</div>

<div class="bg-brand-blue p-5 shadow-lg rounded border-t-4 border-orange-500">
<h3 class="text-orange-400 font-black border-b border-gray-600 pb-2 mb-3 text-base">Data Flywheel</h3>
<p class="text-gray-300 text-sm">As loans are issued and repaid, the Supabase database builds a rich dataset — enabling a future transition from LLMs to bespoke local ML models.</p>
</div>
</div>
</div>

---
layout: default
---

<!-- SLIDE 8: Technical Demo -->
<div class="header-bar">
<span>Technical Demo</span>
</div>

<div class="slide-body flex flex-col items-center justify-center p-4">
<div class="bg-brand-blue text-white px-8 py-5 w-full max-w-3xl rounded shadow-lg border-t-4 border-orange-500 mb-5 relative mt-2">
<div class="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-brand-orange px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-white shadow">
Live MVP Now Available
</div>
<h3 class="text-white text-center text-base uppercase tracking-widest border-b border-gray-600 pb-3 mb-4">Test the Full Flow in 3 Steps</h3>
<ul class="space-y-3 text-sm">
<li class="flex items-center"><span class="bg-slate-700 text-orange-400 font-bold w-7 h-7 rounded-full border border-orange-400 flex items-center justify-center mr-3 shrink-0">1</span> Onboard as a farmer using the Hausa-localized form.</li>
<li class="flex items-center"><span class="bg-slate-700 text-orange-400 font-bold w-7 h-7 rounded-full border border-orange-400 flex items-center justify-center mr-3 shrink-0">2</span> Receive an instant AI-generated credit score with breakdown.</li>
<li class="flex items-center"><span class="bg-slate-700 text-orange-400 font-bold w-7 h-7 rounded-full border border-orange-400 flex items-center justify-center mr-3 shrink-0">3</span> Switch to the Lender Dashboard to review scored profiles.</li>
</ul>
</div>

<div class="grid grid-cols-2 gap-6 w-full max-w-3xl">
<a href="https://agri-finance-ai.vercel.app/" target="_blank" class="bg-white p-5 rounded text-center shadow border-b-4 border-orange-500 no-underline">
<h3 class="text-brand-orange font-black text-lg uppercase tracking-widest">Launch Live App</h3>
<p class="text-brand-blue font-bold mt-1 text-sm">agri-finance-ai.vercel.app</p>
</a>

<a href="https://github.com/Ibrahim6898/AgriFinance-AI" target="_blank" class="bg-white p-5 rounded text-center shadow border-l-4 border-brand-blue no-underline">
<h3 class="text-brand-blue font-black text-lg uppercase tracking-widest">GitHub Repository</h3>
<p class="text-gray-500 font-bold mt-1 text-sm">Ibrahim6898 / AgriFinance-AI</p>
</a>
</div>
</div>

---
layout: default
---

<!-- SLIDE 9: AI Disclosure -->
<div class="header-bar">
<span>AI & Tool Disclosure</span>
</div>

<div class="slide-body flex flex-col justify-center p-4">
<p class="text-center text-gray-400 uppercase tracking-widest font-bold mb-5 text-xs">Required per FEED Hackathon Submission Rules</p>

<div class="grid grid-cols-2 gap-5 mb-5">
<div class="bg-white p-5 rounded shadow border-l-4 border-orange-500">
<h3 class="text-brand-blue uppercase font-black border-b border-orange-500 pb-2 mb-3 text-sm">AI Used in the Product</h3>
<p class="text-gray-700 text-sm leading-relaxed">Google Gemini API is the core reasoning engine — it synthesizes <b>alternative agricultural data</b> into structured <b>credit risk profiles</b> with transparent reasoning for both farmer and lender.</p>
</div>

<div class="bg-white p-5 rounded shadow border-l-4 border-brand-blue">
<h3 class="text-brand-blue uppercase font-black border-b border-brand-blue pb-2 mb-3 text-sm">AI Used in Development</h3>
<p class="text-gray-700 text-sm leading-relaxed">I used AI coding assistants to accelerate prototyping, generate Tailwind layouts, and structure the Next.js and Supabase integration patterns.</p>
</div>
</div>

<div class="bg-brand-blue p-5 rounded text-center shadow-lg border-t-4 border-brand-orange">
<h3 class="text-orange-400 uppercase tracking-widest font-black mb-2 text-sm">MVP Limitation</h3>
<p class="text-gray-300 text-sm">The scoring model currently relies on LLM heuristics. For production, the rubric will be strictly calibrated using real historical loan repayment and actuarial datasets.</p>
</div>
</div>

---
layout: default
---

<!-- SLIDE 10: Thank You -->
<div class="header-bar">
<span>AgriFinance AI</span>
</div>

<div class="slide-body flex flex-col justify-center items-center p-6 text-center">
<div class="bg-brand-blue w-full py-8 rounded-xl shadow-xl mb-6">
<h1 class="text-6xl font-black text-white mb-2 tracking-tighter uppercase">Thank You</h1>
<p class="text-2xl text-orange-400 font-bold uppercase tracking-widest">AgriFinance AI</p>
</div>

<p class="text-lg text-gray-500 italic mb-6">"Planting the seeds for financial inclusion, one farmer at a time."</p>

<div class="bg-white p-6 rounded-xl shadow-xl border-t-8 border-orange-500 w-full max-w-xl mx-auto">
<div class="border-b border-gray-100 pb-4 mb-4 text-center">
<h3 class="text-brand-blue text-xl font-black">Ibrahim Yakubu Ahmad</h3>
<p class="text-brand-orange font-bold uppercase tracking-widest text-xs mt-1">Mai-Gus Software Technology (Maisoft)</p>
</div>
<div class="grid grid-cols-2 gap-4 text-center">
<div>
<p class="text-gray-400 text-xs uppercase font-bold tracking-widest mb-1">Fellow ID</p>
<p class="text-brand-blue font-black font-mono text-lg">FE/23/40137605</p>
</div>
<div>
<p class="text-gray-400 text-xs uppercase font-bold tracking-widest mb-1">Hackathon Cohort</p>
<p class="text-brand-blue font-black text-lg">NextGen Track</p>
</div>
</div>
</div>
</div>
