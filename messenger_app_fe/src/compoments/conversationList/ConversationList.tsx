import { useEffect, useState } from "react";
import { Conversation } from "../../schema";
import { ConversationHeader } from "./components/ConversationHeader";
import { ConversationSelector } from "./components/ConversationSelector";
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
    <div className=" h-full w-[400px] bg-[#ececec]">
      <ConversationHeader />
      {conversationList.map((conversation) => {
        return <ConversationSelector name={conversation.owner.name} />;
      })}
    </div>
  );
};
