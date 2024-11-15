import { useState } from "react";
import Nav from "./components/nav";
import Login from "./components/login";
import Chats from "./components/chats";

import Styles from "./App.module.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";

function App() {
  return (
    <div className={Styles.maindiv}>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/chats" element={<Chats />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        <div className={Styles.footer}>
          <footer>Crafted with love by @puttajagadhabhiram</footer>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
