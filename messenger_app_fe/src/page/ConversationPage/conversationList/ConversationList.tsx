import { useEffect, useState } from "react";
import { Conversation } from "../../../schema";
import { ConversationSelector } from "./components/ConversationSelector";
import { ConversationListHeader } from "./components/conversationListHeader/ConversationListHeader";
import { ConversationListService } from "./conversationList.service";

export const ConversationList = () => {
  const [conversationList, setConversationList] = useState<Conversation[]>([]);
  console.log(conversationList);

  const getData = async () => {
    const data = await ConversationListService.getConversationList();
    setConversationList(data);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className=" h-full w-[400px] bg-sideBgColor flex-shrink-0">
      <ConversationListHeader />
      {conversationList.map((conversation) => {
        return <ConversationSelector key={conversation.id} name={conversation.owner.name} />;
      })}
    </div>
  );
};
