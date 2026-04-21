import { google } from '@ai-sdk/google';
import { streamText } from 'ai';
import { chatbotKnowledge } from '@/lib/chatbot-knowledge';

export async function POST(req: Request) {
    try {
        if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
            return new Response(JSON.stringify({ 
                error: 'Configuration Error', 
                details: 'GOOGLE_GENERATIVE_AI_API_KEY is missing. Please add it to your environment variables.' 
            }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const { messages } = await req.json();

        const result = await streamText({
            model: google('gemini-2.0-flash'),
            system: chatbotKnowledge,
            messages,
        });

        return result.toDataStreamResponse();
    } catch (error) {
        console.error('Chat API error:', error);
        return new Response(JSON.stringify({ 
            error: 'Failed to process message', 
            details: String(error) 
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
