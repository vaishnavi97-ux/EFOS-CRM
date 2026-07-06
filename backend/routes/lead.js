const express = require("express");
const router = express.Router();
const db = require("../db");
const calculateLeadScore = require("../ai/leadScoring");

/* ===========================================
   ADD LEAD
=========================================== */

router.post("/add", (req, res) => {

    const {
        company,
        name,
        email,
        phone,
        city,
        qualification,
        course_interest,
        source,
        status,
        assigned_to,
        notes
    } = req.body;

    const sql = `
        INSERT INTO leads(
            company,
            name,
            email,
            phone,
            city,
            qualification,
            course_interest,
            source,
            status,
            assigned_to,
            lead_score,
            priority,
            notes
        )
        VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)
    `;
    const ai = calculateLeadScore(req.body);
    db.query(
        sql,
        [
            company,
            name,
            email,
            phone,
            city,
            qualification,
            course_interest,
            source,
            status,
            assigned_to,
            ai.score,
            ai.priority,
            notes,
            req.params.id
        ],
        (err) => {

            if (err) {
                console.log(err);

                return res.status(500).json({
                    message: "Failed to add lead"
                });
            }

            res.json({
                success: true,
                message: "Lead Added Successfully"
            });

        }
    );

});

/* ===========================================
   GET ALL LEADS
=========================================== */

router.get("/", (req, res) => {

    const sql = `
        SELECT *
        FROM leads
        ORDER BY id DESC
    `;

    db.query(sql, (err, rows) => {

        if (err) {

            console.log(err);

            return res.status(500).json({
                message: "Failed to fetch leads"
            });

        }

        res.json(rows);

    });

});
/* ===========================================
   UPDATE LEAD
=========================================== */

router.put("/:id", (req, res) => {

    const {
        company,
        name,
        email,
        phone,
        city,
        qualification,
        course_interest,
        source,
        status,
        assigned_to,
        lead_score,
        priority,
        notes
    } = req.body;

    const sql = `
        UPDATE leads
        SET
            company=?,
            name=?,
            email=?,
            phone=?,
            city=?,
            qualification=?,
            course_interest=?,
            source=?,
            status=?,
            assigned_to=?,
            lead_score=?,
            priority=?,
            notes=?
        WHERE id=?
    `;

    db.query(
        sql,
        [
            company,
            name,
            email,
            phone,
            city,
            qualification,
            course_interest,
            source,
            status,
            assigned_to,
            lead_score,
            priority,
            notes,
            req.params.id
        ],
        (err) => {

            if (err) {
                console.log(err);

                return res.status(500).json({
                    message: "Failed to update lead"
                });
            }

            res.json({
                success: true,
                message: "Lead Updated Successfully"
            });

        }
    );

});


/* ===========================================
   DELETE LEAD
=========================================== */

router.delete("/:id", (req, res) => {

    db.query(
        "DELETE FROM leads WHERE id=?",
        [req.params.id],
        (err) => {

            if (err) {

                console.log(err);

                return res.status(500).json({
                    message: "Failed to delete lead"
                });

            }

            res.json({
                success: true,
                message: "Lead Deleted Successfully"
            });

        }

    );

});
/* ===========================================
   DASHBOARD STATISTICS
=========================================== */

router.get("/stats", (req, res) => {

    const sql = `
        SELECT
            COUNT(*) AS total,
            SUM(status='New') AS newLeads,
            SUM(status='Contacted') AS contacted,
            SUM(status='Interested') AS interested,
            SUM(status='Follow-up') AS followup,
            SUM(status='Qualified') AS qualified,
            SUM(status='Enrolled') AS enrolled,
            SUM(status='Rejected') AS rejected
        FROM leads
    `;

    db.query(sql, (err, rows) => {

        if (err) {

            console.log(err);

            return res.status(500).json({
                message: "Failed to load dashboard statistics"
            });

        }

        res.json(rows[0]);

    });

});


/* ===========================================
   RECENT LEADS
=========================================== */

router.get("/recent", (req, res) => {

    const sql = `
        SELECT *
        FROM leads
        ORDER BY created_at DESC
        LIMIT 5
    `;

    db.query(sql, (err, rows) => {

        if (err) {

            console.log(err);

            return res.status(500).json({
                message: "Failed to fetch recent leads"
            });

        }

        res.json(rows);

    });

});

/* ===========================================
   UPDATE AI SCORE
=========================================== */

router.put("/score/:id", (req, res) => {

    const ai = calculateLeadScore(req.body);

    db.query(
        "UPDATE leads SET lead_score = ?, priority = ? WHERE id = ?",
        [
            ai.score,
            ai.priority,
            req.params.id
        ],
        (err) => {

            if (err) {
                console.log(err);

                return res.status(500).json({
                    message: "Failed to update AI score"
                });
            }

            res.json({
                lead_score: ai.score,
                priority: ai.priority
            });

        }
    );

});   
module.exports = router;