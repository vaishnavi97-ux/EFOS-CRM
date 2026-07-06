const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash"
});

async function generateContent(prompt) {

    try {

        const result = await model.generateContent(prompt);

        const response = result.response;

        return response.text();

    } catch (error) {

        console.error("Gemini Error:", error);

        throw error;

    }

}

module.exports = {
    generateContent
};