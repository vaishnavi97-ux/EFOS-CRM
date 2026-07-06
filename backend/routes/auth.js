const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db");

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
      [name, email, hashedPassword, role],
      (err, result) => {
        if (err) return res.status(500).json(err);

        res.json({ message: "User Registered Successfully" });
      }
    );
  } catch (err) {
    res.status(500).json(err);
  }
});

// Login
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE email=?",
    [email],
    async (err, result) => {
      if (err) return res.status(500).json(err);

      if (result.length === 0)
        return res.status(400).json({ message: "User not found" });

      const user = result[0];

      const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword)
        return res.status(400).json({ message: "Invalid Password" });

      const token = jwt.sign(
        { id: user.id, role: user.role },
        "efos_secret_key",
        { expiresIn: "1d" }
      );

      res.json({
        message: "Login Successful",
        token,
        user,
      });
    }
  );
});

module.exports = router;