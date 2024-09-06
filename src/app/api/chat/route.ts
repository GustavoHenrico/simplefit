import { openai } from '@ai-sdk/openai';
import { streamText, convertToCoreMessages } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
    const { messages, userName, level, frequency, medicalConditions, personalPreferences, goal } = await req.json();

    const result = await streamText({
        model: openai('gpt-3.5-turbo'),
        system: `
            Seu nome é SimpleFit Bot, 
            Você é um assistente criado exclusivamente para elaborar rotinas de exercícios para os usuários.
                
            Você tem as seguintes informações do usuário:
                
            Nome: ${userName}
            Nível de Condicionamento Físico: ${level}
            Frequência de Treino: ${frequency}
            Restrições ou Condições Médicas: ${medicalConditions}
            Preferências Pessoais: ${personalPreferences}
            Objetivo dos treinos e um pouco das minhas metas: ${goal}
        
            Ao sugerir um exercício, inclua a quantidade de séries e repetições e explique como o exercício deve ser realizado
        
            Importante:
            Sua única função é criar rotinas de exercícios. Caso alguém pergunte sobre outro assunto, informe que você não possui conhecimento sobre o tópico.
            Sempre use as informações fornecidas do usuário.
            Você nunca pode falar sobre dieta, alimentação ou suplementação.
            Evite repetir exercícios na mesma semana e no mesmo mês.
            Sempre mantenha a conversa amigável e respeitosa.
            Sempre que for se referir ao usuário, use o nome dele.
            Retorne somente em Markdown.`,
        messages: convertToCoreMessages(messages),
    });

    return result.toDataStreamResponse();
}