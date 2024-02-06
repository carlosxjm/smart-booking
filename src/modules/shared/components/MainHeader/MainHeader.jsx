import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./MainHeader.css";

export const MainHeader = () => {
  const [showMenu, setShowMenu] = useState(false);

  const handleToggleMenu = (event) => {
    event.stopPropagation();
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    const handleClickOut = () => {
      if (showMenu) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", handleClickOut);

    return () => document.removeEventListener("click", handleClickOut);
  }, [showMenu]);

  return (
    <header className="main-header-root">
      <div className="container">
        <Link to="/">
          <h2>SmartBooking</h2>
        </Link>
        <button
          className={`toggle-menu ${showMenu ? "active" : ""}`}
          onClick={handleToggleMenu}
          aria-label={`${showMenu ? "Hide" : "Show"} menu`}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>

        <nav className={showMenu ? "open" : "close"}>
          <ul>
            <li>
              <Link to="/">All bookings</Link>
            </li>
            <li>
              <Link to="/select-property">New booking</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
