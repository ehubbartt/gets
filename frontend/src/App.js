import React from "react";
import Header from "./Components/Header";
import Joblist from "./Components/Joblist";
import Modal from "./Components/Modal";

import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./Components/Navbar";

function App() {
  console.log(
    `sample URLs for testing:\nhttps://i.imgur.com/cAke54O.jpg\nhttps://i.imgur.com/b0apCDi.jpg?1\nhttps://i.imgur.com/C6q1LJ1.jpg?1\nhttps://i.imgur.com/wXMdv5q.jpg?1\nhttps://i.imgur.com/Mjf8um5.jpg`
  );
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
