"use server";
import { gqlRequest } from "@/functions/gqlRequest";
import { revalidatePath } from "next/cache";

export const deleteTodo = async (id: string) => {
  await gqlRequest({
    query: `mutation {deleteTodo(id: "${id}")}`,
  });

  revalidatePath("/");
};
