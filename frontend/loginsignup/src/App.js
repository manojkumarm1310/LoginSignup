import React from "react";
import Login from "./components/Login";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import Changepassword from "./components/Changepassword";

function App() {
  return (
  <BrowserRouter>

    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="/profile" element={<Profile />}></Route>
      <Route path="/changepassword" element={<Changepassword />}></Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
