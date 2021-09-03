import React from "react";
import { navData } from "../constants/routes.js";
import { iconStyles } from "../constants/iconStyles";
import { AiOutlineMenuFold } from "react-icons/ai";
import { useGlobalContext } from "../context";
import NavSection from "./NavSection";

import "../styles/navbar.css";

//TODO: navbar should not be a set amount of pixels so make it more responsive
const Navbar = () => {
  const { isNavActive, setIsNavActive } = useGlobalContext();

  return (
    <nav className={isNavActive ? "navbar show-navbar" : "navbar"}>
      <AiOutlineMenuFold
        className="menu-in"
        style={iconStyles.menuIcon}
        onClick={() => {
          setIsNavActive(false);
        }}
      ></AiOutlineMenuFold>
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

export default Navbar;
