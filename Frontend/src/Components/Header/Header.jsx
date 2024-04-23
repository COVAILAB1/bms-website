import "./Header.scss";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="header-org">
    <div className="header-temp"></div>
      <div className="header">
        <p className="title">BMS Dashboard</p>
        <nav>
            <p>
                <NavLink to={"/"}>Home</NavLink>
            </p>
            <p>
                <NavLink to={"/calculations"}>Calculations</NavLink>
            </p>
        </nav>
      </div>
    </div>
  );
};

export default Header;
