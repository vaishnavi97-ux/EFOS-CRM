import { useEffect, useState } from "react";
import axios from "axios";

function RecentLeads() {

    const [recent, setRecent] = useState([]);

    useEffect(() => {
        fetchRecent();
    }, []);

    const fetchRecent = async () => {
        try {

            const res = await axios.get(
                "http://localhost:5000/api/leads/recent"
            );

            setRecent(res.data);

        } catch (err) {
            console.log(err);
        }
    };

    return (

        <div
            style={{
                marginTop: "40px",
                background: "white",
                padding: "25px",
                borderRadius: "12px",
                boxShadow: "0 2px 8px rgba(0,0,0,.1)"
            }}
        >

            <h2>🕒 Recent Leads</h2>

            <table style={{width:"100%"}}>

                <thead>

                    <tr>

                        <th align="left">Company</th>

                        <th align="left">Contact</th>

                        <th align="left">Status</th>

                    </tr>

                </thead>

                <tbody>

                {recent.map((lead)=>(
                    <tr key={lead.id}>

                        <td>{lead.company}</td>

                        <td>{lead.name}</td>

                        <td>{lead.status}</td>

                    </tr>
                ))}

                </tbody>

            </table>

        </div>

    );

}

export default RecentLeads;