import React from "react";
import { CardWrapper } from "./CardWrapper";

export const LoginForm = () => {
  return (
    <CardWrapper
      headerLable="Welcome back"
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/register"
      showSocialLogin
    >
      Login Form
    </CardWrapper>
  );
};
