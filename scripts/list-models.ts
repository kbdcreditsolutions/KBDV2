import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

async function main() {
    console.log("Checking Google API Key...");
    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
        console.error("❌ GOOGLE_GENERATIVE_AI_API_KEY is missing!");
        return;
    }
    console.log("Key exists (length: " + process.env.GOOGLE_GENERATIVE_AI_API_KEY.length + ")");

    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY);

    try {
        console.log("Testing 'gemini-1.5-flash'...");
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        await model.generateContent("Hello");
        console.log("✅ Success!");
    } catch (error: any) {
        console.error("❌ Failed!");
        console.error("Message:", error.message);
        if (error.message.includes("location is not supported")) {
            console.error("🚨 CRITICAL: Google Gemini is not available in your country/region.");
        }
    }
}

main();
