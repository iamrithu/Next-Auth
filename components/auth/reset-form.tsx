"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { ResetSchema } from "@/schemas";

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
import { reset } from "@/actions/reset";
import { useState } from "react";

const ResetForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    setError("");
    setSuccess("");
    reset(values).then((value) => {
      setError(value?.error);
      //Will do after 2F auth setup.
      setSuccess(value?.success);
    });
  };
  return (
    <CardWrapper
      headerLabel="Forgot your password"
      backButtonlabel="Back to login"
      backButtonHref="/auth/login"
      showSocial={false}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="username@example.com"
                      />
                    </FormControl>
                  </FormItem>
                );
              }}
            />

            <FormError message={error} />
            <FormSuccess message={success} />
            <Button type="submit" className="w-full">
              Send
            </Button>
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default ResetForm;
