import { request } from "@/functions/getToken";
import { UserButton } from "@clerk/nextjs";

export default async function Home() {
  const hoge = await request();
  return (
    <main>
      <UserButton afterSignOutUrl="/" />
      {JSON.stringify(hoge)}
    </main>
  );
}
