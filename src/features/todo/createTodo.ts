"use server";

import { gqlRequest } from "@/functions/gqlRequest";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const schema = z.object({
  content: z.string().min(1),
});

export async function createTodo(prevState: unknown, formData: FormData) {
  const validatedFields = schema.safeParse({
    content: formData.get("content"),
  });

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return { message: validatedFields.error.message };
  }

  await gqlRequest({
    query: `mutation createTodo {
            createTodo(input: {content: "${validatedFields.data.content}"}) {
              id
            }
          }`,
  });

  revalidatePath("/todo");
  return { message: "" };
}
