import { GoogleGenerativeAI } from '@google/generative-ai';
import { buildExplainPrompt } from '@/lib/prompts';

// Initialize Gemini with the API key from environment variables
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(request) {
  try {
    const { rankedMandis, farmerProfile } = await request.json();

    if (!rankedMandis || !farmerProfile) {
      return Response.json({ error: 'Missing market data or profile.' }, { status: 400 });
    }

    // Configure the specific model we want to use (fast, reliable)
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash',
      generationConfig: {
        temperature: 0.4, // Keep it deterministic and factual
        maxOutputTokens: 400
      },
      systemInstruction: `You are KisanMitra, a trusted farm advisor for Maharashtra farmers.
You ONLY use the numbers given to you in the prompt. Never invent prices, distances, or costs.
Reply in simple, friendly, respectful language. Max 5 short sentences. Do not use complex jargon.
Directly address the farmer. Be highly specific about the cost savings.`,
    });

    const prompt = buildExplainPrompt(rankedMandis, farmerProfile);

    // Call Gemini API
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    return Response.json({ explanation: text });

  } catch (error) {
    console.error('Gemini API error:', error);
    return Response.json(
      { error: 'AI explanation failed. This might be due to a missing or invalid API key, or networking issues. Please try again.' },
      { status: 500 }
    );
  }
}
