

import { auth } from "@/auth";
import SettingsForm from "@/components/SettingsForm";
import { prisma } from "@/db";
//import { Button, TextArea, TextField } from "@radix-ui/themes";
//import { CloudUploadIcon } from "lucide-react";
import { redirect } from "next/navigation";

export default async function SettingsPage() {

    const session = await auth();

    if (!session?.user?.email) {
        return 'not logged in';
    }

    if (!session?.user?.email) {
        redirect('/login');
    }

    const profile = await prisma.profile.findFirst({ where: { email: session?.user?.email as string } });

    if (!profile) {
        return <div>Profile not found</div>;
    }

    return (
        <div className="max-w-md mx-auto  justify-center">
            <h1 className="text-2xl font-bold mb-4 text-center">Profile Settings</h1>
            <SettingsForm
                profile={profile}
                userEmail={session.user.email}
            />
        </div>
    )
}