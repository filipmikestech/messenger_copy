import { Conversation } from "./conversation/Conversation";
import { MessageTextInput } from "./conversation/components/MessageTextInput";
import { ConversationList } from "./conversationList/ConversationList";

export const ConversationPage = () => {
  return (
    <div className=" w-screen h-screen flex">
      <ConversationList />
      <div className=" flex flex-col w-full h-full">
        <Conversation />
        <MessageTextInput />
      </div>
    </div>
  );
};
