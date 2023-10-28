import { Conversation } from "./compoments/Conversation";
import { ConversationList } from "./compoments/conversationList/ConversationList";
import { MessageTextInput } from "./compoments/MessageTextInput";

function App() {
  return (
    <div className=" w-screen h-screen flex">
      <ConversationList />
      <div className=" flex flex-col w-full h-full">
        <Conversation />
        <MessageTextInput />
      </div>
    </div>
  );
}

export default App;
