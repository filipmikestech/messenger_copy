import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../../hooks/useLocalstorage";
import { User } from "../../schema";
import { socket } from "../../utils/socketIntance";
import { Conversation } from "./conversation/Conversation";
import { MessageTextInput } from "./conversation/components/MessageTextInput";
import { ConversationList } from "./conversationList/ConversationList";

export const ConversationPage = () => {
  const [user] = useLocalStorage<User | null>("loginUser", null);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      console.log("conv user", user);
      socket.auth = { user: user };
      socket.connect();
    }
    if (!user) {
      navigate("/login");
    }
    socket.on("connect", () => {
      console.log(socket.id);
    });
  }, []);

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
