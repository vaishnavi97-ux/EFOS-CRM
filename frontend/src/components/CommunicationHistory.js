function CommunicationHistory() {

    const history = [

        {
            type: "📧 Email",
            time: "2 mins ago"
        },

        {
            type: "💬 WhatsApp",
            time: "15 mins ago"
        },

        {
            type: "📞 Follow-up",
            time: "Today"
        },

        {
            type: "📱 SMS",
            time: "Yesterday"
        }

    ];

    return (

        <div
            style={{
                background: "white",
                borderRadius: "14px",
                padding: "20px",
                boxShadow: "0 3px 10px rgba(0,0,0,.08)"
            }}
        >

            <h3
                style={{
                    marginTop: 0,
                    marginBottom: "20px"
                }}
            >
                Communication History
            </h3>

            {

                history.map((item, index) => (

                    <div

                        key={index}

                        style={{
                            padding: "12px 0",
                            borderBottom: "1px solid #e5e7eb"
                        }}

                    >

                        <strong>{item.type}</strong>

                        <p
                            style={{
                                margin: "5px 0",
                                color: "#64748b",
                                fontSize: "14px"
                            }}
                        >
                            {item.time}
                        </p>

                    </div>

                ))

            }

        </div>

    );

}

export default CommunicationHistory;