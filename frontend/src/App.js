import React from "react";
import { navData } from "./data";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./Components/Navbar";

function App() {
  console.log(
    `sample URLs for testing:\nhttps://i.imgur.com/cAke54O.jpg\nhttps://i.imgur.com/b0apCDi.jpg?1\nhttps://i.imgur.com/C6q1LJ1.jpg?1\nhttps://i.imgur.com/wXMdv5q.jpg?1\nhttps://i.imgur.com/Mjf8um5.jpg`
  );

  const allLinks = [];
  for (let i = 0; i < navData.length; i++) {
    let links = navData[i].links;
    for (let j = 0; j < links.length; j++) {
      allLinks.push(links[j]);
    }
  }
  return (
    <Router>
      <Navbar />
      <section className="main-section">
        <Switch>
          {allLinks.map((link) => {
            return link.exact ? (
              <Route key={link.id} exact path={link.url}>
                {link.page}
              </Route>
            ) : (
              <Route key={link.id} path={link.url}>
                {link.page}
              </Route>
            );
          })}
        </Switch>
      </section>
    </Router>
  );
}

export default App;
