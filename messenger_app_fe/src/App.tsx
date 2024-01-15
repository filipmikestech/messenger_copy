import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ConversationPage } from "./page/ConversationPage/ConversationPage";
import { Conversation } from "./page/ConversationPage/conversation/Conversation";
import { LoginPage } from "./page/LoginPage/LoginPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ConversationPage />}>
          <Route path=":conversationId" element={<Conversation />} />
        </Route>
        <Route path="login" element={<LoginPage />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
