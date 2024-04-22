import "./Header.scss";
import { NavLink } from "react-router-dom";
import Button from '@mui/material/Button';

const Header = () => {
  return (
    <div className="header-org">
    <div className="header-temp"></div>
      <div className="header">
        <p className="title">BMS Dashboard</p>
        <nav>
            <Button>
                <NavLink to={"/"}>Home</NavLink>
            </Button>
            <Button>
                <NavLink to={"/calculations"}>Calculations</NavLink>
            </Button>
        </nav>
      </div>
    </div>
  );
};

export default Header;
