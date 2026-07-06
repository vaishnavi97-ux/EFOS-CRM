import { useEffect, useState } from "react";
import axios from "axios";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import Charts from "../components/Charts";

function Analytics() {

    const [stats, setStats] = useState({
        total: 0,
        newLeads: 0,
        contacted: 0,
        interested: 0,
        followup: 0,
        qualified: 0,
        enrolled: 0,
        rejected: 0
    });

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {

        try {

            const res = await axios.get(
                "http://localhost:5000/api/leads/stats"
            );

            setStats(res.data);

        }

        catch (err) {

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

                <h1
                    style={{
                        margin: 0,
                        color: "#1e293b"
                    }}
                >
                    Analytics Dashboard
                </h1>

                <p
                    style={{
                        color: "#64748b",
                        marginTop: "8px",
                        marginBottom: "25px"
                    }}
                >
                    Analyze lead performance and CRM statistics.
                </p>

                <Charts stats={stats} />

            </div>

        </>

    );

}

export default Analytics;