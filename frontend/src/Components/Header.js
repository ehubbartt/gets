import React from "react";
import { useGlobalContext } from "../context";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { iconStyles } from "../constants/iconStyles";

/**
 * @returns a header for the page
 */
const Header = ({ title }) => {
  const { isNavActive, setIsNavActive } = useGlobalContext();
  return (
    <header>
      {!isNavActive ? (
        <AiOutlineMenuUnfold
          className="menu-out"
          style={iconStyles.menuIcon}
          onClick={() => {
            setIsNavActive(true);
          }}
        />
      ) : null}
      <h1>{title}</h1>
    </header>
  );
};

export default Header;
