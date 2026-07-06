function AILeadCard({lead}) {
    if (!lead) {
        return null;
    }
    return (

        <div
            style={{
                background: "white",
                borderRadius: "14px",
                padding: "25px",
                boxShadow: "0 3px 10px rgba(0,0,0,.08)",
                display: "grid",
                gridTemplateColumns: "1.7fr 1fr 0.7fr",
                gap: "20px",
                alignItems: "center"
            }}
        >

            {/* LEFT */}

            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "18px"
                }}
            >

                <div
                    style={{
                        width: "75px",
                        height: "75px",
                        borderRadius: "50%",
                        background: "#e0e7ff",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontWeight: "bold",
                        fontSize: "28px",
                        color: "#4338ca"
                    }}
                >
                    RS
                </div>

                <div>

                    <h2 style={{ margin: 0 }}>
                        {lead.name}
                    </h2>

                    <p style={{ margin: "6px 0", color: "#64748b" }}>
                        {lead.company}
                    </p>

                    <p style={{ margin: "6px 0" }}>
                        📧 {lead.email}
                    </p>

                    <p style={{ margin: "6px 0" }}>
                        📞 {lead.phone}
                    </p>

                </div>

            </div>

            {/* CENTER */}

            <div>

                <p><b>Course Interest</b></p>
                <p>{lead.course_interest}</p>

                <p><b>City</b></p>
                <p>{lead.city}</p>

                <p><b>Lead Source</b></p>
                <p>{lead.source}</p>

            </div>

            {/* RIGHT */}

            <div>

                <h3 style={{ marginBottom: "10px" }}>
                    Lead Score
                </h3>

                <h1
                    style={{
                        color: "#16a34a",
                        margin: 0
                    }}
                >
                    {lead.lead_score}/100
                </h1>

                <p
                    style={{
                        marginTop: "18px",
                        fontWeight: "bold"
                    }}
                >
                    Priority
                </p>

                <span
                    style={{
                        background:
                            lead.priority === "Hot"
                                ? "#fee2e2"
                                : "#fef3c7",

                        color:
                            lead.priority === "Hot"
                                ? "#dc2626"
                                : "#ca8a04",

                        padding: "6px 14px",
                        borderRadius: "20px",
                        fontWeight: "bold"
                    }}
                >
                    🔥 {lead.priority}
                </span>

                <br />
                <br />

                <span
                    style={{
                        background: "#dcfce7",
                        color: "#15803d",
                        padding: "6px 14px",
                        borderRadius: "20px",
                        fontWeight: "bold"
                    }}
                >
                    {lead.status}
                </span>

            </div>

        </div>

    );

}

export default AILeadCard;