import { IMessages } from "@/app/dashboard/ai-assistant/page";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY!;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

export const userRequestFromFrontend = (userMessages: IMessages) => {
//   let prompt = `f"""The user is reporting: ${JSON.stringify(userMessages[0])}.
// Here is the previous conversation history: ${JSON.stringify(
//     userMessages.slice(1)
//   )} (if applicable).


// """`;
let prompt = JSON.stringify(userMessages);

  return prompt;
};

async function aiHelper(userInput: string) {
  const chatSession = model.startChat({
    generationConfig,
  });

  const result = await chatSession.sendMessage(userInput);

  return result.response.text();
}

export default aiHelper;
