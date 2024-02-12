import { useEffect, useState } from "react";
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
  console.log("messages", messages);

  console.log("messages state", messagesState);
  useEffect(() => {
    socket.on("sendMessage", (message) => {
      console.log("message from be", message);
      if (message) {
        if (message.conversationId === conversationId) {
          setMessagesState((messages) => [...messages, message]);
        }
        setLastMessage(message);
      }
      console.log(socket.id);
    });

    return () => {
      socket.off("sendMessage");
    };
  }, []);

  useEffect(() => {
    setMessagesState(messages);
  }, [messages]);

  return (
    <div className=" h-full flex flex-col-reverse gap-2 overflow-y-auto">
      {messagesState
        .sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime())
        .map((obj, index) => {
          console.log("messagesState", messagesState);
          const isNewUser = index > 0 && messagesState[index - 1].user !== obj.user;
          const isLoggedInUser = obj.user.id === loggedInUser?.id;

          return (
            <div className={` flex ${isLoggedInUser ? "justify-end" : "justify-start"} ${isNewUser && "mb-4"}`} key={obj.created + obj.text}>
              {isNewUser && <ProfileImage />}
              <div
                className={` ${isLoggedInUser ? "bg-messengerColor" : " bg-inputLightBgColor"} ${
                  isNewUser ? "ml-2" : "ml-[48px]"
                } rounded-[25px] py-2 px-4 max-w-[55%] `}
              >
                {obj.text}
              </div>
            </div>
          );
        })}
    </div>
  );
};
