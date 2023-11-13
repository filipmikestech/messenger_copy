import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ConversationPage } from "./page/ConversationPage/ConversationPage";
import { LoginPage } from "./page/LoginPage/LoginPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<ConversationPage />} />
        <Route path="login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
