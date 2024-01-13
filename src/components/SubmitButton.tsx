"use client";

import { Button } from "@/components/ui/button";
import type { ComponentPropsWithoutRef } from "react";
import { useFormStatus } from "react-dom";

type Props = Omit<ComponentPropsWithoutRef<typeof Button>, "type">;

export const SubmitButton = ({ disabled, ...props }: Props) => {
  const { pending } = useFormStatus();
  return <Button {...props} type="submit" disabled={disabled || pending} />;
};
