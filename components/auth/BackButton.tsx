"use client";

import Link from "next/link";
import { Button } from "../ui/button";

interface BackButtonProps {
  href: string;
  lable: string;
}

export const BackButton = ({ href, lable }: BackButtonProps) => {
  return (
    <Button className="w-full font-normal" variant="link" size={"sm"} asChild>
      <Link href={href}>{lable}</Link>
    </Button>
  );
};
