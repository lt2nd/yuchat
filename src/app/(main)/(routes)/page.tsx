import { auth, signIn, signOut } from "@/auth"

export default async function Home() {

  const session = await auth();

  return (
    <div>
      Protected route <br />

      {session &&(
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

      {!session && (
        <form
        action={async () => {
          "use server"
          await signIn("google")
        }}
      >
        <button className="border px-3 bg-slate-400"
          type="submit">Signin with Google
        </button>
      </form>
    )}

    </div>
  );
}
