function calculateLeadScore(lead) {

    let score = 0;

    let reasons = [];

    /* ===========================
       QUALIFICATION
    =========================== */

    switch (lead.qualification) {

        case "M.Tech":
            score += 20;
            reasons.push("Higher qualification (+20)");
            break;

        case "B.Tech":
            score += 18;
            reasons.push("B.Tech graduate (+18)");
            break;

        case "B.Sc":
            score += 16;
            reasons.push("B.Sc graduate (+16)");
            break;

        case "Diploma":
            score += 14;
            reasons.push("Diploma holder (+14)");
            break;

        case "Intermediate":
            score += 10;
            reasons.push("Intermediate (+10)");
            break;

        default:
            score += 5;
            reasons.push("Other qualification (+5)");
    }

    /* ===========================
       COURSE INTEREST
    =========================== */

    switch (lead.course_interest) {

        case "AI & ML":
            score += 20;
            reasons.push("Interested in AI & ML (+20)");
            break;

        case "Data Science":
            score += 18;
            reasons.push("Interested in Data Science (+18)");
            break;

        case "Cloud Computing":
            score += 17;
            reasons.push("Interested in Cloud Computing (+17)");
            break;

        case "Cyber Security":
            score += 16;
            reasons.push("Interested in Cyber Security (+16)");
            break;

        case "Full Stack":
            score += 15;
            reasons.push("Interested in Full Stack (+15)");
            break;

        case "Python":
            score += 13;
            reasons.push("Interested in Python (+13)");
            break;

        case "Java":
            score += 12;
            reasons.push("Interested in Java (+12)");
            break;

        default:
            score += 10;
            reasons.push("Other course (+10)");
    }

    /* ===========================
       SOURCE
    =========================== */

    switch (lead.source) {

        case "Referral":
            score += 15;
            reasons.push("Referral lead (+15)");
            break;

        case "LinkedIn":
            score += 14;
            reasons.push("LinkedIn lead (+14)");
            break;

        case "Website":
            score += 12;
            reasons.push("Website lead (+12)");
            break;

        case "Walk-in":
            score += 10;
            reasons.push("Walk-in lead (+10)");
            break;

        case "WhatsApp":
            score += 9;
            reasons.push("WhatsApp lead (+9)");
            break;

        case "Instagram":
            score += 8;
            reasons.push("Instagram lead (+8)");
            break;

        case "Facebook":
            score += 7;
            reasons.push("Facebook lead (+7)");
            break;

        default:
            score += 5;
            reasons.push("Other source (+5)");
    }

    /* ===========================
       STATUS
    =========================== */

    switch (lead.status) {

        case "Enrolled":
            score += 20;
            reasons.push("Already enrolled (+20)");
            break;

        case "Qualified":
            score += 18;
            reasons.push("Qualified lead (+18)");
            break;

        case "Interested":
            score += 15;
            reasons.push("Interested lead (+15)");
            break;

        case "Follow-up":
            score += 12;
            reasons.push("Needs follow-up (+12)");
            break;

        case "Contacted":
            score += 8;
            reasons.push("Contacted (+8)");
            break;

        case "New":
            score += 5;
            reasons.push("New lead (+5)");
            break;

        case "Rejected":
            score += 0;
            reasons.push("Rejected lead (+0)");
            break;

    }

    /* ===========================
       CONTACT DETAILS
    =========================== */

    if (lead.email) {

        score += 5;
        reasons.push("Email available (+5)");

    }

    if (lead.phone) {

        score += 5;
        reasons.push("Phone available (+5)");

    }

    /* ===========================
       NOTES
    =========================== */

    if (lead.notes && lead.notes.trim() !== "") {

        score += 15;
        reasons.push("Counsellor notes available (+15)");

    }

    /* ===========================
       LIMIT SCORE
    =========================== */

    if (score > 100)
        score = 100;

   /* ===========================
   PRIORITY
=========================== */

let priority = "Cold";
let recommendation = "";

if (score >= 90) {

    priority = "Hot";
    recommendation = "📞 Call Immediately";

}
else if (score >= 70) {

    priority = "High";
    recommendation = "📅 Contact Today";

}
else if (score >= 50) {

    priority = "Medium";
    recommendation = "📧 Send Personalized Email";

}
else if (score >= 30) {

    priority = "Low";
    recommendation = "💬 WhatsApp Follow-up";

}
else {

    priority = "Cold";
    recommendation = "🌱 Add to Nurture Campaign";

}

return {

    score,

    priority,

    recommendation,

    reasons

};
}

module.exports = calculateLeadScore;