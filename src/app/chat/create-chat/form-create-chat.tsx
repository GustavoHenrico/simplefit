import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChatsContext } from "@/contexts/chatscontext";
import { cn } from "@/lib/utils";
import { Chat } from "@/models/chat";
import { useRouter } from "next/navigation";
import { useContext } from "react";
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
        setIsOpen(false);
        reloadChats();
    }
    return (
        <Form {...form}>
            <div className="flex flex-col w-full h-full overflow-auto p-3">
                <form onSubmit={form.handleSubmit(handleCreateChat)} className="w-full space-y-3">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field, fieldState }) => (
                            <FormItem>
                                <FormLabel>Chat Name*</FormLabel>
                                <FormControl>
                                    <Input autoFocus={false} required {...field} />
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
            </div>
        </Form>
    )
}