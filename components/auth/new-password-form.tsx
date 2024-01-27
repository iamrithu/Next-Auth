"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { NewPasswordSchema } from "@/schemas";

import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField,
} from "@/components/ui/form";

import CardWrapper from "./card-wrapper";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import FormError from "../form-error";
import FormSuccess from "../form-success";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { newPassword } from "@/actions/new-password";

const NewPasswordForm = () => {
  const searchPrams = useSearchParams();
  const token = searchPrams.get("token");
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    setError("");
    setSuccess("");
    newPassword(values, token).then((value) => {
      setError(value?.error);
      //Will do after 2F auth setup.
      setSuccess(value?.success);
    });
  };
  return (
    <CardWrapper
      headerLabel="Enter a new password!"
      backButtonlabel="Back to login"
      backButtonHref="/auth/login"
      showSocial={false}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" placeholder="******" />
                    </FormControl>
                  </FormItem>
                );
              }}
            />

            <FormError message={error} />
            <FormSuccess message={success} />
            <Button type="submit" className="w-full">
              Reset Password
            </Button>
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default NewPasswordForm;
