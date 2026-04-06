import { NextRequest, NextResponse } from 'next/server';

// Claude API Concept Personalization endpoint
export async function POST(request: NextRequest) {
  const { bookTitle, conceptName, conceptDescription, userContext } = await request.json();

  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    return NextResponse.json({
      personalizedExplanation: conceptDescription,
      example: 'Connect the Claude API to get personalized explanations tailored to your specific situation.',
    });
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 512,
        system: `You are explaining a concept from "${bookTitle}" to someone. Never quote the book. Use your own words and original examples. Personalize for their context.

Return JSON:
{
  "personalizedExplanation": "2-3 sentence explanation tailored to their situation",
  "example": "A specific real-world example for their context",
  "actionStep": "One immediate thing they can do"
}`,
        messages: [
          {
            role: 'user',
            content: `Concept: ${conceptName} — ${conceptDescription}\n\nMy context: ${userContext || 'General learner'}`,
          },
        ],
      }),
    });

    const data = await response.json();
    const text = data.content?.[0]?.text || '{}';
    const jsonMatch = text.match(/\{[\s\S]*\}/);

    if (jsonMatch) {
      return NextResponse.json(JSON.parse(jsonMatch[0]));
    }

    return NextResponse.json({ personalizedExplanation: conceptDescription });
  } catch {
    return NextResponse.json(
      { error: 'Failed to personalize concept' },
      { status: 500 }
    );
  }
}
