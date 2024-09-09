import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChatsContext } from "@/contexts/chatscontext";
import { UserContext } from "@/contexts/usercontext";
import { cn } from "@/lib/utils";
import { Chat } from "@/models/chat";
import { useChat } from "ai/react";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import ReactTextareaAutosize from "react-textarea-autosize";

type FormSchema = {
    name: string;
    level: string;
    frequency: number;
    medicalConditions: string;
    personalPreferences: string;
    goal: string;
}

type DrawerCreateChatProps = {
    setIsOpen: (isOpen: boolean) => void;
}

export default function FormCreateChat({ setIsOpen }: DrawerCreateChatProps) {
    const form = useForm<FormSchema>();
    const { addChat, reloadChats } = useContext(ChatsContext);
    const { getUser } = useContext(UserContext);
    const router = useRouter();

    const handleCreateChat = async (data: FormSchema) => {
        const newChat: Chat = {
            id: Math.random().toString(36).substr(2, 9),
            name: data.name,
            level: data.level,
            frequency: data.frequency,
            medicalConditions: data.medicalConditions,
            personalPreferences: data.personalPreferences,
            goal: data.goal,
            messages: []
        }

        addChat(newChat);
        router.push(`/chat/${newChat.id}`);
        reloadChats();
        setIsOpen(false);
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleCreateChat)} className="w-full space-y-3">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field, fieldState }) => (
                        <FormItem>
                            <FormLabel>Nome do Chat*</FormLabel>
                            <FormControl>
                                <Input autoFocus={false} required {...field} />
                            </FormControl>
                            <FormDescription className={cn({ "text-red-600": fieldState.error?.message })}>
                                {fieldState.error?.message ? fieldState.error.message : "Informe um nome para identificar este chat."}
                            </FormDescription>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="level"
                    render={({ field, fieldState }) => (
                        <FormItem>
                            <FormLabel>Nível de Condicionamento Físico*</FormLabel>
                            <FormControl>
                                <Select required value={field.value} onValueChange={field.onChange}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="beginner">Iniciante</SelectItem>
                                            <SelectItem value="intermediate">Intermediário</SelectItem>
                                            <SelectItem value="advanced">Avançado</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormDescription className={cn({ "text-red-600": fieldState.error?.message })}>
                                {fieldState.error?.message ? fieldState.error.message : "Selecione o seu nível de condicionamento físico."}
                            </FormDescription>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="frequency"
                    render={({ field, fieldState }) => (
                        <FormItem>
                            <FormLabel>Frequência de Treinamento*</FormLabel>
                            <FormControl>
                                <Select required onValueChange={e => field.onChange(parseInt(e))}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="1">1</SelectItem>
                                            <SelectItem value="2">2</SelectItem>
                                            <SelectItem value="3">3</SelectItem>
                                            <SelectItem value="4">4</SelectItem>
                                            <SelectItem value="5">5</SelectItem>
                                            <SelectItem value="6">6</SelectItem>
                                            <SelectItem value="7">7</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormDescription className={cn({ "text-red-600": fieldState.error?.message })}>
                                {fieldState.error?.message ? fieldState.error.message : "Indique quantas vezes por semana você treina."}
                            </FormDescription>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="medicalConditions"
                    render={({ field, fieldState }) => (
                        <FormItem>
                            <FormLabel>Condições Médicas ou Restrições</FormLabel>
                            <FormControl>
                                <ReactTextareaAutosize
                                    {...field}
                                    minRows={1}
                                    maxRows={10}
                                    className="border-input px-5 py-5 text-sm shadow-sm placeholder-text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 w-full border rounded-md resize-none"
                                />
                            </FormControl>
                            <FormDescription className={cn({ "text-red-600": fieldState.error?.message })}>
                                {fieldState.error?.message ? fieldState.error.message : "Informe qualquer condição médica ou restrição que devemos estar cientes."}
                            </FormDescription>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="personalPreferences"
                    render={({ field, fieldState }) => (
                        <FormItem>
                            <FormLabel>Preferências Pessoais</FormLabel>
                            <FormControl>
                                <ReactTextareaAutosize
                                    {...field}
                                    minRows={1}
                                    maxRows={10}
                                    className="border-input px-5 py-5 text-sm shadow-sm placeholder-text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 w-full border rounded-md resize-none"
                                />
                            </FormControl>
                            <FormDescription className={cn({ "text-red-600": fieldState.error?.message })}>
                                {fieldState.error?.message ? fieldState.error.message : "Compartilhe qualquer preferência pessoal que gostaria que soubéssemos."}
                            </FormDescription>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="goal"
                    render={({ field, fieldState }) => (
                        <FormItem>
                            <FormLabel>Objetivo</FormLabel>
                            <FormControl>
                                <ReactTextareaAutosize
                                    {...field}
                                    minRows={1}
                                    maxRows={10}
                                    className="border-input px-5 py-5 text-sm shadow-sm placeholder-text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 w-full border rounded-md resize-none"
                                />
                            </FormControl>
                            <FormDescription className={cn({ "text-red-600": fieldState.error?.message })}>
                                {fieldState.error?.message ? fieldState.error.message : "Compartilhe o seu objetivo com o treinamento."}
                            </FormDescription>
                        </FormItem>
                    )}
                />

                <DialogFooter>
                    <Button type="submit">Enviar</Button>
                </DialogFooter>
            </form>
        </Form>

    )
}