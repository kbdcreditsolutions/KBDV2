
import dotenv from 'dotenv';
dotenv.config();

async function main() {
    const key = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    if (!key) {
        console.error("No API Key");
        return;
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${key}`;
    console.log("Requesting models from:", url.replace(key, "HIDDEN_KEY"));

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
            console.error("❌ API Error:", response.status, response.statusText);
            console.error("Details:", JSON.stringify(data, null, 2));
        } else {
            console.log("✅ Models found:");
            if (data.models) {
                data.models.forEach((m: any) => console.log(`- ${m.name} (${m.displayName})`));
            } else {
                console.log("No models returned?", data);
            }
        }
    } catch (err: any) {
        console.error("❌ Network Error:", err.message);
    }
}

main();
