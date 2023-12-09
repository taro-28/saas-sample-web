"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { useFormState, useFormStatus } from "react-dom";
import { createTodo } from "./create";

export const CreateTodoForm = () => {
  const [{ message }, action] = useFormState(createTodo, { message: "" });
  const { pending } = useFormStatus();
  return (
    <form action={action}>
      <div className="flex space-x-2">
        <Input name="content" required />
        <Button disabled={pending}>
          <Plus className="mr-1 h-4 w-4" />
          Add
        </Button>
      </div>
      {message && <p className="text-red-500">{message}</p>}
    </form>
  );
};
