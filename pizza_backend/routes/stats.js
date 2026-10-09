const express = require("express");
const router = express.Router();
const db = require("../db");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

// ===============================
// TOTAL ORDERS
// ===============================
router.get("/orders-count", auth, admin, (req, res) => {
    db.query("SELECT COUNT(*) AS count FROM orders", (err, result) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.json({ orders: result[0].count });
    });
});

// ===============================
// TOTAL USERS
// ===============================
router.get("/users-count", auth, admin, (req, res) => {
    db.query("SELECT COUNT(*) AS count FROM users", (err, result) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.json({ users: result[0].count });
    });
});

// ===============================
// TODAY'S REVENUE
// ===============================
router.get("/revenue-today", auth, admin, (req, res) => {
    db.query(
        "SELECT SUM(total_price) AS revenue FROM orders WHERE DATE(created_at) = CURDATE()",
        (err, result) => {
            if (err) return res.status(500).json({ error: "Database error" });
            res.json({ revenue_today: result[0].revenue || 0 });
        }
    );
});

// ===============================
// MONTHLY REVENUE
// ===============================
router.get("/revenue-month", auth, admin, (req, res) => {
    db.query(
        "SELECT SUM(total_price) AS revenue FROM orders WHERE MONTH(created_at) = MONTH(CURDATE())",
        (err, result) => {
            if (err) return res.status(500).json({ error: "Database error" });
            res.json({ revenue_month: result[0].revenue || 0 });
        }
    );
});

// ===============================
// SALES LAST 7 DAYS (CHART)
// ===============================
router.get("/sales-week", auth, admin, (req, res) => {
    const query = `
        SELECT DATE(created_at) AS day, SUM(total_price) AS revenue
        FROM orders
        WHERE created_at >= CURDATE() - INTERVAL 7 DAY
        GROUP BY DATE(created_at)
        ORDER BY day ASC
    `;

    db.query(query, (err, result) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.json(result);
    });
});

module.exports = router;
