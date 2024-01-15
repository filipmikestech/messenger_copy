import { useParams } from "react-router-dom";
import { ConversationHeader } from "./components/ConversationHeader";
import { ConversationMessages } from "./components/ConversationMessages";
import { MessageTextInput } from "./components/MessageTextInput";

export const Conversation = () => {
  const { conversationId } = useParams();
  console.log(conversationId);
  return (
    <div className=" flex flex-col w-full h-full">
      <div className="w-full h-full p-3 bg-mainBgColor flex flex-col">
        <ConversationHeader />
        <ConversationMessages />
      </div>
      <MessageTextInput />
    </div>
  );
};
