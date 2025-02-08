import { auth} from "@/auth"
import { ModeToggle } from "@/components/mode-toggle";
import { redirect } from "next/navigation";

export default async function Home() {

  const session = await auth();

  if (!session) {
    redirect('/login')
  }

  return (
    <div>
      Protected route <br />

      <ModeToggle />
    </div>
  );
}
