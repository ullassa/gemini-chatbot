export async function POST(req) {
  const { text } = await req.json();

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text }] }],
      }),
    }
  );

  const data = await response.json();
  const answer = data.candidates?.[0]?.content?.parts?.[0]?.text || '❌ No reply';

  return Response.json({ response: answer });
}
