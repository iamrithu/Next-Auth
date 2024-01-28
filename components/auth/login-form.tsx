"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { LoginSchema } from "@/schemas";

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
import { login } from "@/actions/login";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const Loginform = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [showTwoFactor, setShowTwoFactor] = useState(false);

  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with different provider!"
      : "";

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
      code: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");
    login(values)
      .then((value) => {
        if (value?.error) {
          setError(value?.error);
        }
        if (value?.success) {
          form.reset();
          setSuccess(value?.success);
        }
        if (value?.twoFactor) {
          setError("");
          setSuccess("");
          setShowTwoFactor(true);
        }
      })
      .catch((error) => {
        setError("Something went wrong");
      });
  };
  return (
    <CardWrapper
      headerLabel="Welcome Back 😃"
      backButtonlabel={showTwoFactor ? "" : "Don't have an account"}
      backButtonHref={showTwoFactor ? "" : "/auth/register"}
      showSocial={!showTwoFactor}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            {!showTwoFactor && (
              <>
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
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="password"
                            placeholder="******"
                          />
                        </FormControl>

                        <FormMessage />
                        <Button
                          variant="link"
                          asChild
                          size={"sm"}
                          className="px-0 font-normal">
                          <Link href="/auth/reset">Forgot password?</Link>
                        </Button>
                      </FormItem>
                    );
                  }}
                />
              </>
            )}
            {showTwoFactor && (
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Two Factor Code</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="123456" />
                      </FormControl>
                    </FormItem>
                  );
                }}
              />
            )}
            <FormError message={error || urlError} />
            <FormSuccess message={success} />
            <Button type="submit" className="w-full">
              {showTwoFactor ? "Confirm" : "Login"}
            </Button>
          </div>
        </form>
      </Form>
      {showTwoFactor && (
        <Button
          variant={"link"}
          className="font-normal  px-0"
          onClick={() => {
            setShowTwoFactor(false);
          }}>
          Back
        </Button>
      )}
    </CardWrapper>
  );
};

export default Loginform;
