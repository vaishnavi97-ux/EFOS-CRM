function AIRecommendation() {

    return (

        <div
            style={{
                background: "#eef2ff",
                borderRadius: "14px",
                padding: "25px",
                borderLeft: "5px solid #4f46e5"
            }}
        >

            <h2
                style={{
                    marginTop: 0,
                    color: "#312e81"
                }}
            >
                🤖 AI Recommendation
            </h2>

            <p
                style={{
                    fontSize: "16px",
                    lineHeight: "28px",
                    color: "#334155"
                }}
            >
                This lead has a high conversion probability.
                Generate a personalized email and follow up within
                the next 24 hours.
            </p>

            <button
                style={{
                    marginTop: "15px",
                    background: "#4f46e5",
                    color: "white",
                    border: "none",
                    padding: "12px 20px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontWeight: "bold"
                }}
            >
                View AI Insights
            </button>

        </div>

    );

}

export default AIRecommendation;