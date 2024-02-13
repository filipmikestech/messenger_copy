import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import useLocalStorage from "../../hooks/useLocalstorage";
import { User } from "../../schema";
import { socket } from "../../utils/socketIntance";
import { ConversationList } from "./conversationList/ConversationList";

export const ConversationPage = () => {
  const [user] = useLocalStorage<User | null>("loginUser", null);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      socket.auth = { user: user };
      socket.connect();
    }
    if (!user) {
      navigate("/login");
    }
  }, []);

  return (
    <div className=" w-screen h-screen flex">
      <ConversationList />
      <Outlet />
    </div>
  );
};
