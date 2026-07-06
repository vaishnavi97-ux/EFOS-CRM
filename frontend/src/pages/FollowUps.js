import { useEffect, useState } from "react";
import axios from "axios";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

function FollowUps() {

    /* ==========================
       STATES
    ========================== */

    const [leads, setLeads] = useState([]);

    const [search, setSearch] = useState("");

    const [statusFilter, setStatusFilter] = useState("All");

    const [loading, setLoading] = useState(false);

    /* ==========================
       FETCH LEADS
    ========================== */

    useEffect(() => {

        fetchLeads();

    }, []);

    const fetchLeads = async () => {

        try {

            setLoading(true);

            const res = await axios.get(
                "https://efos-crm-production.up.railway.app/api/leads"
            );

            setLeads(res.data);

        }

        catch (err) {

            console.log(err);

        }

        finally {

            setLoading(false);

        }

    };

    /* ==========================
       FILTER FOLLOWUPS
    ========================== */

    const followUps = leads.filter((lead) => {

        const searchMatch =

            lead.name.toLowerCase().includes(search.toLowerCase()) ||

            lead.company.toLowerCase().includes(search.toLowerCase());

        const statusMatch =

            statusFilter === "All"

                ? true

                : lead.status === statusFilter;

        return (

            lead.status === "Follow-up"

            &&

            searchMatch

            &&

            statusMatch

        );

    });

    /* ==========================
       STATISTICS
    ========================== */

    const totalFollowUps =

        leads.filter(

            lead => lead.status === "Follow-up"

        ).length;

    const pendingFollowUps =

        followUps.length;

    const completedFollowUps =

        leads.filter(

            lead =>

                lead.status === "Contacted"

        ).length;
    
    const completeFollowUp = async (id) => {

    try {

        await axios.put(

            `https://efos-crm-production.up.railway.app/api/leads/${id}`,

            {

                status:"Contacted"

            }

        );

        fetchLeads();

    }

    catch(err){

        console.log(err);

    }

};
            return (
                <>

            <Sidebar />

            <Topbar />

            <div

                style={{

                    marginLeft: "270px",

                    marginTop: "70px",

                    padding: "25px",

                    background: "#f4f7fb",

                    minHeight: "100vh"

                }}

            >
                            {/* =====================================
                    PAGE HEADER
            ====================================== */}

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "30px",
                    flexWrap: "wrap",
                    gap: "15px"
                }}
            >

                <div>

                    <h1
                        style={{
                            margin: 0,
                            color: "#1e293b",
                            fontSize: "34px"
                        }}
                    >
                        📞 Follow Ups
                    </h1>

                    <p
                        style={{
                            color: "#64748b",
                            marginTop: "8px"
                        }}
                    >
                        Manage and track pending student follow-ups.
                    </p>

                </div>

                <button

                    onClick={fetchLeads}

                    style={{

                        padding: "12px 22px",

                        background: "#4f46e5",

                        color: "white",

                        border: "none",

                        borderRadius: "8px",

                        cursor: "pointer",

                        fontWeight: "bold"

                    }}

                >

                    🔄 Refresh

                </button>

            </div>

            {/* =====================================
                    STATISTICS
            ====================================== */}

            <div

                style={{

                    display: "grid",

                    gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",

                    gap: "20px",

                    marginBottom: "30px"

                }}

            >

                <div

                    style={{

                        background: "white",

                        borderRadius: "14px",

                        padding: "22px",

                        boxShadow: "0 3px 10px rgba(0,0,0,.08)"

                    }}

                >

                    <h4
                        style={{
                            margin: 0,
                            color: "#64748b"
                        }}
                    >
                        Total Follow-ups
                    </h4>

                    <h1
                        style={{
                            marginTop: "15px",
                            color: "#2563eb"
                        }}
                    >
                        {totalFollowUps}
                    </h1>

                </div>

                <div

                    style={{

                        background: "white",

                        borderRadius: "14px",

                        padding: "22px",

                        boxShadow: "0 3px 10px rgba(0,0,0,.08)"

                    }}

                >

                    <h4
                        style={{
                            margin: 0,
                            color: "#64748b"
                        }}
                    >
                        Pending
                    </h4>

                    <h1
                        style={{
                            marginTop: "15px",
                            color: "#f59e0b"
                        }}
                    >
                        {pendingFollowUps}
                    </h1>

                </div>

                <div

                    style={{

                        background: "white",

                        borderRadius: "14px",

                        padding: "22px",

                        boxShadow: "0 3px 10px rgba(0,0,0,.08)"

                    }}

                >

                    <h4
                        style={{
                            margin: 0,
                            color: "#64748b"
                        }}
                    >
                        Completed
                    </h4>

                    <h1
                        style={{
                            marginTop: "15px",
                            color: "#22c55e"
                        }}
                    >
                        {completedFollowUps}
                    </h1>

                </div>

            </div>

            {/* =====================================
                    SEARCH & FILTER
            ====================================== */}

            <div

                style={{

                    display: "flex",

                    gap: "15px",

                    marginBottom: "30px",

                    flexWrap: "wrap"

                }}

            >

                <input

                    type="text"

                    placeholder="🔍 Search Lead..."

                    value={search}

                    onChange={(e)=>setSearch(e.target.value)}

                    style={{

                        flex: 1,

                        minWidth: "280px",

                        padding: "14px",

                        borderRadius: "10px",

                        border: "1px solid #d1d5db"

                    }}

                />

                <select

                    value={statusFilter}

                    onChange={(e)=>setStatusFilter(e.target.value)}

                    style={{

                        width: "220px",

                        padding: "14px",

                        borderRadius: "10px",

                        border: "1px solid #d1d5db"

                    }}

                >

                    <option>All</option>

                    <option>Follow-up</option>

                </select>

            </div>
                        {/* =====================================
                    FOLLOW-UP CARDS
            ====================================== */}

            {

                loading ? (

                    <div
                        style={{
                            textAlign: "center",
                            padding: "60px",
                            color: "#64748b",
                            fontSize: "18px"
                        }}
                    >
                        Loading follow-ups...
                    </div>

                ) :

                followUps.length === 0 ? (

                    <div
                        style={{
                            background: "white",
                            borderRadius: "14px",
                            padding: "40px",
                            textAlign: "center",
                            color: "#64748b",
                            boxShadow: "0 3px 10px rgba(0,0,0,.08)"
                        }}
                    >
                        No Follow-up Leads Found.
                    </div>

                ) :

                (

                    <div

                        style={{

                            display: "grid",

                            gridTemplateColumns:
                                "repeat(auto-fit,minmax(360px,1fr))",

                            gap: "22px"

                        }}

                    >

                        {

                            followUps.map((lead)=>(

                                <div

                                    key={lead.id}

                                    style={{

                                        background:"white",

                                        borderRadius:"14px",

                                        padding:"22px",

                                        boxShadow:
                                            "0 3px 12px rgba(0,0,0,.08)",

                                        borderLeft:
                                            "5px solid #f59e0b"

                                    }}

                                >

                                    <div

                                        style={{

                                            display:"flex",

                                            justifyContent:
                                                "space-between",

                                            alignItems:"center",

                                            marginBottom:"15px"

                                        }}

                                    >

                                        <div>

                                            <h3
                                                style={{
                                                    margin:0,
                                                    color:"#1e293b"
                                                }}
                                            >
                                                👤 {lead.name}
                                            </h3>

                                            <p
                                                style={{
                                                    marginTop:"6px",
                                                    color:"#64748b"
                                                }}
                                            >
                                                {lead.company}
                                            </p>

                                        </div>

                                        <span

                                            style={{

                                                background:"#fff7ed",

                                                color:"#ea580c",

                                                padding:
                                                    "6px 14px",

                                                borderRadius:"20px",

                                                fontWeight:"bold",

                                                fontSize:"13px"

                                            }}

                                        >

                                            {lead.status}

                                        </span>

                                    </div>

                                    <hr />

                                    <p>
                                        📚 <b>Course:</b>{" "}
                                        {lead.course_interest}
                                    </p>

                                    <p>
                                        🎓 <b>Qualification:</b>{" "}
                                        {lead.qualification}
                                    </p>

                                    <p>
                                        📞 <b>Phone:</b>{" "}
                                        {lead.phone}
                                    </p>

                                    <p>
                                        📧 <b>Email:</b>{" "}
                                        {lead.email}
                                    </p>

                                    <p>
                                        📍 <b>City:</b>{" "}
                                        {lead.city}
                                    </p>

                                    <p>
                                        ⭐ <b>Priority:</b>{" "}
                                        {lead.priority}
                                    </p>

                                    <div

                                        style={{

                                            display:"grid",

                                            gridTemplateColumns:
                                                "1fr 1fr",

                                            gap:"10px",

                                            marginTop:"20px"

                                        }}

                                    >

                                        <button

                                            onClick={()=>{

                                                window.location.href =
                                                `tel:${lead.phone}`;

                                            }}

                                            style={{

                                                padding:"12px",

                                                border:"none",

                                                borderRadius:"8px",

                                                background:"#2563eb",

                                                color:"white",

                                                cursor:"pointer"

                                            }}

                                        >

                                            📞 Call

                                        </button>

                                        <button

                                            onClick={()=>{

                                                window.location.href =
                                                `mailto:${lead.email}`;

                                            }}

                                            style={{

                                                padding:"12px",

                                                border:"none",

                                                borderRadius:"8px",

                                                background:"#16a34a",

                                                color:"white",

                                                cursor:"pointer"

                                            }}

                                        >

                                            📧 Email

                                        </button>

                                        <button
                                         onClick={() => {

        window.location.href =
        `/ai-communication?id=${lead.id}`;

    }}

                                            style={{

                                                padding:"12px",

                                                border:"none",

                                                borderRadius:"8px",

                                                background:"#7c3aed",

                                                color:"white",

                                                cursor:"pointer"

                                            }}

                                        >

                                            🤖 AI Message

                                        </button>

                                        <button

    onClick={() => completeFollowUp(lead.id)}

    style={{

        padding:"12px",

        border:"none",

        borderRadius:"8px",

        background:"#f59e0b",

        color:"white",

        cursor:"pointer"

    }}

>

    ✔ Complete

</button>

                                    </div>

                                </div>

                            ))

                        }

                    </div>

                )

            }
                        {/* =====================================
                    END OF PAGE
            ====================================== */}

        </div>

    </>

);

}

export default FollowUps;