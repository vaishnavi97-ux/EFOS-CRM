import { useState } from "react";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

function Settings() {

    const [theme, setTheme] = useState("Light");

    const [accentColor, setAccentColor] = useState("Blue");

    const [currentPassword, setCurrentPassword] = useState("");

    const [newPassword, setNewPassword] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("");

    const updateProfile = () => {

        alert("Profile update feature will be added soon.");

    };

    const changePassword = () => {

        if(
            newPassword !== confirmPassword
        ){

            alert("Passwords do not match.");

            return;

        }

        alert("Password changed successfully.");

        setCurrentPassword("");

        setNewPassword("");

        setConfirmPassword("");

    };

    const saveAppearance = () => {

        alert("Appearance settings saved.");

    };

    return (

        <>

            <Sidebar />

            <Topbar />

            <div

                style={{

                    marginLeft:"270px",

                    marginTop:"70px",

                    padding:"30px",

                    background:"#f4f7fb",

                    minHeight:"100vh"

                }}

            >

                <h1

                    style={{

                        margin:0,

                        color:"#1e293b",

                        fontSize:"34px"

                    }}

                >

                    Settings

                </h1>

                <p

                    style={{

                        color:"#64748b",

                        marginTop:"8px",

                        marginBottom:"35px"

                    }}

                >

                    Manage your account and CRM preferences.

                </p>

                {/* =======================================
                        PROFILE
                ======================================= */}

                <div

                    style={{

                        background:"white",

                        padding:"25px",

                        borderRadius:"12px",

                        marginBottom:"30px",

                        boxShadow:"0 3px 10px rgba(0,0,0,.08)"

                    }}

                >

                    <h2

                        style={{

                            marginTop:0,

                            marginBottom:"25px",

                            color:"#1e293b"

                        }}

                    >

                        👤 Profile

                    </h2>

                    <div style={{marginBottom:"18px"}}>

                        <label
                            style={{
                                color:"#64748b",
                                fontSize:"14px"
                            }}
                        >
                            Name
                        </label>

                        <h3
                            style={{
                                marginTop:"6px"
                            }}
                        >
                            Vaishnavi Maddenapally
                        </h3>

                    </div>

                    <div style={{marginBottom:"18px"}}>

                        <label
                            style={{
                                color:"#64748b",
                                fontSize:"14px"
                            }}
                        >
                            Email
                        </label>

                        <h3
                            style={{
                                marginTop:"6px"
                            }}
                        >
                            admin@efoscrm.com
                        </h3>

                    </div>

                    <div style={{marginBottom:"25px"}}>

                        <label
                            style={{
                                color:"#64748b",
                                fontSize:"14px"
                            }}
                        >
                            Role
                        </label>

                        <h3
                            style={{
                                marginTop:"6px"
                            }}
                        >
                            Administrator
                        </h3>

                    </div>

                    <button

                        onClick={updateProfile}

                        style={{

                            background:"#4f46e5",

                            color:"white",

                            border:"none",

                            padding:"12px 22px",

                            borderRadius:"8px",

                            cursor:"pointer"

                        }}

                    >

                        Edit Profile

                    </button>

                </div>
                                {/* =======================================
                        SECURITY
                ======================================= */}

                <div

                    style={{

                        background:"white",

                        padding:"25px",

                        borderRadius:"12px",

                        marginBottom:"30px",

                        boxShadow:"0 3px 10px rgba(0,0,0,.08)"

                    }}

                >

                    <h2

                        style={{

                            marginTop:0,

                            marginBottom:"25px",

                            color:"#1e293b"

                        }}

                    >

                        🔐 Security

                    </h2>

                    <div style={{marginBottom:"18px"}}>

                        <label>Current Password</label>

                        <input

                            type="password"

                            value={currentPassword}

                            onChange={(e)=>

                                setCurrentPassword(

                                    e.target.value

                                )

                            }

                            placeholder="Enter current password"

                            style={{

                                width:"100%",

                                marginTop:"8px",

                                padding:"12px",

                                borderRadius:"8px",

                                border:"1px solid #d1d5db"

                            }}

                        />

                    </div>

                    <div style={{marginBottom:"18px"}}>

                        <label>New Password</label>

                        <input

                            type="password"

                            value={newPassword}

                            onChange={(e)=>

                                setNewPassword(

                                    e.target.value

                                )

                            }

                            placeholder="Enter new password"

                            style={{

                                width:"100%",

                                marginTop:"8px",

                                padding:"12px",

                                borderRadius:"8px",

                                border:"1px solid #d1d5db"

                            }}

                        />

                    </div>

                    <div style={{marginBottom:"25px"}}>

                        <label>Confirm Password</label>

                        <input

                            type="password"

                            value={confirmPassword}

                            onChange={(e)=>

                                setConfirmPassword(

                                    e.target.value

                                )

                            }

                            placeholder="Confirm password"

                            style={{

                                width:"100%",

                                marginTop:"8px",

                                padding:"12px",

                                borderRadius:"8px",

                                border:"1px solid #d1d5db"

                            }}

                        />

                    </div>

                    <button

                        onClick={changePassword}

                        style={{

                            background:"#dc2626",

                            color:"white",

                            border:"none",

                            padding:"12px 22px",

                            borderRadius:"8px",

                            cursor:"pointer"

                        }}

                    >

                        Change Password

                    </button>

                </div>


                {/* =======================================
                        APPEARANCE
                ======================================= */}

                <div

                    style={{

                        background:"white",

                        padding:"25px",

                        borderRadius:"12px",

                        marginBottom:"30px",

                        boxShadow:"0 3px 10px rgba(0,0,0,.08)"

                    }}

                >

                    <h2

                        style={{

                            marginTop:0,

                            marginBottom:"25px",

                            color:"#1e293b"

                        }}

                    >

                        🎨 Appearance

                    </h2>

                    <div style={{marginBottom:"20px"}}>

                        <label>Theme</label>

                        <br /><br />

                        <label>

                            <input

                                type="radio"

                                checked={theme==="Light"}

                                onChange={()=>

                                    setTheme("Light")

                                }

                            />

                            {" "}Light

                        </label>

                        <br /><br />

                        <label>

                            <input

                                type="radio"

                                checked={theme==="Dark"}

                                onChange={()=>

                                    setTheme("Dark")

                                }

                            />

                            {" "}Dark

                        </label>

                    </div>

                    <div style={{marginBottom:"25px"}}>

                        <label>Accent Color</label>

                        <br /><br />

                        <select

                            value={accentColor}

                            onChange={(e)=>

                                setAccentColor(

                                    e.target.value

                                )

                            }

                            style={{

                                padding:"12px",

                                width:"220px",

                                borderRadius:"8px",

                                border:"1px solid #d1d5db"

                            }}

                        >

                            <option>Blue</option>

                            <option>Purple</option>

                            <option>Green</option>

                            <option>Orange</option>

                        </select>

                    </div>

                    <button

                        onClick={saveAppearance}

                        style={{

                            background:"#2563eb",

                            color:"white",

                            border:"none",

                            padding:"12px 22px",

                            borderRadius:"8px",

                            cursor:"pointer"

                        }}

                    >

                        Save Appearance

                    </button>

                </div>
                                {/* =======================================
                        ABOUT
                ======================================= */}

                <div

                    style={{

                        background:"white",

                        padding:"25px",

                        borderRadius:"12px",

                        marginBottom:"30px",

                        boxShadow:"0 3px 10px rgba(0,0,0,.08)"

                    }}

                >

                    <h2

                        style={{

                            marginTop:0,

                            marginBottom:"25px",

                            color:"#1e293b"

                        }}

                    >

                        ℹ️ About EFOS CRM

                    </h2>

                    <div style={{lineHeight:"32px"}}>

                        <p>

                            <strong>Application</strong>

                            <br />

                            EFOS CRM

                        </p>

                        <p>

                            <strong>Version</strong>

                            <br />

                            2.0.0

                        </p>

                        <p>

                            <strong>Description</strong>

                            <br />

                            AI Powered Lead Management System

                        </p>

                        <p>

                            <strong>Developed By</strong>

                            <br />

                            Vaishnavi Maddenapally

                        </p>

                        <p>

                            <strong>Technologies Used</strong>

                            <br />

                            React.js

                            <br />

                            Node.js

                            <br />

                            Express.js

                            <br />

                            MySQL

                            <br />

                            Gemini AI

                        </p>

                        <hr
                            style={{
                                margin:"25px 0"
                            }}
                        />

                        <p
                            style={{
                                color:"#64748b",
                                textAlign:"center"
                            }}
                        >

                            © 2026 EFOS CRM

                            <br />

                            All Rights Reserved

                        </p>

                    </div>

                </div>

            </div>

        </>

    );

}

export default Settings;