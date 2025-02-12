'use client';

//import { auth } from '@/auth';
//import { prisma } from '@/db';
import { Button, TextArea, TextField } from '@radix-ui/themes';
import { CloudUploadIcon } from 'lucide-react';
import { updateProfile } from './actions';
import { useRouter } from 'next/navigation';
import { Profile } from '@prisma/client';


export default function SettingsForm({ userEmail, profile }: { userEmail: string, profile: Profile }) {
    // const session = await auth();
    const router = useRouter();


    return (
        <div className="max-w-md mx-auto  justify-center">

            <form onSubmit={async (event) => {
                event.preventDefault();
                const formData = new FormData(event.currentTarget);
                await updateProfile(formData, userEmail);
                router.push('/profile');
                router.refresh();
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
                <TextField.Root
                    defaultValue={profile.username || ''}
                    name="username"
                    placeholder="your username"
                    minLength={3} maxLength={30} required={true}
                />
                <p className="mt-2 font-bold">bio</p>
                <TextArea name="bio" defaultValue={profile.bio || ''}/>
                <div className="mt-4 flex justify-center">
                    <Button variant="solid">Save settings</Button>
                </div>
            </form>
        </div>
    );
}