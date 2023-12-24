"use client";

import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import { CreateTodoFormCategoryFragment } from "@/gql/generated";
import { Plus } from "lucide-react";
import { useMemo, useRef } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { createTodo } from "./create";

/* GraphQL */ `
fragment CreateTodoFormCategory on Category {
  id
  name
  createdAt
}
`;

type Props = {
  categories: CreateTodoFormCategoryFragment[];
};

export const CreateTodoForm = ({ categories }: Props) => {
  const [{ message }, action] = useFormState(createTodo, { message: "" });
  const { pending } = useFormStatus();
  const formRef = useRef<HTMLFormElement>(null);

  const categoryOptions = useMemo(
    () =>
      categories
        .map(({ id, name }) => ({
          value: id,
          label: name,
        }))
        .sort((a, b) => a.label.localeCompare(b.label)),
    [categories],
  );

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
        <Combobox name="category" options={categoryOptions} />
        <Button disabled={pending}>
          <Plus className="mr-1 h-4 w-4" />
          Add
        </Button>
      </div>
      {message && <p className="text-red-500">{message}</p>}
    </form>
  );
};
