import { Card } from "@/components/Card";
import { PageTitle } from "@/components/PageTitle";
import { TODO } from "@/features/todo";
import { gqlRequest } from "@/functions/gqlRequest";
import { ComponentPropsWithoutRef } from "react";
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

export default async function Home() {
  const { data } = (await gqlRequest({
    query: "query {todos {id text}}",
  })) as { data: { todos: TODO[] } };
  return (
    <div className="w-full space-y-4">
      <PageTitle>Todo</PageTitle>
      <DataTable columns={columns} data={data.todos} />
    </div>
  );
}
