const express = require("express");
const router = express.Router();

const { generateContent } = require("../services/geminiService");

const db = require("../db");

/* ==========================================
   GET ALL LEADS
========================================== */

router.get("/leads", (req, res) => {

    db.query(
        "SELECT * FROM leads ORDER BY id DESC",
        (err, results) => {

            if (err) {

                console.log(err);

                return res.status(500).json({
                    success: false
                });

            }

            res.json(results);

        }
    );

});

/* ==========================================
   GET SINGLE LEAD
========================================== */

router.get("/lead/:id", (req, res) => {

    db.query(

        "SELECT * FROM leads WHERE id=?",

        [req.params.id],

        (err, results) => {

            if (err) {

                console.log(err);

                return res.status(500).json({
                    success: false
                });

            }

            res.json(results[0]);

        }

    );

});

router.post("/generate", async (req, res) => {

    try {

        const {
            type,
            lead,
            template
        } = req.body;

        let prompt = "";

        switch(type){

            case "email":

prompt = `
You are an admission counsellor at EFOS.

Generate a professional email.

Lead Name: ${lead.name}

Company: ${lead.company}

Qualification: ${lead.qualification}

Course: ${lead.course_interest}

City: ${lead.city}

Status: ${lead.status}

Use this template as the starting point:

${template}

Rewrite it professionally and personalize it for this student.
`;

break;

            case "whatsapp":

                prompt = `
Generate a professional WhatsApp message.

Lead Name: ${lead.name}

Course: ${lead.course_interest}

Use this template:

${template}

Rewrite it in under 80 words.
`;

                break;

            case "sms":

                prompt = `
Generate a professional SMS.

Lead Name: ${lead.name}

Course: ${lead.course_interest}

Use this template:

${template}

Maximum 160 characters.
`;

                break;

            case "followup":

                prompt = `
Generate a polite follow-up message.

Lead Name : ${lead.name}

Status : ${lead.status}

Use this template:

${template}

Encourage the student to respond.
`;

                break;

            case "reply":

    prompt = `
Generate 5 professional reply suggestions.

Lead Name: ${lead.name}

Course: ${lead.course_interest}

Use this template:

${template}

Generate five different replies with different tones:
1. Friendly
2. Professional
3. Short
4. Convincing
5. Follow-up
`;

    break;

        }

        const response = await generateContent(prompt);

        res.json({

            success:true,

            message:response

        });

    }

    catch(err){

        console.log(err);

        res.status(500).json({

            success:false,

            message:"Gemini Failed"

        });

    }

});

module.exports = router;