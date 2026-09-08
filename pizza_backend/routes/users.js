const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all users
router.get('/', (req, res) => {
    db.query('SELECT * FROM users', (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

// GET single user by id
router.get('/:id', (req, res) => {
    const userId = req.params.id;
    db.query('SELECT * FROM users WHERE id = ?', [userId], (err, result) => {
        if (err) throw err;
        res.json(result[0]);
    });
});

// POST create new user
router.post('/', (req, res) => {
    const { name, email, password, phone } = req.body;
    db.query(
        'INSERT INTO users (name, email, password, phone) VALUES (?, ?, ?, ?)',
        [name, email, password, phone],
        (err, result) => {
            if (err) throw err;
            res.json({ id: result.insertId, name, email, phone });
        }
    );
});

// DELETE user
router.delete('/:id', (req, res) => {
    const userId = req.params.id;
    db.query('DELETE FROM users WHERE id = ?', [userId], (err) => {
        if (err) throw err;
        res.json({ message: 'User deleted' });
    });
});

module.exports = router;
