"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signIn } from "../actions";
import { useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export const signInSchema = z.object({
  email: z
    .string({ required_error: "Email обязателен к заполнению" })
    .email({ message: "Некорректный Email" }),
  password: z
    .string({ required_error: "Пароль обязателен к заполнению" })
    .min(8, { message: "Пароль должен содержать не менее 8 символов" })
});

const initialState = {
  data: null,
  message: null,
  error: null
};

export const SignInForm = () => {
  const router = useRouter();
  const [formState, formAction] = useFormState(signIn, initialState);

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  useEffect(() => {
    if (formState?.data?.accessToken) {
      router.push("/dashboard");
    }
  }, [formState]);

  const onSubmit = (values: z.infer<typeof signInSchema>) => {
    const formData = new FormData();

    formData.append("email", values.email);
    formData.append("password", values.password);

    formAction(formData);
  };

  return (
    <Form {...form}>
      <form
        action={formAction}
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Введите почту"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Пароль</FormLabel>
              <FormControl>
                <Input
                  placeholder="Введите пароль"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full"
        >
          Войти
        </Button>
      </form>
    </Form>
  );
};
