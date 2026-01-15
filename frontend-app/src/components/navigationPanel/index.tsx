import { FC, useCallback, useMemo, useState } from "react";
import { userData } from "@archetypes/authentication";
import { DefaultView } from "@components/defaultView";
import { ChatPanel } from "@components/chatPanel";
import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "@query/index";

interface NavigationPanelProps {
  containerClassName?: string;
  shopId: string;
  qrCode: string;
}

export const NavigationPanel: FC<NavigationPanelProps> = ({
  containerClassName,
  shopId,
  qrCode,
}) => {
  const [selectedUserId, toggleSeleteduserId] = useState<string>();

  const { data: usersList } = useQuery<userData[]>({
    queryKey: ["users", shopId],
    queryFn: () => fetchUsers(shopId),
    refetchOnWindowFocus: false,
  });
  const avatar = useCallback(
    ({
      avatarStyle,
      avatarSeed,
    }: {
      avatarStyle: string;
      avatarSeed: string;
    }) => {
      return `https://api.dicebear.com/9.x/${avatarStyle}/svg?seed=${avatarSeed}&size=40&radius=9`;
    },
    [],
  );
  const user = useMemo(() => {
    return  usersList?.find(({ user }) => user?._id === selectedUserId)?.user;
  },[selectedUserId])
  return (
    <>
      <div
        className={`border-r bg-[#001822] border-[#0d0d1e] h-full ${containerClassName}`}
      >
        {usersList?.map(({ user, lastMessage, lastMessageAt }) => {
          const date = new Date(lastMessageAt);
          const options = {
            hour: "numeric",
            minute: "2-digit",
            hourCycle: "h12",
          } as const;
          let formattedTime = date.toLocaleString("en-US", options);
          return (
            <>
              <div
                key={user?._id}
                className="flex items-center space-x-2"
                role="button"
                tabIndex={0}
                onClick={() => toggleSeleteduserId(user?._id)}
              >
                <img
                  src={avatar({
                    avatarSeed: user?.avatarSeed,
                    avatarStyle: user?.avatarStyle,
                  })}
                  alt="avatar"
                  className="w-20 h-20 rounded-full"
                />
                <p className="text-grey-500">{user?.name}</p>
              </div>
              <div className="flex justify-between gap-2">
                <p>{lastMessage}</p>
                <p>{formattedTime}</p>
              </div>
            </>
          );
        })}
      </div>

      {selectedUserId ? (
        <ChatPanel
          userId={selectedUserId}
          name={user?.name ?? ""
          }
          avatarStyle={user?.avatarStyle ?? ""}
          avatarSeed={user?.avatarSeed ?? ""}
        ></ChatPanel>
      ) : (
        <DefaultView containerClassName="p-4" qrCode={qrCode as string} />
      )}
    </>
  );
};
