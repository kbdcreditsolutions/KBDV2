import { streamText, convertToModelMessages, createUIMessageStreamResponse, createUIMessageStream, UIMessage } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { chatbotKnowledge } from '@/lib/chatbot-knowledge';

// Create a Google Generative AI provider instance
const google = createGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});

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

        const { messages }: { messages: UIMessage[] } = await req.json();

        const modelMessages = await convertToModelMessages(messages);

        const result = streamText({
            model: google('gemini-2.0-flash'),
            system: chatbotKnowledge,
            messages: modelMessages,
        });

        const stream = createUIMessageStream({
            execute: async ({ writer }) => {
                writer.merge(result.toUIMessageStream());
            },
        });

        return createUIMessageStreamResponse({ stream });
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
