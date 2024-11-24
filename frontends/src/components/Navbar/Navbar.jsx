import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { assets } from "../../assets/assets"; // assuming assets are already imported
import "./Navbar.css";

const Navbar = () => {
  const [menu, setMenu] = useState("home");
  const { token, setToken, username } = useContext(StoreContext); // Getting username as well
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");  // Clear token from context
    navigate("/");  // Redirect to home page on logout
  };

  return (
    <div className="navbar">
      {/* Logo displaying the company name */}
      <Link to="/dashboard">
        <h6 className="navbar-logo">
          DaislDary {/* Company name or logo */}
        </h6>
      </Link>

      {/* Search Box */}
      <div className="navbar-search">
        <input type="text" placeholder="Search..." className="search-bar" />
      </div>

      {/* Username Display */}
      <div className="navbar-username">
        <h3>Hey, {username ? username : "Username"}</h3>
      </div>

      {/* Navbar Menu Items */}
      <ul className="navbar-menu">
        <Link
          to="/dashboard"
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          Home
        </Link>

        <Link
          to="/employee-list"
          onClick={() => setMenu("employeeList")}
          className={menu === "employeeList" ? "active" : ""}
        >
          Employee List
        </Link>
      </ul>

      {/* Navbar Right Section */}
      <div className="navbar-right">
        {/* Logout Option */}
        {token ? (
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="Profile" />
            <ul className="nav-profile-dropdown">
              <li onClick={() => navigate("/myorders")}>
                <img src={assets.bag_icon} alt="Orders" />
                <p>Orders</p>
              </li>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} alt="Logout" />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        ) : (
          <button onClick={logout} className="logout-button">
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
