/* eslint-disable @next/next/no-img-element */

import { auth } from "@/auth";
import { prisma } from "@/db";
import { ArrowBigLeftDash, Settings } from "lucide-react";
import Link from "next/link";


export default async function ProfilePage() {
    const session = await auth();
    const profile = await prisma.profile.findFirstOrThrow({where: {email: session?.user?.email as string}})
    return (
        <main >
            <section className="flex justify-between items-center">
                <button>
                    <ArrowBigLeftDash />
                </button>
                <div className="font-bold">
                    {profile.username}
                </div>
                <Link href='/settings'>
                    <Settings />
                </Link>
            </section>
            <section className="mt-8 flex justify-center">
                <div className="size-50 p-2 rounded-full bg-gradient-to-tr from-blue-900 to-blue-200">
                    <div className="size-46 p-2 bg-white rounded-full">
                        <div className="size-40 aspect-square overflow-hidden rounded-full">
                            <img className=""
                                src="https://t4.ftcdn.net/jpg/04/83/90/95/360_F_483909569_OI4LKNeFgHwvvVju60fejLd9gj43dIcd.jpg" alt=""
                            />
                        </div>
                    </div>
                </div>
            </section>
            <section className="text-center mt-4">
                <h1 className="text-xl font-bold">
                    John
                </h1>
                <p className="text-gray-500 mt-1 mb-1">
                    bio
                </p>
            </section>

        </main>
    )
}