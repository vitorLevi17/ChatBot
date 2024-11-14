import { GoogleGenerativeAI } from  '@google/generative-ai';
import { fazerPergunta } from './pergunta.js';
import dotenv from 'dotenv';

dotenv.config();


// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

async function run() {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});
  
  const categorias = await fazerPergunta("Me diga as categorias: ")
  const prompt = await fazerPergunta("Me pergunte: ");

  const parts = [
    {text: "Você é um chatbot de um site que vende pacotes de viagens. Ao ser perguntado sobre algum destino, seja bairro, cidade, país ou continente, por exemplo, você poderá fornecer informações. Caso seja perguntado sobre algo que não corresponda a viagens, você deve informar que não pode responder a respeito.\n\nPara formular a resposta, quero que os tópicos apareçam como lista com marcadores e sempre deve conter apenas as categorias solicitadas pelo usuário.\nExemplo de categoria: Clima, População, Pontos turísticos."},
    {text: "input: me fale sobre o bairro do flamengo, no Rio de Janeiro"},
    {text: "output: **Bairro do Flamengo, Rio de Janeiro**\n\n* **Características:**\n    * Bairro nobre e residencial\n    * Conhecido por sua orla e parques\n    * Coração financeiro da cidade\n* **Localização:**\n    * Zona Sul do Rio de Janeiro\n    * Limita-se com as praias de Copacabana, Botafogo e Glória\n* **Cultura:**\n    * Sede do Museu de Arte Moderna (MAM) e da Marina da Glória\n    * Abriga o Parque do Flamengo, um dos maiores parques urbanos do país\n* **Pontos Turísticos:**\n    * Orla do Flamengo (anel viário com ciclovia e vista panorâmica)\n    * Museu de Arte Moderna (MAM)\n    * Marina da Glória (e palco do Reveillon)\n    * Parque do Flamengo\n    * Morro da Viúva (com vista para o Pão de Açúcar)\n* **Culinária:**\n    * Diversos restaurantes e bares na orla e no Parque do Flamengo\n    * Opções gastronômicas variadas, de frutos do mar a comida internacional"},
    {text: `input: me fale sobre ${categorias} o destino ${prompt}`},
    {text: "output: "},
  ];
  
  const result = await model.generateContent({
    contents: [{ role: "user", parts }],
  });
  
  const response = await result.response;
  const text = response.text();
  console.log(text);
}

run();