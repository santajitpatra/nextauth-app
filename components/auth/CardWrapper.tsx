"use client";

import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { BackButton } from "./BackButton";
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
      {showSocialLogin && 
      <CardFooter>
        {<SocialLogin />}
        </CardFooter>}
      <CardFooter>
        <BackButton href={backButtonHref} lable={backButtonLabel} />
      </CardFooter>
    </Card>
  );
};
