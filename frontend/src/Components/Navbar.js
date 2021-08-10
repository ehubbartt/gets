import React from "react";
import { NavLink } from "react-router-dom";
import { navData } from "../data";

const Navbar = () => {
  return (
    <nav id="navbar">
      <div id="nav-center">
        {navData.map((data) => {
          return (
            <NavSection
              key={data.sectionid}
              links={data.links}
              section={data.section}
            ></NavSection>
          );
        })}
      </div>
    </nav>
  );
};

const NavSection = ({ links, section }) => {
  return (
    <section id={section}>
      <h3 className="nav-section">{section}</h3>
      <ul className="nav-links">
        {links.map((link) => {
          return (
            <SingleLink
              key={link.id}
              url={link.url}
              text={link.text}
              icon={link.icon}
              exact={link.exact}
            ></SingleLink>
          );
        })}
      </ul>
    </section>
  );
};

const SingleLink = ({ url, text, icon, exact }) => {
  return (
    <li className="single-link">
      {exact ? (
        <NavLink
          className="nav-link"
          to={url}
          exact
          activeClassName="link-selected"
        >
          {icon}
          <h5>{text}</h5>
        </NavLink>
      ) : (
        <NavLink className="nav-link" to={url} activeClassName="link-selected">
          {icon}
          <h5>{text}</h5>
        </NavLink>
      )}
    </li>
  );
};

export default Navbar;
