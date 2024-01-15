import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProfileImage } from "../../../../compoments/ProfileImage";
import useLocalStorage from "../../../../hooks/useLocalstorage";
import { Message, User } from "../../../../schema";
import { ConversationService } from "../conversation.service";

export const ConversationMessages = () => {
  const { conversationId } = useParams();
  const [loggedInUser] = useLocalStorage<User | null>("loginUser", null);
  const [messages, setMessages] = useState<Message[]>();
  const getData = async () => {
    let messages: Message[] = [];
    if (conversationId) {
      messages = await ConversationService.getMessages(conversationId);
    }
    setMessages(messages);
  };

  useEffect(() => {
    getData();
  }, [conversationId]);

  return (
    <div className=" h-full flex flex-col-reverse gap-2">
      {messages?.map((obj, index) => {
        const isNewUser = index > 0 && messages[index - 1].user !== obj.user;
        const isLoggedInUser = obj.user.id === loggedInUser?.id;

        return (
          <div className={` flex ${isLoggedInUser ? "justify-end" : "justify-start"} ${isNewUser && "mb-4"}`}>
            {isNewUser && <ProfileImage />}
            <div
              className={` ${isLoggedInUser ? "bg-messengerColor" : " bg-inputLightBgColor"} ${
                isNewUser ? "ml-2" : "ml-[48px]"
              } rounded-[25px] py-2 px-4 max-w-[55%] `}
              key={obj.created + obj.text}
            >
              {obj.text}
            </div>
          </div>
        );
      })}
    </div>
  );
};
