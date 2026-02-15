import { NextResponse } from 'next/server';
import { getLocalResponse } from '@/lib/chatbot-responses';

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();

        // Get the last user message
        const lastUserMessage = messages
            ?.filter((m: { role: string }) => m.role === 'user')
            ?.pop();

        if (!lastUserMessage?.content) {
            return NextResponse.json(
                { error: 'No user message found' },
                { status: 400 }
            );
        }

        // Get response from local knowledge base
        const responseText = getLocalResponse(lastUserMessage.content);

        // Return as a simple JSON response
        return NextResponse.json({
            role: 'assistant',
            content: responseText,
        });
    } catch (error) {
        console.error('Chat API error:', error);
        return NextResponse.json(
            { error: 'Failed to process message' },
            { status: 500 }
        );
    }
}
