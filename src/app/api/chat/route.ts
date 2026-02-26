import { streamText } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { chatbotKnowledge } from '@/lib/chatbot-knowledge';

// Create a Google Generative AI provider instance
const google = createGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();

        const result = streamText({
            model: google('gemini-2.0-flash'),
            system: chatbotKnowledge,
            messages,
        });

        return result.toTextStreamResponse();
    } catch (error) {
        console.error('Chat API error:', error);
        if (error instanceof Error) {
            console.error('Error stack:', error.stack);
        }
        return new Response(JSON.stringify({ error: 'Failed to process message', details: String(error) }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
