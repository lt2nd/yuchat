import { ServerSidebar } from "@/components/server/server-sidebar";
import { prisma } from "@/db";
import { currentProfile } from "@/lib/current-profile";
import { redirect } from "next/navigation";




const serverIdLayout = async ({
    children,
    params,
} : {
    children : React.ReactNode;
    params : Promise<{
        serverId : string;
    }>;
}) => {
    const profile = await currentProfile();

    if(!profile){
        return redirect('/login');
    }

    const server = await prisma.server.findUnique({
        where: {
            id: (await params).serverId,
            members:{
                some: {
                    profileId: profile.id
               }
            }
        },
    })

    if(!server){
        return redirect('/');
    }

    return ( 
        <div className="h-full">
          <div 
          className="hidden md:flex h-full w-60 z-20 flex-col fixed inset-y-0">
            <ServerSidebar serverId={(await params).serverId} />
          </div>
          <main className="h-full md:pl-60">
            {children}
          </main>
        </div>
    );
}

export default serverIdLayout;