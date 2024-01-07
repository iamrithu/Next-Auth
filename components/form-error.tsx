"use client";

import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

interface formErrorProps {
  message?: string;
}

const FormError = ({ message }: formErrorProps) => {
  if (!message) return null;
  return (
    <div className="bg-destructive/15 p-3 w-full rounded-md flex  gap-x-2 items-center text-destructive ">
      <ExclamationTriangleIcon className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
};

export default FormError;
