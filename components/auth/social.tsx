"use client";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

const Social = () => {
  const onclick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };
  return (
    <div className="w-full flex space-x-2 items-center">
      <Button
        variant={"outline"}
        className="w-full"
        onClick={() => onclick("google")}>
        <FcGoogle className="w-5 h-5" />
      </Button>
      <Button
        variant={"outline"}
        className="w-full"
        onClick={() => onclick("github")}>
        <FaGithub className="w-5 h-5" />
      </Button>
    </div>
  );
};

export default Social;
