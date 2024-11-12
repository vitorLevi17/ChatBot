import { GoogleGenerativeAI } from  '@google/generative-ai';
import { fazerPergunta } from './pergunta.js';
import dotenv from 'dotenv';

dotenv.config();


// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

async function run() {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});

  let prompt = "Voce é um site de viagens e só deve responder sobre esse assunto" + "Caso o usuario pergunte sobre algo diferente, diga que não pode";
  prompt += await fazerPergunta("Me pergunte: ");

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
}

run();