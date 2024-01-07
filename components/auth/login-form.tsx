import React from "react";
import CardWrapper from "./card-wrapper";

const Loginform = () => {
  return (
    <CardWrapper
      headerLabel="Welcome Back 😃"
      backButtonlabel="Don't have an account"
      backButtonHref="/auth/register"
      showSocial>
      Login Card
    </CardWrapper>
  );
};

export default Loginform;
