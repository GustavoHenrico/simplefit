'use client';

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import ReactTextareaAutosize from "react-textarea-autosize";
import { z } from "zod"
import { Chat } from "@/models/chat";
import { useContext, useState } from "react";
import { ChatsContext } from "@/contexts/chatscontext";

type CreateChatProps = {
    children: React.ReactNode;
}

type FormSchema = {
    name: string;
    level: string;
    frequency: number;
    medicalConditions: string;
    personalPreferences: string;
    goal: string;
}


export default function CreateChat({ children }: CreateChatProps) {
    const form = useForm<FormSchema>();
    const [isOpen, setIsOpen] = useState(false);
    const { addChat, reloadChats } = useContext(ChatsContext);

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
        setIsOpen(false);
        reloadChats();
    }

    return (
        <Dialog open={isOpen} onOpenChange={() => { setIsOpen(!isOpen) }}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="w-full h-dvh sm:max-w-2xl overflow-auto bg-white">
                <DialogHeader>
                    <DialogTitle>Create new Chat</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleCreateChat)} className="w-full space-y-3">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field, fieldState }) => (
                                <FormItem>
                                    <FormLabel>Chat Name*</FormLabel>
                                    <FormControl>
                                        <Input required {...field} />
                                    </FormControl>
                                    <FormDescription className={cn({ "text-red-600": fieldState.error?.message })}>
                                        {fieldState.error?.message ? fieldState.error.message : "  Enter the name that will be displayed to other chat participants."}
                                    </FormDescription>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="level"
                            render={({ field, fieldState }) => (
                                <FormItem>
                                    <FormLabel>Fitness Level*</FormLabel>
                                    <FormControl>
                                        <Select required value={field.value} onValueChange={field.onChange}>
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectItem value="beginner">Beginner</SelectItem>
                                                    <SelectItem value="intermediate">Intermediate</SelectItem>
                                                    <SelectItem value="advanced">Advanced</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormDescription className={cn({ "text-red-600": fieldState.error?.message })}>
                                        {fieldState.error?.message ? fieldState.error.message : "Select your fitness level."}
                                    </FormDescription>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="frequency"
                            render={({ field, fieldState }) => (
                                <FormItem>
                                    <FormLabel>Training Frequency*</FormLabel>
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
                                        {fieldState.error?.message ? fieldState.error.message : "Indicate how many times per week you train."}
                                    </FormDescription>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="medicalConditions"
                            render={({ field, fieldState }) => (
                                <FormItem>
                                    <FormLabel>Medical Conditions or Restrictions</FormLabel>
                                    <FormControl>
                                        <ReactTextareaAutosize
                                            {...field}
                                            minRows={1}
                                            maxRows={10}
                                            className="border-input px-5 py-5 text-sm shadow-sm placeholder-text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 w-full border rounded-md resize-none"
                                        />
                                    </FormControl>
                                    <FormDescription className={cn({ "text-red-600": fieldState.error?.message })}>
                                        {fieldState.error?.message ? fieldState.error.message : "Please provide any medical conditions or restrictions that we should be aware of."}
                                    </FormDescription>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="personalPreferences"
                            render={({ field, fieldState }) => (
                                <FormItem>
                                    <FormLabel>Personal Preferences</FormLabel>
                                    <FormControl>
                                        <ReactTextareaAutosize
                                            {...field}
                                            minRows={1}
                                            maxRows={10}
                                            className="border-input px-5 py-5 text-sm shadow-sm placeholder-text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 w-full border rounded-md resize-none"
                                        />
                                    </FormControl>
                                    <FormDescription className={cn({ "text-red-600": fieldState.error?.message })}>
                                        {fieldState.error?.message ? fieldState.error.message : "Share any personal preferences you would like us to know."}
                                    </FormDescription>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="goal"
                            render={({ field, fieldState }) => (
                                <FormItem>
                                    <FormLabel>Objective</FormLabel>
                                    <FormControl>
                                        <ReactTextareaAutosize
                                            {...field}
                                            minRows={1}
                                            maxRows={10}
                                            className="border-input px-5 py-5 text-sm shadow-sm placeholder-text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 w-full border rounded-md resize-none"
                                        />
                                    </FormControl>
                                    <FormDescription className={cn({ "text-red-600": fieldState.error?.message })}>
                                        {fieldState.error?.message ? fieldState.error.message : "Share your goal with training."}
                                    </FormDescription>
                                </FormItem>
                            )}
                        />


                        <DialogFooter>
                            <Button type="submit">Submit</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}