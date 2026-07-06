function MessageTemplates({ onSelectTemplate }) {

    const templates = [

        {
            title: "Welcome Message",
            text:
`Hello,

Thank you for your interest in EFOS AI.

We are excited to help you start your AI journey.

Our counsellor will contact you shortly.

Regards,
EFOS Team`
        },

        {
            title: "Course Information",
            text:
`Our AI & Machine Learning program includes:

• Python
• Machine Learning
• Deep Learning
• Projects
• Placement Support`
        },

        {
            title: "Fee Details",
            text:
`Our complete program fee details will be shared during counselling.

Easy EMI options are available.

Scholarships are also offered for eligible students.`
        },

        {
            title: "Scholarship Offer",
            text:
`Congratulations!

Based on your profile, you may be eligible for an EFOS scholarship.

Reply to this message to know more.`
        },

        {
            title: "Follow-up Reminder",
            text:
`Just following up regarding your interest in our AI program.

Please let us know if you have any questions.`
        },

        {
            title: "Admission Confirmation",
            text:
`Congratulations!

Your admission has been successfully confirmed.

Welcome to the EFOS AI Family.`
        }

    ];

    return (

        <div
            style={{
                background:"white",
                borderRadius:"14px",
                padding:"20px",
                boxShadow:"0 3px 10px rgba(0,0,0,.08)"
            }}
        >

            <h3>Message Templates</h3>

            {

                templates.map((item,index)=>(

                    <button

                        key={index}

                        onClick={()=>onSelectTemplate(item.text)}

                        style={{
                            width:"100%",
                            padding:"12px",
                            marginBottom:"10px",
                            borderRadius:"8px",
                            border:"1px solid #d1d5db",
                            background:"white",
                            cursor:"pointer",
                            textAlign:"left"
                        }}

                    >

                        {item.title}

                    </button>

                ))

            }

        </div>

    );

}

export default MessageTemplates;