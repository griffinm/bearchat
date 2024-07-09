import {  useState } from "react";
import { Login } from "../../pages/login";
import { Chat } from "../../pages/chat";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { urls } from "../../utils/urls";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={urls.login.url()} element={<Login />} />
        <Route path={urls.chat.url()} element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}
