"use client";

import { CheckCircledIcon } from "@radix-ui/react-icons";

interface formSuccessProps {
  message?: string;
}

const FormSuccess = ({ message }: formSuccessProps) => {
  if (!message) return null;

  return (
    <div className="bg-emerald-500/15 p-3 w-full transition ease-in-out duration-1000 ring-2 ring-emerald-500 rounded-md flex  gap-x-2 items-center text-emerald-500 text-sm font-semibold ">
      <CheckCircledIcon className="h-4 w-4 " />
      <p>{message}</p>
    </div>
  );
};

export default FormSuccess;
