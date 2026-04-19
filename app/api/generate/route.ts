import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const OpenAI = (await import("openai")).default;
    const { question, topic, expertise } = await req.json();
    const fields = Object.entries({ question, topic, expertise })
      .filter(([, v]) => v?.trim())
      .map(([k, v]) => `${k}: ${v}`)
      .join("\n");

    const prompt = `You are an expert Quora answer writer. Generate a highly upvoteable answer based on:

${fields}

Format output as:
1. **Credibility Hook** (brief intro establishing your authority on the topic)
2. **Main Answer** (structured, clear, 300-500 words, with numbered lists or subheadings where helpful)
3. **Supporting Evidence** (data points, examples, or references)
4. **Closing Takeaway** (key actionable insight or summary)
5. **Answer Tips** (why this will get upvoted — formatting, length advice)

Rules:
- Write like a knowledgeable friend, not a robot
- Use formatting: bold key phrases, numbered lists, paragraph breaks
- Address the question directly first, then expand
- Expertise level: ${expertise || "Intermediate"}
- Add 2-3 relevant credentials/experiences naturally`;

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      baseURL: "https://api.deepseek.com/v1",
    });

    const completion = await client.chat.completions.create({
      model: "deepseek-chat",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.8,
      max_tokens: 800,
    });

    return NextResponse.json({ result: completion.choices[0].message.content });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
