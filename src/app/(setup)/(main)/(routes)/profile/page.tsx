//'use server'


import { auth, signOut } from "@/auth";
import { prisma } from "@/db";
import { ArrowBigLeftDash, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import defaultAvatar from "../../../../images/defaultAvatar.png";


export default async function ProfilePage() {
    const session = await auth();
    
      if (!session) {
        redirect('/login')
      }

    const profile = await prisma.profile.findUnique({ where: { email: session?.user?.email as string } })
    return (
        <main >
            <section className="flex justify-between items-center">
                <button>
                    <ArrowBigLeftDash />
                </button>
                {/* <div className="font-bold mt-4 flex items-center gap-2">
                    {profile.username}
                </div> */}
                <Link href='/settings'>
                    <Settings />
                </Link>
            </section>
            <section className="mt-8 flex justify-center">
                <div className="size-50 p-2 rounded-full bg-gradient-to-tr from-blue-900 to-blue-200">
                    <div className="size-46 p-2 bg-white rounded-full">
                        <div className="size-40 aspect-square overflow-hidden rounded-full">
                        <Image
                            //className="rounded-full"
                            src={profile?.avatar || defaultAvatar}
                            alt="avatar"
                        />  
                        </div>
                    </div>
                </div>
            </section>
            <section className="text-center mt-4">
                <h1 className="text-xl font-bold">
                    {profile?.username}
                </h1>
                <p className="text-gray-500 mt-1 mb-1">
                    {profile?.bio}
                </p>
            </section>

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

        </main>
    )
}