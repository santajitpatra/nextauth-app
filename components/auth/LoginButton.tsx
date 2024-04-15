"use client";

interface LoginButtonProps {
    children: React.ReactNode;
    mode: "modal" | "redirect";
    asChild: boolean;
}
import React from 'react'

export const LoginButton = ({
    children,
    mode="redirect",
    asChild,
}: LoginButtonProps) => {
    const onClick = () => {
        if (mode === "modal") {
            // TODO: open modal
        } else {
            // TODO: redirect to login page
            console.log("LoginButton: redirecting to login page")
        }
    }
  return (
    <span onClick={onClick} className='cursor-pointer'>{children}</span>
  )
}
