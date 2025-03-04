
import { redirect } from "next/navigation";


import { getOrCreateConversation } from "@/lib/conversation";
import { currentProfile } from "@/lib/current-profile";
import { ChatHeader } from "@/components/chat/chat-header";
//import { ChatMessages } from "@/components/chat/chat-messages";
//import { ChatInput } from "@/components/chat/chat-input";
//import { MediaRoom } from "@/components/media-room";
import { prisma } from "@/db";

interface MemberIdPageProps {
  params: {
    memberId: string;
    serverId: string;
  },
  searchParams: {
    video?: boolean;
  }
}

const MemberIdPage = async ({
  params,
  searchParams,
}: MemberIdPageProps) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/login");
  }

  const currentMember = await prisma.member.findFirst({
    where: {
      serverId: (await params).serverId,
      profileId: profile.id,
    },
    include: {
      profile: true,
    },
  });

  if (!currentMember) {
    return redirect("/");
  }

  const conversation = await getOrCreateConversation(currentMember.id, (await params).memberId);

  if (!conversation) {
    return redirect(`/servers/${(await params).serverId}`);
  }

  const { memberOne, memberTwo } = conversation;

  const otherMember = memberOne.profileId === profile.id ? memberTwo : memberOne;

  return ( 
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
      <ChatHeader
        imageUrl={otherMember.profile.avatar ?? ""}
        name={otherMember.profile.username ?? "Unknown User"}
        serverId={(await params).serverId}
        type="conversation"
      />
      {/* {searchParams.video && (
        <MediaRoom
          chatId={conversation.id}
          video={true}
          audio={true}
        />
      )} */}
      {!(await searchParams).video && (
        <>
          {/* <ChatMessages
            member={currentMember}
            name={otherMember.profile.username}
            chatId={conversation.id}
            type="conversation"
            apiUrl="/api/direct-messages"
            paramKey="conversationId"
            paramValue={conversation.id}
            socketUrl="/api/socket/direct-messages"
            socketQuery={{
              conversationId: conversation.id,
            }}
          /> */}
          {/* <ChatInput
            name={otherMember.profile.username}
            type="conversation"
            apiUrl="/api/socket/direct-messages"
            query={{
              conversationId: conversation.id,
            }}
          /> */}
        </>
      )}
    </div>
   );
}
 
export default MemberIdPage;