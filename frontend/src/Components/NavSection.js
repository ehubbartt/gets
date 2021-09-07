import React, { useState, useRef, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";
import { NavLink } from "react-router-dom";

const NavSection = ({ links, section }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [height, setHeight] = useState("auto");
  const heightRef = useRef();

  useEffect(() => {
    heightRef && setHeight(`${heightRef.current.clientHeight}px`);
  }, []);

  return (
    <section id={section}>
      <h3 className="nav-section" onClick={() => setIsCollapsed(!isCollapsed)}>
        {section}
        <FiChevronDown
          className={isCollapsed ? "nav-chevron turned" : "nav-chevron"}
        />
      </h3>
      <div className="nav-container">
        <ul
          className={isCollapsed ? "collapsed nav-links" : "nav-links"}
          ref={heightRef}
          style={{ height: isCollapsed ? "0px" : height }}
        >
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
      </div>
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

export default NavSection;
