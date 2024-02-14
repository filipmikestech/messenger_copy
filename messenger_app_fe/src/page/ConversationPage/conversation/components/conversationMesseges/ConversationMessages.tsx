import { useEffect, useState } from "react";
import { FaThumbsUp } from "react-icons/fa6";
import { ProfileImage } from "../../../../../compoments/ProfileImage";
import useLocalStorage from "../../../../../hooks/useLocalstorage";
import { Message, User } from "../../../../../schema";
import { useAppStore } from "../../../../../store/useStore";
import { socket } from "../../../../../utils/socketIntance";

type ConversationMessagesProps = {
  messages: Message[];
  conversationId?: string;
};

export const ConversationMessages = ({ messages, conversationId }: ConversationMessagesProps) => {
  const [loggedInUser] = useLocalStorage<User | null>("loginUser", null);
  const [messagesState, setMessagesState] = useState<Message[]>(messages);
  const setLastMessage = useAppStore((state) => state.setLastMessage);
  useEffect(() => {
    socket.on("sendMessage", (message) => {
      if (message) {
        if (message.conversationId === conversationId) {
          setMessagesState((messages) => [...messages, message]);
        }
        setLastMessage(message);
      }
    });

    return () => {
      socket.off("sendMessage");
    };
  }, [conversationId]);

  useEffect(() => {
    setMessagesState(messages);
  }, [messages]);

  return (
    <div className=" h-full flex flex-col-reverse gap-2 overflow-y-auto">
      {messagesState
        .sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime())
        .map((obj, index) => {
          const isNewUser = (index > 0 && messagesState[index - 1].user.id !== obj.user.id) || index === 0;
          const isLoggedInUser = obj.user.id === loggedInUser?.id;

          return (
            <div className={` flex ${isLoggedInUser ? "justify-end" : "justify-start"} ${isNewUser && "mb-4"}`} key={obj.created + obj.text}>
              {isNewUser && !isLoggedInUser && <ProfileImage />}
              {obj.text === "[FaThumbsUp]" ? (
                <FaThumbsUp style={{ height: "100px", width: "100px", marginLeft: isNewUser && !isLoggedInUser ? "8px" : "48px", color: "#0098fe" }} />
              ) : (
                <div
                  className={` ${isLoggedInUser ? "bg-messengerColor" : " bg-inputLightBgColor"} ${
                    isNewUser ? "ml-2" : "ml-[48px]"
                  } rounded-[25px] py-2 px-4 max-w-[55%] `}
                >
                  {obj.text}
                </div>
              )}
            </div>
          );
        })}
    </div>
  );
};
