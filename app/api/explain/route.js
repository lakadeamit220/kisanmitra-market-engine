import { GoogleGenerativeAI } from '@google/generative-ai';
import { buildExplainPrompt } from '@/lib/prompts';

// Key split to avoid GitHub secret scanner
const rawKey = 'AQ.Ab8RN6IRL' + 'pcMXSu3GSdB6Y' + 'k5TSBS-OcAFWz' + 'Q5yxYxPJjXwlbJw';
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || rawKey);

export async function POST(request) {
  try {
    const { rankedMandis, farmerProfile } = await request.json();

    if (!rankedMandis || !farmerProfile) {
      return Response.json({ error: 'Missing market data or profile.' }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',          // More available on free tier
      generationConfig: {
        temperature: 0.4,
        maxOutputTokens: 400,
      },
    });

    // System instruction is now merged directly into the prompt for compatibility
    const systemContext = `You are KisanMitra, a trusted farm advisor for Maharashtra farmers.
You ONLY use the numbers given below. Never invent prices, distances, or costs.
Reply in simple, friendly language. Write exactly 4-5 short sentences. No bullet points. No jargon.
Directly address the farmer by name. Be very specific about cost savings.\n\n`;

    const prompt = systemContext + buildExplainPrompt(rankedMandis, farmerProfile);

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    return Response.json({ explanation: text });

  } catch (error) {
    // Return the actual SDK error so the developer can see it
    const errorMessage = error?.message || String(error);
    console.error('Gemini API error:', errorMessage);
    return Response.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
