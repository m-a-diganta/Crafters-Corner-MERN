import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import MainNavigation from "./shared/components/MainNavigation";
import Temp from "./Temp";
import Test from "./Test";

function App() {
  return (
    <>
      <Router>
        <MainNavigation />
        <main className="main">
          <Routes>
            <Route path="/" element={<Test />}></Route>
            <Route path="/services" element={<Temp />}></Route>
            <Route path="/store" element={<Temp />}></Route>
            <Route path="/login" element={<Test />}></Route>
          </Routes>
        </main>
      </Router>
    </>
  );
}

export default App;
