import { useEffect, useState } from "react";
import { ProfileImage } from "../../../../../compoments/ProfileImage";
import useLocalStorage from "../../../../../hooks/useLocalstorage";
import { Message, User } from "../../../../../schema";
import { socket } from "../../../../../utils/socketIntance";

type ConversationMessagesProps = {
  messages: Message[];
};

export const ConversationMessages = ({ messages }: ConversationMessagesProps) => {
  const [loggedInUser] = useLocalStorage<User | null>("loginUser", null);
  const [messagesState, setMessagesState] = useState<Message[]>(messages);

  useEffect(() => {
    socket.on("sendMessage", (message) => {
      console.log("message from be", message);
      if (message) {
        setMessagesState((messages) => [...messages, message]);
      }
      console.log(socket.id);
    });

    return () => {
      socket.off("sendMessage");
    };
  }, []);

  return (
    <div className=" h-full flex flex-col-reverse gap-2">
      {messagesState?.map((obj, index) => {
        const isNewUser = index > 0 && messages[index - 1].user !== obj.user;
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