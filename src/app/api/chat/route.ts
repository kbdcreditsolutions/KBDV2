
import { streamText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { chatbotKnowledge } from '@/lib/chatbot-knowledge';

// Create an OpenAI provider instance
const openai = createOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();

        const result = streamText({
            model: openai('gpt-4o-mini'),
            system: chatbotKnowledge,
            messages,
        });

        return result.toTextStreamResponse();
    } catch (error) {
        console.error('Chat API error:', error);
        return new Response(JSON.stringify({ error: 'Failed to process message' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
