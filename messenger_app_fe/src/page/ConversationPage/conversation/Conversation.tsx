import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Conversation as ConversationType } from "../../../schema";
import { ConversationHeader } from "./components/ConversationHeader";
import { MessageTextInput } from "./components/MessageTextInput";
import { ConversationMessages } from "./components/conversationMesseges/ConversationMessages";
import { ConversationService } from "./conversation.service";

export const Conversation = () => {
  const { conversationId } = useParams();
  const [conversation, setConversation] = useState<ConversationType>();
  const navigate = useNavigate();

  const getData = async () => {
    let conversation: ConversationType | null = null;
    if (conversationId) {
      conversation = await ConversationService.getConversation(conversationId);
      if (conversation) {
        setConversation(conversation);
      } else {
        navigate("/");
      }
    }
  };

  useEffect(() => {
    getData();
  }, [conversationId]);

  return (
    <div className="w-full h-full p-3 bg-mainBgColor flex flex-col">
      <ConversationHeader users={conversation?.Users} />
      <ConversationMessages messages={conversation?.Messages ?? []} conversationId={conversationId} />
      <MessageTextInput />
    </div>
  );
};
