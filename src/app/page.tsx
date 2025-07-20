import { redirect } from "next/navigation";
import { HydrateClient } from "~/trpc/server";

export default async function Home() {
  return (
    <HydrateClient>
      <RedirectToSales />
    </HydrateClient>
  );
}
const RedirectToSales = () => {
  redirect("/sales");
};
