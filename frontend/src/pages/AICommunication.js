
import { useEffect, useState } from "react";
import axios from "axios";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

import AILeadCard from "../components/AILeadCard";
import AITabs from "../components/AITabs";
import MessageTemplates from "../components/MessageTemplates";


function AICommunication() {
    const [leads, setLeads] = useState([]);
const [selectedLead, setSelectedLead] = useState(null);
const [selectedTemplate, setSelectedTemplate] = useState("");
const [showLeadDetails, setShowLeadDetails] = useState(false);
const [loading, setLoading] = useState(false);

useEffect(() => {

    fetchLeads();

}, []);

const fetchLeads = async () => {

    try {

        setLoading(true);

        const res = await axios.get(
            "https://efos-crm-production.up.railway.app/api/communication/leads"
        );

        setLeads(res.data);

        if (res.data.length > 0) {

            setSelectedLead(res.data[0]);

        }

    }

    catch (err) {

        console.log(err);

    }

    finally {

        setLoading(false);

    }

};

const previousLead = () => {

    if (!selectedLead) return;

    const index = leads.findIndex(
        l => l.id === selectedLead.id
    );

    if (index > 0) {

        setSelectedLead(
            leads[index - 1]
        );

    }

};

const nextLead = () => {

    if (!selectedLead) return;

    const index = leads.findIndex(
        l => l.id === selectedLead.id
    );

    if (index < leads.length - 1) {

        setSelectedLead(
            leads[index + 1]
        );

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
             
                {/* Header */}

                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "25px",
                        flexWrap: "wrap",
                        gap: "15px"
                    }}
                >

                    <div>
                        <h1
                            style={{
                                margin: 0,
                                fontSize: "34px",
                                color: "#1e293b"
                            }}
                        >
                            AI Communication
                        </h1>
                        <p
                            style={{
                                color: "#64748b",
                                marginTop: "8px"
                            }}
                        >
                            Home &nbsp; &gt; &nbsp; AI Communication
                        </p>

                    </div>

                    <div
                        style={{
                            display: "flex",
                            gap: "12px"
                        }}
                    >

                        <button

onClick={previousLead}

disabled={!selectedLead}

style={{
padding:"10px 20px",
borderRadius:"8px",
border:"1px solid #d1d5db",
background:"white",
cursor:"pointer"
}}

>

← Previous Lead

</button>

                       <button

onClick={nextLead}

disabled={!selectedLead}

style={{
padding:"10px 20px",
borderRadius:"8px",
border:"none",
background:"#6366f1",
color:"white",
cursor:"pointer"
}}

>

Next Lead →

</button>

                        <button
                            style={{
                                padding: "10px 20px",
                                borderRadius: "8px",
                                border: "1px solid #d1d5db",
                                background: "white",
                                cursor: "pointer"
                            }}
                            onClick={() => setShowLeadDetails(true)}
                        >
                            👁 View Lead Details
                        </button>

                    </div>
                </div>
                          
                {/* ============================== LEAD CARD ============================== */}

                <AILeadCard lead={selectedLead} />


                {/* ==============================
                    MIDDLE SECTION
                ============================== */}

                <div
    style={{
        display: "grid",
        gridTemplateColumns: "4fr 1fr",
        gap: "20px",
        marginTop: "20px",
        alignItems: "start"
    }}
>

    {/* Left Side */}

    <AITabs
        lead={selectedLead}
        selectedTemplate={selectedTemplate}
    />

    {/* Right Side */}

    <MessageTemplates
        onSelectTemplate={setSelectedTemplate}
    />

</div>
                            </div>

                    {
showLeadDetails && selectedLead && (

<div

style={{

position:"fixed",

top:0,

left:0,

right:0,

bottom:0,

background:"rgba(0,0,0,.5)",

display:"flex",

justifyContent:"center",

alignItems:"center",

zIndex:999

}}

>

<div

style={{

width:"600px",

background:"white",

borderRadius:"14px",

padding:"30px"

}}

>

<h2>Lead Details</h2>

<hr />

<p><b>Name :</b> {selectedLead.name}</p>

<p><b>Company :</b> {selectedLead.company}</p>

<p><b>Email :</b> {selectedLead.email}</p>

<p><b>Phone :</b> {selectedLead.phone}</p>

<p><b>Qualification :</b> {selectedLead.qualification}</p>

<p><b>Course :</b> {selectedLead.course_interest}</p>

<p><b>City :</b> {selectedLead.city}</p>

<p><b>Source :</b> {selectedLead.source}</p>

<p><b>Status :</b> {selectedLead.status}</p>

<p><b>Lead Score :</b> {selectedLead.lead_score}</p>

<p><b>Priority :</b> {selectedLead.priority}</p>

<p><b>Notes :</b> {selectedLead.notes || "No notes available"}</p>

<div

style={{

marginTop:"25px",

textAlign:"right"

}}

>

<button

onClick={()=>setShowLeadDetails(false)}

style={{

padding:"10px 18px",

border:"none",

background:"#6366f1",

color:"white",

borderRadius:"8px",

cursor:"pointer"

}}

>

Close

</button>

</div>

</div>

</div>

)
}
        </>

    );

}

export default AICommunication;