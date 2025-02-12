import { auth, signOut} from "@/auth"
import { ModeToggle } from "@/components/mode-toggle";
import { redirect } from "next/navigation";

export default async function Home() {

  const session = await auth();

  if (!session) {
    redirect('/login')
  }
  
  console.log(session);

  return (
    <div>
      Protected route <br />

      <ModeToggle />

      {session && (
                      <form
                          action={async () => {
                              "use server"
                              await signOut();
                          }}
                      >
                          <button className="border px-3 bg-slate-400"
                              type="submit">Logout
                          </button>
                      </form>
                  )}
    </div>
  );
}
