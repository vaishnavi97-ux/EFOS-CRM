import { useState, useEffect } from "react";
import axios from "axios";


function AITabs({ lead,selectedTemplate }) {

    const [activeTab, setActiveTab] = useState("email");

    const [message, setMessage] = useState("");

    useEffect(() => {

    if(selectedTemplate){

        setMessage(selectedTemplate);

    }

}, [selectedTemplate]);

    const [loading, setLoading] = useState(false);

    const tabs = [

        ["email", "📧 Email"],

        ["whatsapp", "💬 WhatsApp"],

        ["sms", "📱 SMS"],

        ["followup", "📞 Follow-up"],

        ["reply", "💡 Reply Suggestions"]

    ];

    const generateAI = async () => {

        if (!lead) return;

        try {

            setLoading(true);

            const res = await axios.post(

                "http://localhost:5000/api/communication/generate",

                {

                    type: activeTab,

                    lead,
                    template: message

                }

            );

            setMessage(res.data.message);

        }

        catch (err) {

            console.log(err);

            alert("Failed to generate AI message.");

        }

        finally {

            setLoading(false);

        }

    };

    const copyMessage = () => {

        navigator.clipboard.writeText(message);

        alert("Copied Successfully!");

    };

    return (

        <div
            style={{
                background: "white",
                borderRadius: "14px",
                boxShadow: "0 3px 10px rgba(0,0,0,.08)",
                overflow: "hidden"
            }}
        >

            {/* Tabs */}

            <div
                style={{
                    display: "flex",
                    borderBottom: "1px solid #e5e7eb",
                    overflowX: "auto"
                }}
            >

                {

                    tabs.map(tab => (

                        <button

                            key={tab[0]}

                            onClick={() => {

                                setActiveTab(tab[0]);

                                setMessage("");

                            }}

                            style={{

                                padding: "16px 22px",

                                border: "none",

                                cursor: "pointer",

                                background:

                                    activeTab === tab[0]

                                        ? "#eef2ff"

                                        : "white",

                                color:

                                    activeTab === tab[0]

                                        ? "#4338ca"

                                        : "#475569",

                                fontWeight: "bold"

                            }}

                        >

                            {tab[1]}

                        </button>

                    ))

                }

            </div>

            {/* Message */}

            <div
                style={{
                    padding: "25px"
                }}
            >

                <textarea

                    value={message}

                    readOnly

                    placeholder="Click Generate to create AI message..."

                    style={{

                        width: "100%",

                        height: "300px",

                        resize: "none",

                        padding: "18px",

                        borderRadius: "10px",

                        border: "1px solid #d1d5db",

                        fontSize: "15px",

                        lineHeight: "28px",

                        background: "#fafafa"

                    }}

                />

                <div

                    style={{

                        display: "flex",

                        justifyContent: "space-between",

                        marginTop: "20px"

                    }}

                >

                    <button

                        onClick={generateAI}

                        disabled={loading}

                        style={{

                            padding: "12px 24px",

                            border: "none",

                            borderRadius: "8px",

                            background: "#6366f1",

                            color: "white",

                            cursor: "pointer",

                            fontWeight: "bold"

                        }}

                    >

                        {

                            loading

                                ? "Generating..."

                                : "✨ Generate"

                        }

                    </button>

                    <button

                        onClick={copyMessage}

                        style={{

                            padding: "12px 24px",

                            borderRadius: "8px",

                            border: "1px solid #d1d5db",

                            background: "white",

                            cursor: "pointer"

                        }}

                    >

                        📋 Copy

                    </button>

                </div>

            </div>

        </div>

    );

}

export default AITabs;