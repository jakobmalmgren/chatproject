import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
import Chats from "./Chats";
import Login from "./Login";

function App() {
  return (
    <div>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/chats" element={<Chats></Chats>}></Route>
            <Route path="/" element={<Login></Login>}></Route>
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
