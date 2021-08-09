import React from "react";
import HomePage from "./Pages/HomePage";
import JobPage from "./Pages/JobPage";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./Components/Navbar";

function App() {
  console.log(
    `sample URLs for testing:\nhttps://i.imgur.com/cAke54O.jpg\nhttps://i.imgur.com/b0apCDi.jpg?1\nhttps://i.imgur.com/C6q1LJ1.jpg?1\nhttps://i.imgur.com/wXMdv5q.jpg?1\nhttps://i.imgur.com/Mjf8um5.jpg`
  );
  return (
    <Router>
      <Navbar />
      <section className="main-section">
        <Switch>
          <Route exact path="/">
            <HomePage title="Home" />
          </Route>
          <Route path="/jobs">
            <JobPage title="Job List" />
          </Route>
        </Switch>
      </section>
    </Router>
  );
}

export default App;
