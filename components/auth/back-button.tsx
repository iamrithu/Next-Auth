import { Button } from "@/components/ui/button";
import Link from "next/link";

interface backButtonProps {
  label: string;
  href: string;
}

const BackButton = ({ label, href }: backButtonProps) => {
  return (
    <Button variant={"link"} className="w-full font-normal" size="sm">
      <Link href={href}>{label}</Link>
    </Button>
  );
};

export default BackButton;
