import { auth } from "@/auth";
import { prisma } from "@/db";
import { Button, TextArea, TextField } from "@radix-ui/themes";
import { console } from "inspector";
import { CloudUploadIcon } from "lucide-react";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
    const session = await auth();
    return (
        <div className="max-w-md mx-auto  justify-center">
            <h1 className="text-2xl font-bold mb-4 text-center">Profile Settings</h1>
            <form action={async (data: FormData) => {
                'use server';
                console.log(data)
                await prisma.profile.upsert({
                    where: {
                        email: session?.user?.email || '',
                    },
                    update: {
                        username: data.get('username') as string,
                    },
                    create: {
                        email: session?.user?.email || '',
                        username: data.get('username') as string,
                    },
                });
                redirect('/profile')
            }}>

                <div className="flex gap-2 items-center">
                    <div>

                        <div className="bg-gray-400 size-24 rounded-full"></div>

                    </div>
                    <div>
                        <Button variant="soft">
                            <CloudUploadIcon />
                            Change Avatar
                        </Button>
                    </div>
                </div>

                <p className="mt-2 font-bold">username</p>
                <TextField.Root name="username" placeholder="your username" />
                <p className="mt-2 font-bold">bio</p>
                <TextArea />
                <div className="mt-4 flex justify-center">
                    <Button variant="solid">Save settings</Button>
                </div>

            </form>
        </div>
    )
}