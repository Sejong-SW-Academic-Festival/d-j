import React, { useEffect, useRef } from "react";
import "./Menu.css";

function Menu({ setShowMenu }) {
  const wrapperRef = useRef();
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });
  
  const handleClickOutside = (event) => {
    if (wrapperRef && !wrapperRef.current.contains(event.target)) {
      setShowMenu(false);
    }
  };

  return (
    <div>
      <div className="menuBackground">
        <div className="menuBoard" ref={wrapperRef}></div>
      </div>
    </div>
  );
}

export default Menu;
