
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateText } from 'ai';
import dotenv from 'dotenv';
dotenv.config();

async function main() {
    console.log("Checking Google API Key...");
    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
        console.error("❌ GOOGLE_GENERATIVE_AI_API_KEY is missing!");
        return;
    }
    console.log("Key exists (length: " + process.env.GOOGLE_GENERATIVE_AI_API_KEY.length + ")");

    const google = createGoogleGenerativeAI({
        apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
    });

    try {
        console.log("Sending request to Google Gemini...");
        const result = await generateText({
            model: google('models/gemini-1.5-flash'),
            prompt: 'Hello, world!',
        });
        console.log("✅ Success! Response:", result.text);
    } catch (error: any) {
        console.error("❌ Google Request Failed!");
        console.error("Error Message:", error.message);
        console.error("Error Cause:", error.cause);
        console.error("Full Error:", JSON.stringify(error, null, 2));
    }
}

main();
