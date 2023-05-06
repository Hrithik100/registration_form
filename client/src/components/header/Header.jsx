import { NavLink } from "react-router-dom";
import "./style.scss";

const Header = () => {
  return (
    <header className="header">
      <div className="navItems">
        <NavLink to="/">
          <h1>Registration</h1>
        </NavLink>
      </div>
      <div className="navItems">
        <NavLink to="/datatables">
          <h1>Datatable</h1>
        </NavLink>
      </div>
    </header>
  );
};

export default Header;
