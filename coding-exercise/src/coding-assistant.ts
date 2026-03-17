// The OpenAI SDK is available if you want to use it.
// Set OPENAI_API_KEY in your .env file (see .env.example).
import OpenAI from "openai";


type OpenAIMessage = {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export async function prompt(text: string): Promise<string> {
  const client = new OpenAI();

  const messages: OpenAIMessage[] = [
    { role: "system", content: "You are assessing clinical note text to decide what CPT codes are relevant." },
    { role: "user", content: text },
  ];

  // https://developers.openai.com/api/docs/guides/text
  const response = await client.responses.create({
    model: "gpt-5-nano",
    input: messages,
  });
  return response.output_text
}
