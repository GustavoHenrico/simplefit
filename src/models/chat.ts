import { Message } from "ai";

export type Chat = {
    id: string;
    name: string;
    level: string;
    frequency: number;
    medicalConditions?: string;
    personalPreferences?: string;
    goal?: string;
    messages: Message[];
}