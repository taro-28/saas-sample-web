"use server";

import { getGqlClient } from "@/functions/gqlRequest";
import { revalidatePath } from "next/cache";
import { z } from "zod";

/* GraphQL */ `
mutation createTodo($content: String!) {
  createTodo(input: {content: $content}) {
      id
    }
}
`;

const schema = z.object({
  content: z.string().min(1),
});

export async function createTodo(_: unknown, formData: FormData) {
  const validatedFields = schema.safeParse({
    content: formData.get("content"),
  });

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return { message: validatedFields.error.message };
  }

  await (await getGqlClient()).createTodo({
    content: validatedFields.data.content,
  });

  revalidatePath("/");
  return { message: "" };
}
