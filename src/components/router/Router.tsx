import { Login } from "../../pages/login";
import { Chat } from "../../pages/chat";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { urls } from "../../utils/urls";
import { Layout } from "../layout";
import { Notes } from "../../pages/notes/Notes";
import { NotePage } from "../../pages/note/Note";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={urls.login.url()} element={<Login />} />
        
        <Route element={<Layout />}>
          <Route path={urls.messages.url()} element={<Chat />} />
          <Route path="/notes">
            <Route path=":id" element={<NotePage />} />
            <Route path="" element={<Notes />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
