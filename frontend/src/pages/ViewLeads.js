import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

function ViewLeads() {

    const [leads, setLeads] = useState([]);

    const [editingLead, setEditingLead] = useState(null);

    const [search, setSearch] = useState("");

    const [statusFilter, setStatusFilter] = useState("All");

    const [currentPage, setCurrentPage] = useState(1);

    const leadsPerPage = 8;

    useEffect(() => {

        fetchLeads();

    }, []);

    const fetchLeads = async () => {

        try {

            const res = await axios.get(
                "http://localhost:5000/api/leads"
            );

            setLeads(res.data);

        } catch (err) {

            console.log(err);

            alert("Failed to load leads");

        }

    };

    const deleteLead = async (id) => {

        if (!window.confirm("Delete this lead?"))
            return;

        try {

            await axios.delete(
                `http://localhost:5000/api/leads/${id}`
            );

            alert("Lead Deleted Successfully");

            fetchLeads();

        } catch (err) {

            console.log(err);

            alert("Failed to delete lead");

        }

    };

    const editLead = (lead) => {

        setEditingLead({
            ...lead
        });

    };
    /* ===========================================
   UPDATE LEAD
=========================================== */

const updateLead = async () => {

    try {

        // Calculate AI Score
        let score = 0;

        if (editingLead.qualification === "B.Tech") score += 25;
        else if (editingLead.qualification === "Diploma") score += 20;
        else if (editingLead.qualification === "Intermediate") score += 15;
        else score += 10;

        if (editingLead.course_interest === "AI & ML") score += 20;
        else if (editingLead.course_interest === "Data Science") score += 18;
        else if (editingLead.course_interest === "Cloud Computing") score += 16;
        else if (editingLead.course_interest === "Full Stack") score += 15;
        else score += 10;

        if (editingLead.source === "Referral") score += 20;
        else if (editingLead.source === "LinkedIn") score += 18;
        else if (editingLead.source === "Website") score += 15;
        else if (editingLead.source === "Instagram") score += 10;
        else score += 8;

        switch (editingLead.status) {

            case "Qualified":
                score += 20;
                break;

            case "Interested":
                score += 15;
                break;

            case "Follow-up":
                score += 12;
                break;

            case "Contacted":
                score += 10;
                break;

            case "Enrolled":
                score = 100;
                break;

            default:
                break;

        }

        if (score > 100)
            score = 100;

        let priority = "Low";

        if (score >= 90)
            priority = "Hot";
        else if (score >= 70)
            priority = "High";
        else if (score >= 50)
            priority = "Medium";

        await axios.put(

            `http://localhost:5000/api/leads/${editingLead.id}`,

            {
                ...editingLead,
                lead_score: score,
                priority: priority
            }

        );

        alert("Lead Updated Successfully");

        setEditingLead(null);

        fetchLeads();

    } catch (err) {

        console.log(err);

        alert("Failed to update lead");

    }

};

/* ===========================================
   EXPORT EXCEL
=========================================== */

const exportExcel = () => {

    const data = filteredLeads.map((lead) => ({
        ID: lead.id,
        Company: lead.company,
        Contact: lead.name,
        Email: lead.email,
        Phone: lead.phone,
        City: lead.city,
        Qualification: lead.qualification,
        Course: lead.course_interest,
        Source: lead.source,
        Status: lead.status,
        "AI Score": lead.lead_score,
        Priority: lead.priority,
        AssignedTo: lead.assigned_to
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Leads");

    const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array"
    });

    const blob = new Blob(
        [excelBuffer],
        {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        }
    );

    saveAs(blob, "EFOS_Leads.xlsx");

};

/* ===========================================
   EXPORT PDF
=========================================== */

const exportPDF = () => {

    const pdf = new jsPDF();

autoTable(pdf, {
    head: [[
        "ID",
        "Company",
        "Name",
        "City",
        "Qualification",
        "Course",
        "Status",
        "Score"
    ]],
    body: filteredLeads.map(lead => [
        lead.id,
        lead.company,
        lead.name,
        lead.city,
        lead.qualification,
        lead.course_interest,
        lead.status,
        lead.lead_score
    ])
});

pdf.save("EFOS_Leads.pdf");

};

/* ===========================================
   SEARCH + FILTER
=========================================== */

const filteredLeads = leads.filter((lead) => {

    const matchesSearch =

        lead.company.toLowerCase().includes(search.toLowerCase()) ||

        lead.name.toLowerCase().includes(search.toLowerCase()) ||

        lead.email.toLowerCase().includes(search.toLowerCase()) ||

        (lead.city || "").toLowerCase().includes(search.toLowerCase());

    const matchesStatus =

        statusFilter === "All" ||

        lead.status === statusFilter;

    return matchesSearch && matchesStatus;

});

/* ===========================================
   PAGINATION
=========================================== */

const indexOfLastLead = currentPage * leadsPerPage;

const indexOfFirstLead = indexOfLastLead - leadsPerPage;

const currentLeads = filteredLeads.slice(

    indexOfFirstLead,

    indexOfLastLead

);

const totalPages = Math.ceil(

    filteredLeads.length / leadsPerPage

);
return (
<>
<Sidebar />

<div
style={{
marginLeft:"270px",
padding:"35px",
background:"#f8fafc",
minHeight:"100vh"
}}
>

{/* Page Header */}

<div
style={{
display:"flex",
justifyContent:"space-between",
alignItems:"center",
marginBottom:"30px"
}}
>

<div>

<h1
style={{
margin:0,
color:"#1e293b"
}}
>
Lead Management
</h1>

<p
style={{
marginTop:"8px",
color:"#64748b"
}}
>
Manage and track all your leads efficiently.
</p>

</div>

<div
style={{
display:"flex",
gap:"12px"
}}
>

<button
onClick={exportExcel}
style={{
background:"#2563eb",
color:"white",
padding:"12px 20px",
border:"none",
borderRadius:"8px",
cursor:"pointer"
}}
>
Export Excel
</button>

<button
onClick={exportPDF}
style={{
background:"#16a34a",
color:"white",
padding:"12px 20px",
border:"none",
borderRadius:"8px",
cursor:"pointer"
}}
>
Export PDF
</button>

</div>

</div>

{/* Search & Filter */}

<div
style={{
display:"flex",
justifyContent:"space-between",
alignItems:"center",
gap:"15px",
marginBottom:"25px",
flexWrap:"wrap"
}}
>

<input
type="text"
placeholder="Search company, contact, city..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
style={{
width:"360px",
padding:"12px",
borderRadius:"8px",
border:"1px solid #d1d5db",
fontSize:"15px"
}}
/>

<select
value={statusFilter}
onChange={(e)=>setStatusFilter(e.target.value)}
style={{
padding:"12px",
borderRadius:"8px",
border:"1px solid #d1d5db",
fontSize:"15px"
}}
>

<option value="All">All Status</option>
<option>New</option>
<option>Contacted</option>
<option>Interested</option>
<option>Follow-up</option>
<option>Qualified</option>
<option>Enrolled</option>
<option>Rejected</option>

</select>

</div>

{/* Edit Card */}

{
editingLead && (

<div
style={{
background:"white",
padding:"25px",
borderRadius:"12px",
boxShadow:"0 5px 15px rgba(0,0,0,.08)",
marginBottom:"30px"
}}
>

<h2>Edit Lead</h2>

<div
style={{
display:"grid",
gridTemplateColumns:"repeat(2,1fr)",
gap:"15px"
}}
>

<input
placeholder="Company"
value={editingLead.company}
onChange={(e)=>setEditingLead({...editingLead,company:e.target.value})}
/>

<input
placeholder="Contact Person"
value={editingLead.name}
onChange={(e)=>setEditingLead({...editingLead,name:e.target.value})}
/>

<input
placeholder="Email"
value={editingLead.email}
onChange={(e)=>setEditingLead({...editingLead,email:e.target.value})}
/>

<input
placeholder="Phone"
value={editingLead.phone}
onChange={(e)=>setEditingLead({...editingLead,phone:e.target.value})}
/>

<input
placeholder="City"
value={editingLead.city}
onChange={(e)=>setEditingLead({...editingLead,city:e.target.value})}
/>

<input
placeholder="Qualification"
value={editingLead.qualification}
onChange={(e)=>setEditingLead({...editingLead,qualification:e.target.value})}
/>

<select
    name="course_interest"
    value={editingLead.course_interest || ""}
    onChange={(e) =>
        setEditingLead({
            ...editingLead,
            course_interest: e.target.value
        })
    }
>
    <option value="">Select Course</option>
    <option value="Full Stack">Full Stack</option>
    <option value="Java">Java</option>
    <option value="Python">Python</option>
    <option value="Data Science">Data Science</option>
    <option value="AI & ML">AI & ML</option>
    <option value="Cloud Computing">Cloud Computing</option>
    <option value="DevOps">DevOps</option>
    <option value="Cyber Security">Cyber Security</option>
</select>

<select
    name="source"
    value={editingLead.source || ""}
    onChange={(e)=>
        setEditingLead({
            ...editingLead,
            source:e.target.value
        })
    }
>
    <option value="">Select Source</option>
    <option value="Website">Website</option>
    <option value="LinkedIn">LinkedIn</option>
    <option value="Instagram">Instagram</option>
    <option value="Facebook">Facebook</option>
    <option value="Referral">Referral</option>
    <option value="Other">Other</option>
</select>
<input
placeholder="Assigned To"
value={editingLead.assigned_to}
onChange={(e)=>setEditingLead({...editingLead,assigned_to:e.target.value})}
/>

<select
value={editingLead.status}
onChange={(e)=>setEditingLead({...editingLead,status:e.target.value})}
>

<option>New</option>
<option>Contacted</option>
<option>Interested</option>
<option>Follow-up</option>
<option>Qualified</option>
<option>Enrolled</option>
<option>Rejected</option>

</select>

<textarea
rows="4"
placeholder="Notes"
value={editingLead.notes}
onChange={(e)=>setEditingLead({...editingLead,notes:e.target.value})}
style={{
gridColumn:"1 / span 2",
padding:"12px"
}}
/>

</div>

<div
style={{
marginTop:"20px",
display:"flex",
gap:"15px"
}}
>

<button
onClick={updateLead}
style={{
background:"#2563eb",
color:"white",
padding:"12px 20px",
border:"none",
borderRadius:"8px",
cursor:"pointer"
}}
>
Update Lead
</button>

<button
onClick={()=>setEditingLead(null)}
style={{
background:"#e5e7eb",
padding:"12px 20px",
border:"none",
borderRadius:"8px",
cursor:"pointer"
}}
>
Cancel
</button>

</div>

</div>

)
}

{/* Leads Table */}
<table
style={{
    width: "100%",
    borderCollapse: "collapse",
    background: "#fff",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 5px 15px rgba(0,0,0,.08)"
}}
>

<thead
style={{
    background: "#1e293b",
    color: "white"
}}
>

<tr>

<th style={{padding:"14px"}}>ID</th>
<th>Company</th>
<th>Contact</th>
<th>City</th>
<th>Qualification</th>
<th>Course</th>
<th>Source</th>
<th>AI Score</th>
<th>Priority</th>
<th>Status</th>
<th>Assigned To</th>
<th>Actions</th>

</tr>

</thead>

<tbody>

{

currentLeads.length===0 ?

<tr>

<td
colSpan="12"
style={{
padding:"35px",
textAlign:"center",
color:"#64748b"
}}
>

No Leads Found

</td>

</tr>

:

currentLeads.map((lead)=>(

<tr
key={lead.id}
style={{
borderBottom:"1px solid #e5e7eb"
}}
>

<td style={{padding:"14px"}}>{lead.id}</td>

<td>{lead.company}</td>

<td>{lead.name}</td>

<td>{lead.city}</td>

<td>{lead.qualification}</td>

<td>{lead.course_interest}</td>

<td>

<span
style={{
background:"#dbeafe",
color:"#1d4ed8",
padding:"6px 12px",
borderRadius:"20px",
fontSize:"13px",
fontWeight:"600"
}}
>

{lead.source}

</span>

</td>

<td>

<span
style={{
background:"#ecfeff",
color:"#0f766e",
padding:"6px 12px",
borderRadius:"20px",
fontWeight:"bold"
}}
>

{lead.lead_score}/100

</span>

</td>

<td>

<span
style={{
padding:"6px 12px",
borderRadius:"20px",
fontWeight:"bold",
color:"white",

background:

lead.priority==="Hot"
? "#dc2626"

:lead.priority==="High"
? "#f97316"

:lead.priority==="Medium"
? "#eab308"

:"#22c55e"

}}
>

{lead.priority}

</span>

</td>

<td>

<span
style={{
padding:"6px 12px",
borderRadius:"20px",
color:"white",
fontWeight:"bold",

background:

lead.status==="New"
? "#2563eb"

:lead.status==="Contacted"
? "#f59e0b"

:lead.status==="Interested"
? "#7c3aed"

:lead.status==="Follow-up"
? "#fb923c"

:lead.status==="Qualified"
? "#16a34a"

:lead.status==="Enrolled"
? "#15803d"

:"#dc2626"

}}
>

{lead.status}

</span>

</td>

<td>{lead.assigned_to}</td>

<td>

<div
style={{
display:"flex",
gap:"8px"
}}
>

<button

onClick={()=>editLead(lead)}

style={{
background:"#2563eb",
color:"white",
border:"none",
padding:"8px 14px",
borderRadius:"6px",
cursor:"pointer"
}}

>

Edit

</button>

<button

onClick={()=>deleteLead(lead.id)}

style={{
background:"#dc2626",
color:"white",
border:"none",
padding:"8px 14px",
borderRadius:"6px",
cursor:"pointer"
}}

>

Delete

</button>

</div>

</td>

</tr>

))

}

</tbody>

</table>

{/* Pagination */}

<div

style={{

display:"flex",

justifyContent:"space-between",

alignItems:"center",

marginTop:"25px"

}}

>

<button

disabled={currentPage===1}

onClick={()=>setCurrentPage(currentPage-1)}

style={{

padding:"10px 18px",

border:"none",

background:"#2563eb",

color:"white",

borderRadius:"8px",

cursor:"pointer"

}}

>

Previous

</button>

<div>

<strong>

Page {currentPage} of {totalPages}

</strong>

</div>

<button

disabled={currentPage===totalPages}

onClick={()=>setCurrentPage(currentPage+1)}

style={{

padding:"10px 18px",

border:"none",

background:"#2563eb",

color:"white",

borderRadius:"8px",

cursor:"pointer"

}}

>

Next

</button>

</div>

</div>

</>

);

}

export default ViewLeads;