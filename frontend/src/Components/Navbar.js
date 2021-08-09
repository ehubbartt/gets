import React from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { CgWorkAlt } from "react-icons/cg";

const Navbar = () => {
  return (
    <nav id="navbar">
      <div id="nav-center">
        <section id="main">
          <h3 className="nav-section">Main</h3>
          <ul className="nav-links">
            <li>
              <NavLink
                className="nav-link"
                to="/"
                exact
                activeClassName="link-selected"
              >
                <AiOutlineHome className="nav-icon" />
                Home
              </NavLink>
            </li>
          </ul>
        </section>
        <section id="orders">
          <div className="nav-section">
            <h3 className="nav-section">Orders</h3>
          </div>
          <ul className="nav-links">
            <li>
              <NavLink
                className="nav-link"
                to="/jobs"
                activeClassName="link-selected"
              >
                <CgWorkAlt className="nav-icon" />
                Jobs
              </NavLink>
            </li>
          </ul>
        </section>
      </div>
    </nav>
  );
};

const hover = () => {};

export default Navbar;
