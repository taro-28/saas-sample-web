"use server";

import { getGqlClient } from "@/functions/gqlRequest";
import { revalidatePath } from "next/cache";
import { z } from "zod";

/* GraphQL */ `
mutation createTodo($input: CreateTodoInput!) {
  createTodo(input: $input) {
      id
    }
}
`;

const schema = z.object({
  content: z.string().min(1),
  category: z.string(),
});

export async function createTodo(_: unknown, formData: FormData) {
  const validatedFields = schema.safeParse({
    content: formData.get("content"),
    category: formData.get("category"),
  });

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return { message: validatedFields.error.message };
  }

  await (await getGqlClient()).createTodo({
    input: {
      content: validatedFields.data.content,
      categoryId: validatedFields.data.category || null,
    },
  });

  revalidatePath("/");
  return { message: "" };
}
