import { FC } from "react";
import "./chatPanel.scss";
import { ChatNav } from "@components/ChatNav";
interface chatPanelProps {
    userId: string;
    name: string;
    avatarStyle: string;
    avatarSeed: string;
}
export const ChatPanel: FC<chatPanelProps> = ({ userId,name,avatarSeed,avatarStyle}) => {
    return (
        <div className="chat-panner-wrapper">
            <ChatNav avatarSeed={ avatarSeed} avatarStyle={avatarStyle} name={name} />
        </div>
    )
}