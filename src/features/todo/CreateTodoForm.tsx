"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFormState, useFormStatus } from "react-dom";
import { createTodo } from "./createTodo";

export const CreateTodoForm = () => {
  const [{ message }, action] = useFormState(createTodo, { message: "" });
  const { pending } = useFormStatus();
  return (
    <form action={action}>
      <div className="flex space-x-2">
        <Input name="content" required />
        <Button disabled={pending}>Create</Button>
      </div>
      {message && <p className="text-red-500">{message}</p>}
    </form>
  );
};
