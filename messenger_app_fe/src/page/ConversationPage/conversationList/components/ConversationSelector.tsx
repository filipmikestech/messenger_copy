import moment from "moment";
import { FaThumbsUp } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import { ProfileImage } from "../../../../compoments/ProfileImage";
import { Message } from "../../../../schema";
import { useAppStore } from "../../../../store/useStore";

export const ConversationSelector = ({ name, conversationId, lastMessage }: { name: string; conversationId: string; lastMessage: Message | null }) => {
  const navigate = useNavigate();
  const lastMessageFromWS = useAppStore((state) => state.lastMessage);
  const isCurrentMessage = lastMessageFromWS && lastMessageFromWS?.conversationId === conversationId;
  const lastMessageTime = lastMessage && moment(lastMessage.created).format("HH:mm");
  const lastMessageFromWSTime = lastMessageFromWS && moment(lastMessageFromWS.created).format("HH:mm");
  const showEmoji = isCurrentMessage ? lastMessageFromWS?.text === "[FaThumbsUp]" : lastMessage?.text === "[FaThumbsUp]";
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
          <span>
            {showEmoji ? (
              <span>
                <FaThumbsUp style={{ height: "20px", width: "20px", display: "inline", marginBottom: "5px" }} />
              </span>
            ) : isCurrentMessage ? (
              lastMessageFromWS.text.substring(0, 20)
            ) : (
              lastMessage?.text.substring(0, 20)
            )}{" "}
            · <span>{isCurrentMessage ? lastMessageFromWSTime : lastMessageTime}</span>
          </span>
        </div>
      </div>
    </div>
  );
};
