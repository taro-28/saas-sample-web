import { Card } from "@/components/Card";
import { PageTitle } from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TODO } from "@/features/todo";
import { gqlRequest } from "@/functions/gqlRequest";
import { ComponentPropsWithoutRef } from "react";
import { z } from "zod";
import { columns } from "./columns";
import { DataTable } from "./data-table";

const todos: ComponentPropsWithoutRef<typeof Card>[] = [
  {
    title: "biomeをやめる",
    content: "eslintやprettierのプラグインが使えないので",
  },
  {
    title: "バンドルサイズの計測",
    content: "prで見えるようにする",
  },
  {
    title: "dbを使う",
    content: "planet scaleでいいかな",
  },
  {
    title: "todo画面を作る",
    content: "db連携が終わったら（依存関係の作れるtodoアプリ面白そう）",
  },
  {
    title: "terraform化",
    content: "",
  },
  {
    title: "clerkのアイコンを消す",
    content: "",
  },
  {
    title: "独自ドメインを使う",
    content: "",
  },
  {
    title: "apiのe2eテストを書く",
    content: "ciも",
  },
  {
    title: "story bookを使う",
    content: "",
  },
];

const schema = z.object({
  content: z.string().min(1),
});

export default async function Home() {
  const { data } = (await gqlRequest({
    query: "query {todos {id content}}",
  })) as { data: { todos: TODO[] } };

  async function create(formData: FormData) {
    "use server";

    const validatedFields = schema.safeParse({
      content: formData.get("content"),
    });

    // Return early if the form data is invalid
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }

    console.log(
      validatedFields.data.content,
      `mutation createTodo {
      createTodo(input: {content: ${validatedFields.data.content}}) {
        id
      }
    }`
    );
    await gqlRequest({
      query: `mutation createTodo {
        createTodo(input: {content: "${validatedFields.data.content}"}) {
          id
        }
      }`,
    });

    return "";
  }

  return (
    <div className="w-full space-y-4">
      <PageTitle>Todo</PageTitle>
      <form action={create} className="flex space-x-2">
        <Input name="content" />
        <Button>Create</Button>
      </form>

      <DataTable columns={columns} data={data.todos} />
    </div>
  );
}
