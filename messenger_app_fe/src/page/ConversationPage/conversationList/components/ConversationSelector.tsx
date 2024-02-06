import { useNavigate, useParams } from "react-router-dom";
import { ProfileImage } from "../../../../compoments/ProfileImage";
import { Message } from "../../../../schema";

export const ConversationSelector = ({ name, conversationId, lastMessage }: { name: string; conversationId: string; lastMessage: Message | null }) => {
  const navigate = useNavigate();
  const { conversationId: conversationIdParams } = useParams();
  const isConversationSelected = conversationId === conversationIdParams;
  return (
    <div
      className={`p-3 hover:bg-hoverColor cursor-pointer flex gap-3 ${isConversationSelected && "bg-hoverColor"}`}
      onClick={() => navigate(`/${conversationId}`)}
    >
      <ProfileImage size="60px" />
      <div className="flex flex-col justify-center">
        <div className="  font-semibold">{name}</div>
        <div className=" text-[14px] text-lightTextColor">
          {lastMessage?.text.substring(0, 20)} · <span>14m</span>
        </div>
      </div>
    </div>
  );
};
