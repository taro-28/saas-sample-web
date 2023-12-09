"use server";
import { gqlRequest } from "@/functions/gqlRequest";
import { revalidatePath } from "next/cache";

export const toggleTodoDone = async (id: string, done: boolean) => {
  await gqlRequest({
    query: `mutation {updateTodo(input: { id: "${id}", done: ${done} }){ id }}`,
  });

  revalidatePath("/");
};
