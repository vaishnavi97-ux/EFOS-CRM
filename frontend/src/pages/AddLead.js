import { useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

function AddLead() {
  const [lead, setLead] = useState({
    company: "",
    name: "",
    email: "",
    phone: "",
    city: "",
    qualification: "B.Tech",
    course_interest: "Full Stack",
    source: "",
    assigned_to: "",
    status: "New",
  });

  const handleChange = (e) => {
    setLead({
      ...lead,
      [e.target.name]: e.target.value,
    });
  };

  const addLead = async () => {
    try {
      const res = await axios.post(
        "https://efos-crm-production.up.railway.app/api/leads/add",
        lead
      );

      alert(res.data.message);

      setLead({
        company: "",
        name: "",
        email: "",
        phone: "",
        status: "New",
        assigned_to: ""
      });

    } catch (err) {
      alert("Failed to add lead");
      console.log(err);
    }
  };

  return (
    <>
      <Sidebar />

      <div
        style={{
          marginLeft: "270px",
          padding: "40px",
          minHeight: "100vh",
          background: "#f5f7fb",
        }}
      >
        <h1>Add Lead</h1>

        <div
          style={{
            background: "#fff",
            padding: "30px",
            borderRadius: "10px",
            width: "500px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          }}
        >
          <input
            name="company"
            placeholder="Company Name"
            value={lead.company}
            onChange={handleChange}
            style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
          />

          <input
            name="name"
            placeholder="Contact Person"
            value={lead.name}
            onChange={handleChange}
            style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
          />

          <input
            name="email"
            placeholder="Email"
            value={lead.email}
            onChange={handleChange}
            style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
          />

          <input
            name="phone"
            placeholder="Phone"
            value={lead.phone}
            onChange={handleChange}
            style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
          />

          <input

name="city"
placeholder="City"
value={lead.city}
onChange={handleChange}
style={{
width:"100%",
padding:"10px",
marginBottom:"15px"
}}
/>

          <input
            name="assigned_to"
            placeholder="Assigned To"
            value={lead.assigned_to}
            onChange={handleChange}
            style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
          />

          <select
            name="status"
            value={lead.status}
            onChange={handleChange}
            style={{ width: "100%", padding: "10px", marginBottom: "20px" }}
          >
            <option>New</option>
            <option>Contacted</option>
            <option>Interested</option>
            <option>Follow-up</option>
            <option>Qualified</option>
            <option>Enrolled</option>
            <option>Rejected</option>
          </select>

          <select name="Lead Source" value={lead.source} onChange={handleChange} style={{ width: "100%", padding: "10px", marginBottom: "20px" }}>
            <option value="">Select Lead Source</option>
            <option value="Website">Website</option>
            <option value="Referral">LinkedIn</option>
            <option value="Social Media">Instagram</option>
            <option value="Advertisement">Facebook</option>
            <option value="Other">Other</option>
          </select>
          <select name="qualification" value={lead.qualification} onChange={handleChange} style={{ width: "100%", padding: "10px", marginBottom: "20px" }}>
            <option>10th</option>
            <option>Intermediate</option>
            <option>Diploma</option>
            <option>B.Tech</option>
            <option>B.Sc</option>
            <option>B.Com</option>
            <option>M.Tech</option>
            <option>MBA</option>
            <option>Other</option>
          </select>
          <select name="interest" value={lead.interest} onChange={handleChange} style={{ width: "100%", padding: "10px", marginBottom: "20px" }}>
            <option>Full Stack</option>
            <option>Java</option>
            <option>Python</option>
            <option>Data Science</option>
            <option>AI & ML</option>
            <option>Cloud Computing</option>
            <option>DevOps</option>
            <option>Cyber Security</option>
          </select>
          <button
            onClick={addLead}
            style={{
              background: "#2563eb",
              color: "#fff",
              border: "none",
              padding: "12px 20px",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Add Lead
          </button>
        </div>
      </div>
    </>
  );
}

export default AddLead;