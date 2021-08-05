import React from "react";
import Header from "./Components/Header";
import Joblist from "./Components/Joblist";
import Modal from "./Components/Modal";

import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./Components/Navbar";

function App() {
  console.log(`sample URL for testing: https://i.imgur.com/cAke54O.jpg`);
  return (
    <>
      <Router>
        <Navbar />
        <section className="main-section">
          <Header></Header>
          <Joblist></Joblist>
          <Modal />
        </section>
      </Router>
    </>
  );
}

export default App;
