"use client";

import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Header } from "./Header";
import { SocialLogin } from "./SocialLogin";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLable: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocialLogin?: boolean;
}

export const CardWrapper = ({
  children,
  headerLable,
  backButtonLabel,
  backButtonHref,
  showSocialLogin,
}: CardWrapperProps) => {
  return (
    <Card className="w-[25rem] shadow-md">
      <CardHeader>
        <Header label={headerLable} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>{showSocialLogin && <SocialLogin />}</CardFooter>
    </Card>
  );
};
