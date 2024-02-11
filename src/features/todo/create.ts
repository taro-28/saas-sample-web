"use server";

import { getGqlClient } from "@/functions/gqlRequest";
import { graphql } from "@/gql";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const doc = graphql(`
mutation createTodo($input: CreateTodoInput!) {
  createTodo(input: $input) {
    id
    content
  }
}
`);

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

  await (await getGqlClient()).request(doc, {
    input: {
      content: validatedFields.data.content,
      categoryId: validatedFields.data.category || null,
    },
  });

  revalidatePath("/");
  return { message: "" };
}
