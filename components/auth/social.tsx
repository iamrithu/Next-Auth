"use client";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";

const Social = () => {
  return (
    <div className="w-full flex space-x-2 items-center">
      <Button variant={"outline"} className="w-full">
        <FcGoogle className="w-5 h-5" />
      </Button>
      <Button variant={"outline"} className="w-full">
        <FaGithub className="w-5 h-5" />
      </Button>
    </div>
  );
};

export default Social;
