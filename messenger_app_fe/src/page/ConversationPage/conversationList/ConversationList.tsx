import moment from "moment";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useLocalStorage from "../../../hooks/useLocalstorage";
import { Conversation, User } from "../../../schema";
import { useAppStore } from "../../../store/useStore";
import { socket } from "../../../utils/socketIntance";
import { ConversationSelector } from "./components/ConversationSelector";
import { ConversationListHeader } from "./components/conversationListHeader/ConversationListHeader";
import { ConversationListService } from "./conversationList.service";

export const ConversationList = () => {
  const [conversationList, setConversationList] = useState<Conversation[]>([]);
  const lastMessageFromWS = useAppStore((state) => state.lastMessage);
  console.log("ConversationList , lastMessageFromWS:", lastMessageFromWS);
  const filteredConversation = useAppStore((state) => state.filteredConversation);
  const [user] = useLocalStorage<User | null>("loginUser", null);
  const location = useLocation();
  const navigate = useNavigate();
  const getData = async () => {
    const data = await ConversationListService.getConversationList();
    setConversationList(data);
  };
  useEffect(() => {
    socket.on("openConversation", (conversation) => {
      if (conversation) {
        setConversationList((conversationList) => [...conversationList, conversation]);
        navigate(conversation.id);
      }
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
        navigate(conversationList[0].id);
      }
    }
  }, [conversationList]);

  return (
    <div className=" h-full w-[400px] bg-sideBgColor flex-shrink-0">
      <ConversationListHeader />
      {conversationList
        .filter((conversation) => {
          console.log("filter conversation.Messages", conversation.Messages);
          const otherUserArray = conversation.Users?.filter((currentUser) => currentUser.id !== user?.id);
          const otherUser = otherUserArray?.length ? otherUserArray[0] : null;
          return filteredConversation ? otherUser?.name.toLowerCase().includes(filteredConversation.toLowerCase()) : true;
        })
        .sort((a, b) => {
          const conversationAcreated = a.Messages && a.Messages[a.Messages.length - 1].created;
          console.log(".sort , conversationAcreated:", conversationAcreated);
          const conversationBcreated = b.Messages && b.Messages[b.Messages.length - 1].created;
          console.log(".sort , conversationBcreated:", conversationBcreated);

          if (lastMessageFromWS?.conversationId === a.id) {
            console.log(".sort , lastMessageFromWS:", lastMessageFromWS);
            if (moment(lastMessageFromWS.created).isAfter(conversationBcreated)) {
              console.log(".sort , lastMessageFromWS.created:", lastMessageFromWS.created);
              return -1;
            }
          }

          if (lastMessageFromWS?.conversationId === b.id) {
            console.log(".sort , lastMessageFromWS:", lastMessageFromWS);
            if (moment(lastMessageFromWS.created).isAfter(conversationAcreated)) {
              console.log(".sort , lastMessageFromWS.created:", lastMessageFromWS.created);
              return 1;
            }
          }

          return moment(conversationAcreated).isBefore(conversationBcreated) ? 1 : -1;
        })
        .map((conversation) => {
          const otherUserArray = conversation.Users?.filter((currentUser) => currentUser.id !== user?.id);
          const otherUser = otherUserArray?.length ? otherUserArray[0] : null;
          console.log("conversation.Messages", conversation.Messages);
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
