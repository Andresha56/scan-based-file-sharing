import { FC } from "react";
import "./chat.scss";
interface ChatnavProps  {
    name: string;
    avatarStyle: string;
    avatarSeed: string;
}
export const ChatNav:FC<ChatnavProps> = ({avatarSeed,avatarStyle,name}) => {
    return (
        <div className="nav-wrapper">
            <div className="avatar-wrapper">
                <img src={`https://api.dicebear.com/9.x/${avatarStyle}/svg?seed=${avatarSeed}&size=40&radius=9`} alt="avatar" />
            </div>
            <p className="">{name}</p>
        </div>
    )
}