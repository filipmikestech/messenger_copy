import { useNavigate, useParams } from "react-router-dom";
import { ProfileImage } from "../../../../compoments/ProfileImage";

export const ConversationSelector = ({ name, conversationId }: { name: string; conversationId: string }) => {
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
          Beginning of last message · <span>14m</span>
        </div>
      </div>
    </div>
  );
};
