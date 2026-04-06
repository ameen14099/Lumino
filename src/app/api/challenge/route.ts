import { NextRequest, NextResponse } from 'next/server';

// Claude API Challenge Generation endpoint
export async function POST(request: NextRequest) {
  const { bookTitle, conceptName, conceptDescription, difficulty, userContext } = await request.json();

  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    return NextResponse.json({
      error: 'API key not configured. Using pre-generated challenges.',
    }, { status: 200 });
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
        max_tokens: 1024,
        system: `Generate quiz questions about the concept "${conceptName}" from "${bookTitle}". Never quote the book. Use your own words. Difficulty: ${difficulty}/5. ${userContext ? `User context: ${userContext}` : ''}

Return valid JSON with this structure:
{
  "questions": [
    {
      "type": "multiple_choice" | "scenario",
      "question": "...",
      "options": ["A", "B", "C", "D"],
      "correctAnswer": 0,
      "explanation": "...",
      "xpReward": 15
    }
  ]
}`,
        messages: [
          {
            role: 'user',
            content: `Generate 3 quiz questions about: ${conceptName} — ${conceptDescription}`,
          },
        ],
      }),
    });

    const data = await response.json();
    const text = data.content?.[0]?.text || '{}';

    // Parse the JSON from the response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return NextResponse.json(JSON.parse(jsonMatch[0]));
    }

    return NextResponse.json({ questions: [] });
  } catch {
    return NextResponse.json(
      { error: 'Failed to generate challenges' },
      { status: 500 }
    );
  }
}
