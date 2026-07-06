import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import "../dashboard.css";
import RecentLeads from "../components/RecentLeads";
import Topbar from "../components/Topbar";

function Dashboard() {

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

        } catch (err) {

            console.log(err);

        }
    };

    return (

        <div className="dashboard-layout">

            <Sidebar />

            <div className="dashboard-content">

                <Topbar />

                <div className="stats-grid">
                    <div className="card total">
                        <h2>👥 Total Leads</h2>
                        <h1>{stats.total}</h1>
                    </div>

                <div className="card new">
                    <h2>🟦 New</h2>
                    <h1>{stats.newLeads}</h1>
                </div>

                <div className="card contacted">
                    <h2>📞 Contacted</h2>
                    <h1>{stats.contacted}</h1>
                </div>

                <div className="card interested">
                    <h2>💡 Interested</h2>
                    <h1>{stats.interested}</h1>
                </div>

                <div className="card followup">
                    <h2>🔄 Follow-up</h2>
                    <h1>{stats.followup}</h1>
                </div>

                <div className="card qualified">
                    <h2>🎓 Qualified</h2>
                    <h1>{stats.qualified}</h1>
                </div>

                <div className="card enrolled">
                    <h2>✅ Enrolled</h2>
                    <h1>{stats.enrolled}</h1>
                </div>

                <div className="card rejected">
                    <h2>❌ Rejected</h2>
                    <h1>{stats.rejected}</h1>
                </div>

            </div>
            <RecentLeads />
        </div>
        </div>
    );
}

export default Dashboard;