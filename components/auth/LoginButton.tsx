"use client";

interface LoginButtonProps {
    children: React.ReactNode;
    mode?: "modal" | "redirect";
    asChild?: boolean;
}
import { useRouter } from 'next/navigation';
import React from 'react'

export const LoginButton = ({
    children,
    mode="redirect",
    asChild,
}: LoginButtonProps) => {
    const router = useRouter()

    const onClick = () => {
        router.push("/auth/login")
    }

    if (mode === "modal") {
        return <span>
            TODO: modal login button
        </span>
    }

  return (
    <span onClick={onClick} className='cursor-pointer'>{children}</span>
  )
}
