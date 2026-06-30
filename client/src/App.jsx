import React from "react";
import Main from "./pages/Main";
import Detail from "./pages/Detail";
import Create from "./pages/Create";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SideBar from "./components/SideBar";
const App = () => {
  return (
    <BrowserRouter>
      <div className="flex">
        <SideBar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/tarif/:id" element={<Detail />} />
          <Route path="/oluştur" element={<Create />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
