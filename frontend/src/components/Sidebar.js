import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  FaHome,
  FaUserPlus,
  FaUsers,
  FaChartPie,
  FaCalendarAlt,
  FaCog,
  FaUserCircle
} from "react-icons/fa";

import "./Sidebar.css";

export default function Sidebar() {
  const navigate = useNavigate();
  const logout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    sessionStorage.clear();

    navigate("/login");

};
  return (

    <div className="sidebar">

      <div className="logo">

        <h2>EFOS CRM</h2>

        <p>Lead Management</p>

      </div>

      <nav>

        <NavLink to="/dashboard">
          <FaHome />
          Dashboard
        </NavLink>

        <NavLink to="/add-lead">
          <FaUserPlus />
          Add Lead
        </NavLink>

        <NavLink to="/view-leads">
          <FaUsers />
          View Leads
        </NavLink>

        <NavLink to="/ai-communication">
          <FaUsers />
          AI Communication
        </NavLink>
        
        <NavLink to="/analytics">
          <FaChartPie />
          Analytics
        </NavLink>

        <NavLink to="/followups">
          <FaCalendarAlt />
          Follow Ups
        </NavLink>

        <NavLink to="/settings">
          <FaCog />
          Settings
        </NavLink>

      </nav>

      <div className="user">

        <FaUserCircle size={45} />

        <div>

          <h4>Vaishnavi</h4>

          <small>Administrator</small>

        </div>

      </div>

      <button
    onClick={logout}
    style={{
        width: "100%",
        background: "#dc2626",
        color: "white",
        border: "none",
        padding: "12px",
        borderRadius: "8px",
        fontSize: "16px",
        fontWeight: "600",
        cursor: "pointer",
        transition: "0.3s"
    }}
    onMouseOver={(e) => e.target.style.background = "#b91c1c"}
    onMouseOut={(e) => e.target.style.background = "#dc2626"}
>

        Logout

      </button>

    </div>

  );

}