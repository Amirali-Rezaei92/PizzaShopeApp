const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all users
router.get('/', (req, res) => {
    db.query('SELECT * FROM users', (err, result) => {
        if (err) {
            console.log("DB ERROR:", err);
            return res.status(500).json({ error: err });
        }
        res.json(result);
    });
});

// GET single user by id
router.get('/:id', (req, res) => {
    const userId = req.params.id;
    db.query('SELECT * FROM users WHERE id = ?', [userId], (err, result) => {
        if (err) {
            console.log("DB ERROR:", err);
            return res.status(500).json({ error: err });
        }
        res.json(result[0]);
    });
});

// POST create new user
router.post('/', async (req, res) => {
    const { name, email, password, phone } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        db.query(
            'INSERT INTO users (name, email, password, phone) VALUES (?, ?, ?, ?)',
            [name, email, hashedPassword, phone],
            (err, result) => {
                if (err) {
                    console.log("DB ERROR:", err);
                    return res.status(500).json({ error: err });
                }

                res.json({ id: result.insertId, name, email, phone });
            }
        );
    } catch (error) {
        console.log("HASH ERROR:", error);
        res.status(500).json({ error });
    }
});

// DELETE user
router.delete('/:id', (req, res) => {
    const userId = req.params.id;
    db.query('DELETE FROM users WHERE id = ?', [userId], (err) => {
        if (err) {
            console.log("DB ERROR:", err);
            return res.status(500).json({ error: err });
        }
        res.json({ message: 'User deleted' });
    });
});

module.exports = router;
