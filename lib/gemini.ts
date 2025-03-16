import { IMessage } from "@/app/dashboard/ai-assistant/page";
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

export const userRequestFromFrontend = (userMessage: any) => {
  console.log(userMessage);
  let prompt = `f""" 
  - see this time you are a finance assistant for my platform 
  - here you have to give advice to user for managing there money 
  - sometime you have to suggest them where they spend money too much like overspending how can they save more whenever user data is shared 
  - if user data like his monthly transactions are not shared you have to ans it normal;y with your experience
  - give me a simple markdown code short message only max word count 200
  - try to keep you responses short but length should be sufficient for the user to understand
  - assume user have zero knowledge related to finance
  - you are interacting directly with the user so assume introductions are done already !
  - here is user response  ${JSON.stringify(userMessage)}
  - transactions shared in indian inr 
  .


"""`;
  // let prompt = JSON.stringify(userMessages);

  return prompt;
};

async function aiHelper(userInput: string) {
  const chatSession = model.startChat({
    generationConfig,
  });

  const result = await chatSession.sendMessage(userInput);

  let finalMessage = result.response.text().split("```markdown")[1]
    ? result.response.text().split("```markdown")[1].split("```")[0]
    : result.response.text();
  return finalMessage;
}

export default aiHelper;
