import {
    FaBell,
    FaMoon,
    FaSearch,
    FaUserCircle
} from "react-icons/fa";

import "./Topbar.css";

function Topbar() {

    const today = new Date();

    return (

        <div className="topbar">

            <div>

                <h2>Dashboard</h2>

                <p>
                    {today.toDateString()}
                </p>

            </div>

            <div className="topbar-right">

                <div className="search-box">

                    <FaSearch />

                    <input
                        placeholder="Search..."
                    />

                </div>

                <button className="icon-btn">

                    <FaBell />

                </button>

                <button className="icon-btn">

                    <FaMoon />

                </button>

                <div className="profile">

                    <FaUserCircle size={34}/>

                    <span>Vaishnavi</span>

                </div>

            </div>

        </div>

    );

}

export default Topbar;