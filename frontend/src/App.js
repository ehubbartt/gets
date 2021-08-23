import React from "react";
import { navData } from "./data";
import { useGlobalContext } from "./context";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./Components/Navbar";

function App() {
  const { isNavActive } = useGlobalContext();

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
      <section
        className={!isNavActive ? "main-section expand-main" : "main-section"}
      >
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
