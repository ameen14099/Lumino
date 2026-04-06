import { NextRequest, NextResponse } from 'next/server';

// Claude API Mentor Mode endpoint
// Will be connected when ANTHROPIC_API_KEY is set
export async function POST(request: NextRequest) {
  const { bookTitle, bookAuthor, message, conversationHistory, userContext } = await request.json();

  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    // Return a simulated response when API key isn't configured
    return NextResponse.json({
      response: `I'd love to discuss ${bookTitle} with you! Once the Claude API is connected, I'll be able to have deep, personalized conversations about the book's concepts and how they apply to your specific situation.\n\nFor now, explore the Visual Map and Challenge modes to start learning!`,
    });
  }

  try {
    const systemPrompt = `You are a world-class teacher and mentor discussing the concepts from "${bookTitle}" by ${bookAuthor}.

CRITICAL RULES:
- Never quote or reproduce any text from the book
- Explain all concepts in your own words using original examples
- Personalize explanations to the user's context: ${userContext || 'not provided yet'}
- Focus on teaching the IDEAS, not reproducing the CONTENT
- Be conversational, warm, and encouraging
- Challenge the user's thinking when appropriate
- Connect concepts to practical, real-world applications
- If asked about author debates, take on the perspective authentically

Keep responses focused and under 200 words unless the user asks for depth.`;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1024,
        system: systemPrompt,
        messages: [
          ...conversationHistory.map((msg: { role: string; content: string }) => ({
            role: msg.role,
            content: msg.content,
          })),
          { role: 'user', content: message },
        ],
      }),
    });

    const data = await response.json();

    return NextResponse.json({
      response: data.content?.[0]?.text || 'I apologize, I had trouble generating a response. Please try again.',
    });
  } catch {
    return NextResponse.json(
      { error: 'Failed to generate response' },
      { status: 500 }
    );
  }
}
