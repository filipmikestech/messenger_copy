import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useLocalStorage from "../../../hooks/useLocalstorage";
import { Conversation, User } from "../../../schema";
import { socket } from "../../../utils/socketIntance";
import { ConversationSelector } from "./components/ConversationSelector";
import { ConversationListHeader } from "./components/conversationListHeader/ConversationListHeader";
import { ConversationListService } from "./conversationList.service";

export const ConversationList = () => {
  const [conversationList, setConversationList] = useState<Conversation[]>([]);
  const [user] = useLocalStorage<User | null>("loginUser", null);
  console.log("conversationList", conversationList);
  const location = useLocation();
  const navigate = useNavigate();
  console.log("location", location);
  const getData = async () => {
    const data = await ConversationListService.getConversationList();
    setConversationList(data);
  };
  useEffect(() => {
    socket.on("openConversation", (conversation) => {
      console.log("openConversation", conversation);
      if (conversation) {
        setConversationList((conversationList) => [...conversationList, conversation]);
        navigate(conversation.id);
      }
      console.log(socket.id);
    });

    return () => {
      socket.off("openConversation");
    };
  }, []);

  useEffect(() => {
    getData();
  }, [location]);

  useEffect(() => {
    if (location.pathname === "/") {
      if (conversationList.length > 0) {
        console.log("navigate called", conversationList);
        navigate(conversationList[0].id);
      }
    }
  }, [conversationList]);

  return (
    <div className=" h-full w-[400px] bg-sideBgColor flex-shrink-0">
      <ConversationListHeader />
      {conversationList.map((conversation) => {
        console.log(conversation);
        // @ts-ignore
        const otherUserArray = conversation.Users?.filter((currentUser) => currentUser.id !== user?.id);
        const otherUser = otherUserArray?.length ? otherUserArray[0] : null;
        return (
          <ConversationSelector
            key={conversation.id}
            name={otherUser?.name ?? ""}
            conversationId={conversation.id}
            lastMessage={conversation.Messages && conversation.Messages[conversation.Messages.length - 1]}
          />
        );
      })}
    </div>
  );
};
