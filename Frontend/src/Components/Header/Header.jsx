import { useEffect, useState } from "react";
import "./Header.scss";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerHeight <= 700) {
        setMenu(false);
      } else {
        setMenu(true);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, []);

  return (
    <div className="header-org">
      <div className="header-temp"></div>
      <div className="header">
        <p className="title">BMS Dashboard</p>
        <div>
          <span
            className="material-symbols-outlined menu"
            onClick={() => setMenu(!menu)}
          >
            menu
          </span>
          <nav style={{ display: menu ? "flex" : "none" }}>
            <p>
              <NavLink to={"/"}>Home</NavLink>
            </p>
            {/* <p>
                <NavLink to={"/calculations"}>Calculations</NavLink>
            </p> */}
            <p>
              <NavLink to={"/overall"}>Overall</NavLink>
            </p>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Header;
