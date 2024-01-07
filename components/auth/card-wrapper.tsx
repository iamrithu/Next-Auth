import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import Header from "@/components/auth/header";
import Social from "@/components/auth//social";
import BackButton from "@/components/auth/back-button";
interface cardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonlabel: string;
  backButtonHref: string;
  showSocial: Boolean;
}
const CardWrapper = ({
  children,
  headerLabel,
  backButtonHref,
  backButtonlabel,
  showSocial,
}: cardWrapperProps) => {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
      <CardFooter>
        <BackButton label={backButtonlabel} href={backButtonHref} />
      </CardFooter>
    </Card>
  );
};

export default CardWrapper;
