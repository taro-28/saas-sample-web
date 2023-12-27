"use client";

import { SubmitButton } from "@/components/SubmitButton";
import { Input } from "@/components/ui/input";
import { CreateTodoFormFragment } from "@/gql/generated";
import { Plus } from "lucide-react";
import { useRef, useState } from "react";
import { useFormState } from "react-dom";
import { CategoryCombobox } from "../category/combobox";
import { createTodo } from "./create";

/* GraphQL */ `
fragment CreateTodoForm on Query {
  ...CategoryCombobox
}
`;

type Props = CreateTodoFormFragment;

export const CreateTodoForm = ({ categories }: Props) => {
  const [{ message }, action] = useFormState(createTodo, {
    message: "",
  });
  const formRef = useRef<HTMLFormElement>(null);

  const [categoryValue, setCategoryValue] = useState("");

  return (
    <form
      action={async (formData) => {
        await action(formData);
        formRef.current?.reset();
      }}
      ref={formRef}
    >
      <div className="flex space-x-2">
        <Input
          name="content"
          placeholder="What needs to be done?"
          required={true}
        />
        <CategoryCombobox
          name="category"
          categories={categories}
          value={categoryValue}
          onChange={setCategoryValue}
        />
        <SubmitButton>
          <Plus className="mr-1 h-4 w-4" />
          Add
        </SubmitButton>
      </div>
      {message && <p className="text-red-500">{message}</p>}
    </form>
  );
};
