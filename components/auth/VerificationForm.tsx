"use client";

import { BarLoader } from "react-spinners";
import { CardWrapper } from "./CardWrapper";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { verification } from "@/actions/verification";
import { FormSuccess } from "./FormSuccess";
import { FormError } from "./FormError";

export const VerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
if ( success || error) return;

    if (!token) {
      setError("Token not found");
      return;
    }
    verification(token)
      .then((result) => {
        setSuccess(result.success);
        setError(result.error);
      })
      .catch((error) => {
        setError("An unexpected error occurred");
      });
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [token, onSubmit]);

  return (
    <CardWrapper
      headerLable="Confirm your verification email"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <div className="flex w-full items-center justify-center">
        {!success && !error && <BarLoader />}
        <FormSuccess message={success} />
        {!success &&  <FormError message={error} />}
      </div>
    </CardWrapper>
  );
};
